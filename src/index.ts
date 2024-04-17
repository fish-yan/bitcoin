import { SignTxParams, cloneObject } from '@okxweb3/coin-base';
import {
    BtcWallet,
    TBtcWallet,
    inscribe,
    networks,
    Network,
    InscribeTxs,
    PrevOutput,
    InscriptionRequest,
    utxoTx,
    utxoInput,
    private2Wif,
    BtcXrcTypes,
    buildRuneData,
    RuneData
} from '@okxweb3/coin-bitcoin';
import { base } from "@okxweb3/crypto-lib"
import { Utils } from "./util";

declare var window: Window & { webkit: any }
declare interface Window {
    webkit: any,
    ontoBitcoin: BitcoinPorvider
}

type utxoTxAndfee = {
    utxoTx: utxoTx
    fee: number
}

type inscribeRequestAndTxs = {
    fixRequest: InscriptionRequest
    inscribeTxs: InscribeTxs
}

export type Message = {
    id: number | string
    method: string
    data: any
}

export default class BitcoinPorvider {

    async getPrivateKey(mnemonic: string, segwitType: number, index: number, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        const hdPath = await wallet.getDerivedPath({ index: index, segwitType: segwitType });
        let derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic, hdPath });
        return { privateKey: derivePrivateKey }
    }

    async getAddress(privateKey: string, addressType: string, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        let newAddress = await wallet.getNewAddress({ privateKey: privateKey, addressType: addressType });
        return { address: newAddress.address }
    }

    async validAddress(address: string, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        let valid = await wallet.validAddress({ address: address })
        return { valid: valid.isValid }
    }

    async inscribe(request: InscriptionRequest, isTest: boolean) {
        let { fixRequest, inscribeTxs } = await this.inscribeSelectUtxoTxAndFee(request, isTest)
        return inscribeTxs
    }

    async signTransaction(signTxParams: SignTxParams, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        let { utxoTx, fee } = await this.transferSelectUtxoTxAndFee(signTxParams, isTest)
        signTxParams.data.inputs = utxoTx.inputs
        signTxParams.data.outputs = utxoTx.outputs
        let tx = await wallet.signTransaction(signTxParams)
        return { tx: tx }
    }

    async calcTxHash(tx: string, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        let calcTxHashParams = { data: tx };
        let txHash = await wallet.calcTxHash(calcTxHashParams);
        return { txHash: txHash }
    }

    async estimateFee(param: SignTxParams, isTest: Boolean): Promise<any> {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
        let fee = await wallet.estimateFee(param)
        return { fee: fee }
    }

    async inscribeSelectUtxoTxAndFee(request: InscriptionRequest, isTest: boolean): Promise<inscribeRequestAndTxs> {
        let network: Network = isTest ? networks.testnet : networks.bitcoin
        let spendCommitTxPrevOutputList: PrevOutput[] = [];
        for (let index = 0; index < request.commitTxPrevOutputList.length; index++) {
            const element = request.commitTxPrevOutputList[index];
            if (element.privateKey == undefined || element.privateKey.length == 0) {
                const fakePrivateKey = private2Wif(base.fromHex("853fd8960ff34838208d662ecd3b9f8cf413e13e0f74f95e554f8089f5058db0"), network);
                element.privateKey = fakePrivateKey
            }
            spendCommitTxPrevOutputList.push(element)
            let fixRequest: InscriptionRequest = {
                commitTxPrevOutputList: spendCommitTxPrevOutputList,
                commitFeeRate: request.commitFeeRate,
                revealFeeRate: request.revealFeeRate,
                inscriptionDataList: request.inscriptionDataList,
                revealOutValue: request.revealOutValue,
                changeAddress: request.changeAddress,
                minChangeValue: request.minChangeValue
            }
            fixRequest.commitTxPrevOutputList = spendCommitTxPrevOutputList;
            let inscribeTxs = inscribe(network, fixRequest)
            if (inscribeTxs.commitTx.length != 0) {
                return Promise.resolve({
                    fixRequest: fixRequest,
                    inscribeTxs: inscribeTxs
                })
            }
        }
        return Promise.reject("insufficientFunds")
    }

    async transferSelectUtxoTxAndFee(signTxParams: SignTxParams, isTest: boolean): Promise<utxoTxAndfee> {
        let originInputs = signTxParams.data.inputs.sort(this.descending('amount'))
        let brc20Inputs = signTxParams.data.brc20Inputs
        let outputs = signTxParams.data.outputs
        let transferType: BtcXrcTypes = signTxParams.data.type
        let wallet = isTest ? new TBtcWallet() : new BtcWallet()

        // 筛选utxo
        let spendInputs = []
        if (brc20Inputs != undefined && brc20Inputs.length != 0) {
            spendInputs = spendInputs.concat(brc20Inputs)
        }

        // 铭文文转账转账如果包含铭文添加一个 546 给自己, 防止符文被意外转走
        let isAddRuneChangeOutput = false
        if (transferType != BtcXrcTypes.RUNE && brc20Inputs != undefined) {
            for (let index = 0; index < brc20Inputs.length; index++) {
                let input = brc20Inputs[index]
                if (input.rune && !isAddRuneChangeOutput) {
                    let runeChangedOutput = {
                        address: input.address,
                        amount: 546,
                    }
                    // 铭文push到最后, 增加 runeData 
                    outputs.push(runeChangedOutput)
                    const runeData: RuneData = {
                        edicts: [],
                        pointer: outputs.length - 1, // 指定多余的rune找零到指定input
                        burn: false
                    }
                    let opReturnScript = buildRuneData(!isTest, runeData)
                    const opReturnOutput = {address: '', amount: 0, omniScript: base.toHex(opReturnScript)};
                    outputs.push(opReturnOutput)
                    isAddRuneChangeOutput = true
                    break;
                }
            }
        }

        let outputAmount = 0
        for (let i = 0; i < outputs.length; i++) {
            outputAmount = outputAmount + outputs[i].amount;
        }

        let inputAmount = 0
        for (let index = 0; index < originInputs.length; index++) {
            spendInputs.push(originInputs[index])
            inputAmount = inputAmount + originInputs[index].amount

            if (originInputs[index].rune && !isAddRuneChangeOutput) {
                let runeChangedOutput = {
                    address: originInputs[index].address,
                    amount: 546
                }
                outputs.unshift(runeChangedOutput)
                isAddRuneChangeOutput = true
            }

            let cloneSignTxParms = cloneObject(signTxParams)
            cloneSignTxParms.data.inputs = spendInputs
            cloneSignTxParms.data.outputs = outputs

            let fee = await wallet.estimateFee(cloneSignTxParms)
            console.log(inputAmount, outputAmount, fee);

            if (inputAmount >= outputAmount + fee) {
                return Promise.resolve({
                    utxoTx: cloneSignTxParms.data,
                    fee: fee
                })
            }
        }
        // brc20 交易抛出余额不足
        if (signTxParams.data.brc20Inputs != undefined && signTxParams.data.brc20Inputs.length != 0) {
            return Promise.reject("insufficientFunds")
        }
        // run 交易抛出余额不足
        if (transferType == BtcXrcTypes.RUNE) {
            return Promise.reject("insufficientFunds")
        }
        // 不够支付 则减少output金额
        let allInputAmount = 0
        for (let i = 0; i < originInputs.length; i++) {
            let input = originInputs[i] as utxoInput;
            allInputAmount = allInputAmount + input.amount;
        }
        let allSignTxParms = cloneObject(signTxParams)
        allSignTxParms.data.inputs = originInputs
        allSignTxParms.data.outputs = outputs

        let allFee = await wallet.estimateFee(allSignTxParms)        
        let output = outputs[outputs.length - 1] // 目标output
        if (allInputAmount == output.amount && allInputAmount > allFee) {
            output.amount = allInputAmount - allFee - 546
            let cloneSignTxParms = cloneObject(signTxParams)
            cloneSignTxParms.data.inputs = originInputs
            if (isAddRuneChangeOutput) {
                cloneSignTxParms.data.outputs = [outputs[0], output]
            } else {
                cloneSignTxParms.data.outputs = [output]
            }
           
            return Promise.resolve({
                utxoTx: cloneSignTxParms.data,
                fee: allFee
            })
        }
        return Promise.reject("insufficientFunds")
    }

    descending(property: string) {
        return function (a, b) {
            var value1 = a[property]
            var value2 = b[property]
            return value2 - value1
        }
    }

    /**
     * @private Native  call js
     */
    public async executeJsMethod(data: any) {
        let message: Message;
        let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isIOS) {
            message = data;
        } else {
            message = JSON.parse(data);
        }
        let isTest = message.data.isTest
        var resultData: any
        try {
            switch (message.method) {
                case "getPrivateKey":
                    let mnemonic = message.data.mnemonic
                    let segwitType = message.data.segwitType
                    let index = message.data.index
                    resultData = await this.getPrivateKey(mnemonic, segwitType, index, isTest)
                    break;
                case "getAddress":
                    let privateKey = message.data.privateKey
                    let addressType = message.data.addressType
                    resultData = await this.getAddress(privateKey, addressType, isTest)
                    break;
                case "validAddress":
                    let address = message.data.address
                    resultData = await this.validAddress(address, isTest)
                    break;
                case "inscribe":
                    let request = message.data.request
                    resultData = await this.inscribe(request, isTest)
                    break;
                case "signTransaction":
                    let signTxParams = message.data.signTxParams
                    resultData = await this.signTransaction(signTxParams, isTest)
                    break;
                case "calcTxHash":
                    let tx = message.data.tx
                    resultData = this.calcTxHash(tx, isTest)
                    break
                case "estimateFee":
                    let estimateFeeParams = message.data.signTxParams
                    resultData = await this.estimateFee(estimateFeeParams, isTest)
                    break
                case "transferSelectUtxoTxAndFee":
                    let selectSignTxParams = message.data.signTxParams
                    resultData = await this.transferSelectUtxoTxAndFee(selectSignTxParams, isTest)
                    break
                case "inscribeSelectUtxoTxAndFee":
                    let estimateRequest = message.data.request
                    resultData = await this.inscribeSelectUtxoTxAndFee(estimateRequest, isTest)
                    break
                default:
                    break;
            }
            let body: Message = {
                id: message.id,
                method: message.method,
                data: resultData
            }
            Utils.postMsg(body)
        } catch (error) {
            let body: Message = {
                id: message.id,
                method: message.method,
                data: {
                    error: error
                }
            }
            Utils.postMsg(body)
        }
    }

}

window.ontoBitcoin = new BitcoinPorvider()
