import { SignTxParams, cloneObject } from '@okxweb3/coin-base';
import BitcoinPorvider from "../src/index"
import { TBtcWallet } from '@okxweb3/coin-bitcoin';

describe('index test', () => {
/*
    test('rune etching test', async () => {
        let btcTxParams = {
            type: 102,
            brc20Inputs: [
                // rune token info
                // {
                //     txId: "e6ceace8612c28d4b0d1c8c9791698010a2053faa1a6d025f8bce54829600368",
                //     vOut: 0,
                //     amount: 546,
                //     address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 未花费地址
                //     privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki", // 未花费 WIF 编码私钥
                //     // data: [{ "id": "26e414:0001", "amount": "500" }] // maybe many rune token
                // },
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
                    // data: { "id": "26e414:0001", "amount": "100" } // one output allow only one rune token
                }
            ],
            address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 找零地址
            feePerB: 80,
            runeData: { // 必须有
                etching: {
                    divisibility: 7,
                    premine: 1000,
                    // rune: "J",
                    // spacers: 10,
                    symbol: 'Y',
                    terms: {
                        cap: 1000000000,
                        amount: 1000,
                        // height: [12, 13],
                        // offset: [15, 16],
                    }
                },
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

    test('rune mint test', async () => {
        let btcTxParams = {
            type: 102,
            inputs: [
                // gas fee utxo
                {
                    txId: "6c894fe81f6fd8675ef3343c8083122506191df1524cf16d48b04ecfdaab6602",
                    vOut: 3,
                    amount: 499781886,
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                    privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                }
            ],
            outputs: [
                // rune send output
                {
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx",
                    amount: 546,
                    // data: { "id": "26e414:0001", "amount": "100" } // one output allow only one rune token
                }
            ],
            address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 找零地址
            feePerB: 80,
            runeData: { // 必须有
                etching: null,
                mint: "540:1",
                // pointer: 0,
                burn: false // 必须有
            }
        };
        let signParams: SignTxParams = {
            privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            data: btcTxParams
        };
        let wallet = new BitcoinPorvider()
        let result = await wallet.estimateFee(signParams, true)
        console.log(result);

        let tx = await wallet.signTransaction(signParams, true)
        console.log("tx", tx);

    })
*/

    test('rune edicts test', async () => {
        let btcTxParams = {
            type: 102,
            brc20Inputs: [
                // // rune token info
                // {
                //     txId: "993e1fab6d46fe4c43fa804faf092ee6e929d60191f897feafcda79c1f4a9a05",
                //     vOut: 0,
                //     amount: 546,
                //     address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                //     privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                //     data: [{ "id": "540:1", "amount": "500" }], // maybe many rune token
                //     inscription: true,
                //     rune: true
                // },
                // {
                //     txId: "0abc59ba24d500bc7db91441f23f652fc06124ee35d81e7c2b6df1f9d4021b31",
                //     vOut: 0,
                //     amount: 546,
                //     address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                //     privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                //     data: [{ "id": "540:1", "amount": "500" }], // maybe many rune token
                //     inscription: false,
                //     rune: true
                // },
                // {
                //     txId: "7473e1fab6d46fe4c43f804faf092ee6e929d60191f897feafcda79c1f4a9a05",
                //     vOut: 0,
                //     amount: 546,
                //     address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                //     privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                //     data: [{ "id": "540:1", "amount": "500" }], // maybe many rune token
                //     inscription: true,
                //     rune: true
                // },
                // {
                //     txId: "887473e1f6d46fe4c43f804faf092ee6e929d60191f897feafcda79c1f4a9a05",
                //     vOut: 0,
                //     amount: 546,
                //     address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                //     privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                //     data: [{ "id": "540:1", "amount": "500" }], // maybe many rune token
                //     inscription: false,
                //     rune: true
                // },
            ],
            inputs: [
                // gas fee utxo
                {
                    txId: "e6ceace8612c28d4b0d1c8c9791698010a2053faa1a6d025f8bce54829600368",
                    vOut: 2,
                    amount: 400000,
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                    privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                    inscription: false,
                    rune: false
                },
                {
                    txId: "4bf1d2a2d498eaba83eb401f4a62d702cc02d98264de0656cd4bd8fc5ab4a913",
                    vOut: 2,
                    amount: 300000,
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                    privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                    inscription: false,
                    rune: false
                },
                {
                    txId: "6c894fe81f6fd8675ef3343c8083122506191df1524cf16d48b04ecfdaab6602",
                    vOut: 2,
                    amount: 200000,
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                    privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                    inscription: false,
                    rune: false
                },
                {
                    txId: "dacc510b75153ae2a1deb18a64b55a8601cf29e1bf02155af29f15a29705466a",
                    vOut: 2,
                    amount: 100000,
                    address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 未花费地址
                    privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh", // 未花费 WIF 编码私钥
                    inscription: false,
                    rune: false
                }
            ],
            outputs: [
                // rune send output
                // {
                //     address: "2MtSoWHG6mVDLH3eQ3BBLdXumimtPkwbgws",
                //     amount: 546,
                //     data: { "id": "540:1", "amount": "600" } // one output allow only one rune token
                // }
            ],
            address: "2N8CVEgsh3p85we2sztndGScvjFvZNDhTQx", // 找零地址
            feePerB: 80,
            runeData: { // 必须有
                etching: null,
                mint: "540:1",
                // pointer: 0,
                burn: false // 必须有
            }
        };
        let signParams: SignTxParams = {
            privateKey: "cMmcX1FwYYGJrpifuQehXttCHcXE5egWAu8zXiyG1rJWJ1UtM4Eh",
            data: btcTxParams
        };
        let wallet = new BitcoinPorvider()

        let tx = await wallet.signTransaction(signParams, true)
        console.log("tx", tx);

    })

})