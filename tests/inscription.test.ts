import BitcoinPorvider from "../src";
import { SignTxParams } from '@okxweb3/coin-base';

describe('index test', () => {
/*
    test('brc20 deploy', async () => {
        // 自定义信息，包括费率、找零地址、铭文输出金额
        const request = {
            commitTxPrevOutputList: [{
                txId: "4834d1f66769ae553967e4f5332acf23851c374331bc48c6f2cfe4849cd309ae",
                vOut: 0,
                amount: 500000000,
                address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            }],
            inscriptionDataList: [{
                contentType: "text/plain;charset=utf-8",
                body: `{"p":"brc-20","op":"deploy","tick":"onto","max":"1000000000","lim":"1000"}`,
                revealAddr: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
            }],
            commitFeeRate: 118,
            revealFeeRate: 118,
            revealOutValue: 546,
            changeAddress: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
        };

        let wallet = new BitcoinPorvider()
        let result = await wallet.inscribe(request, true)
        console.log(result);

    })
    */

    test('brc20 mint', async () => {
        // 自定义信息，包括费率、找零地址、铭文输出金额
        const request = {
            commitTxPrevOutputList: [{
                txId: "4834d1f66769ae553967e4f5332acf23851c374331bc48c6f2cfe4849cd309ae",
                vOut: 1,
                amount: 546,
                address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            }, {
                txId: "14d6b9e23d7a1e421988121a67c91cc3d82c1fde5d50874e7d9fc7f377499e80",
                vOut: 1,
                amount: 499961458,
                address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            }],
            inscriptionDataList: [{
                contentType: "text/plain;charset=utf-8",
                body: `{"p":"brc-20","op":"mint","tick":"onto","amt":"1000"}`,
                revealAddr: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
            }],
            commitFeeRate: 118,
            revealFeeRate: 118,
            revealOutValue: 546,
            changeAddress: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
        };

        let wallet = new BitcoinPorvider()
        let result = await wallet.inscribe(request, true)
        console.log(result);

    })

    test('brc20 inscribe transfer', async () => {
        // 自定义信息，包括费率、找零地址、铭文输出金额
        const request = {
            commitTxPrevOutputList: [{
                txId: "4834d1f66769ae553967e4f5332acf23851c374331bc48c6f2cfe4849cd309ae",
                vOut: 1,
                amount: 546,
                address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            }, {
                txId: "14d6b9e23d7a1e421988121a67c91cc3d82c1fde5d50874e7d9fc7f377499e80",
                vOut: 1,
                amount: 499961458,
                address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            }],
            inscriptionDataList: [{
                contentType: "text/plain;charset=utf-8",
                body: `{"p":"brc-20","op":"transfer","tick":"onto","amt":"100"}`,
                revealAddr: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
            }],
            commitFeeRate: 118,
            revealFeeRate: 118,
            revealOutValue: 546,
            changeAddress: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
        };

        let wallet = new BitcoinPorvider()
        let result = await wallet.inscribe(request, true)
        console.log(result);

    })
/*
    test('inscription has rune test', async () => {
        let btcTxParams = {
            type: 0,
            brc20Inputs: [
                // rune token info
                {
                    txId: "e6ceace8612c28d4b0d1c8c9791698010a2053faa1a6d025f8bce54829600368",
                    vOut: 0,
                    amount: 546,
                    address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 未花费地址
                    privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki", // 未花费 WIF 编码私钥
                    data: [{ "id": "26e414:0001", "amount": "500" }] // maybe many rune token
                },
            ],
            inputs: [
                // gas fee utxo
                {
                    txId: "e6ceace8612c28d4b0d1c8c9791698010a2053faa1a6d025f8bce54829600368",
                    vOut: 2,
                    amount: 1499975467,
                    address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 未花费地址
                    privateKey: "cTGrWN7WVyzAoBs9zsjQ3bFAz7LGBm9Ru2WsoHYjwy2RMH3A5XDp", // 未花费 WIF 编码私钥
                }
            ],
            outputs: [
                // rune send output
                {
                    address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76",
                    amount: 546,
                    data: { "id": "26e414:0001", "amount": "100" } // one output allow only one rune token
                }
            ],
            address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 找零地址
            feePerB: 80,
            runeData: { // 必须有
                etching: null,
                // mint: "26e414:0001",
                // pointer: 0,
                burn: false // 必须有
            }
        };
        let signParams: SignTxParams = {
            privateKey: "cTGrWN7WVyzAoBs9zsjQ3bFAz7LGBm9Ru2WsoHYjwy2RMH3A5XDp",
            data: btcTxParams
        };
        let wallet = new BitcoinPorvider()
        let result = await wallet.estimateFee(signParams, true)
        console.log(result);

        let tx = await wallet.signTransaction(signParams, true)
        console.log("tx", tx);

    })
    */
})