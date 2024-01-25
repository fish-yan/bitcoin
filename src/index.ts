import { SignTxParams } from '@okxweb3/coin-base';
import {
    TBtcWallet,
    BtcWallet,
    inscribe,
    networks,
    Network,
    InscribeTxs,
    InscriptionRequest
} from '@okxweb3/coin-bitcoin';
import {Utils} from "./util";

declare var window: Window & { webkit: any }
declare interface Window {
    webkit: any,
    ontoBitcoin: BitcoinPorvider
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

    inscribe(request: InscriptionRequest, isTest: boolean) {
        let network: Network = isTest ? networks.testnet : networks.bitcoin
        const txs: InscribeTxs = inscribe(network, request);
        return txs
    }

    async signTransaction(signTxParams: SignTxParams, isTest: boolean) {
        let wallet = isTest ? new TBtcWallet() : new BtcWallet();
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
                    resultData = this.inscribe(request, isTest)
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
