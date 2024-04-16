import { SignTxParams, cloneObject } from '@okxweb3/coin-base';
import BitcoinPorvider from "../src/index"
import { TBtcWallet } from '@okxweb3/coin-bitcoin';

describe('index test', () => {

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
            brc20Inputs: [
                // rune token info
                {
                    txId: "e6ceace8612c28d4b0d1c8c9791698010a2053faa1a6d025f8bce54829600368",
                    vOut: 0,
                    amount: 546,
                    address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 未花费地址
                    privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki", // 未花费 WIF 编码私钥
                    // data: [{ "id": "26e414:0001", "amount": "500" }] // maybe many rune token
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
                    // data: { "id": "26e414:0001", "amount": "100" } // one output allow only one rune token
                }
            ],
            address: "bcrt1prufattqkafmk4x6pnxw84ws5ls4qgmjvz305ytgq6u8rg9zeqwhq3t6j76", // 找零地址
            feePerB: 80,
            runeData: { // 必须有
                etching: null,
                mint: "540:1",
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


    test('rune edicts test', async () => {
        let btcTxParams = {
            type: 102,
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

    // test('regtestnet test', async () => {
    //     let wallet = new TBtcWallet()
    //     let address = await wallet.getNewAddress({
    //         privateKey: "cS5TQA1faqQqH8LJn7yjFsMmWyuesqhLXfMin5r6SYNfJaNZKAHy",
    //         addressType: "segwit_taproot"
    //     })
    //     console.log(address);
        
    // })
})