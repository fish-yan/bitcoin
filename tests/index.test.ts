import { SignTxParams, cloneObject } from '@okxweb3/coin-base';
import BitcoinPorvider, { RegTBtcWallet } from "../src/index"

describe('index test', () => {

    test('rune test', async () => {
        let btcTxParams = {
            type: 102,
            brc20Inputs: [
                // rune token info
                {
                    txId: "a1a41ccfe62ba715a085059ee455f164f649b5321ebb361ef6a4d65b24b047a0",
                    vOut: 0,
                    amount: 546,
                    address: "bc1pgvlezqu3crm44xjrrm7u3u63yqvw3rqvzu0vgcp2zsht5j9ss66q79p4zg", // 未花费地址
                    privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki", // 未花费 WIF 编码私钥
                    data: [{ "id": "26e414:0001", "amount": "500" }] // maybe many rune token
                },
            ],
            inputs: [
                // gas fee utxo
                {
                    txId: "82c51ff69fd0a55968e346f7093cb9088ce8b60b60a2493c8a5bc57b977ce348",
                    vOut: 0,
                    amount: 200000,
                    address: "bc1pgvlezqu3crm44xjrrm7u3u63yqvw3rqvzu0vgcp2zsht5j9ss66q79p4zg", // 未花费地址
                    privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki", // 未花费 WIF 编码私钥
                }
            ],
            outputs: [
                // rune send output
                {
                    address: "bc1pne26q2qzjxpyr36ll2yfta64kgjgwctfk706a82xg96uzfcwswgqz3yv33",
                    amount: 546,
                    data: { "id": "26e414:0001", "amount": "100" } // one output allow only one rune token
                }
            ],
            address: "bc1pgvlezqu3crm44xjrrm7u3u63yqvw3rqvzu0vgcp2zsht5j9ss66q79p4zg", // 找零地址
            feePerB: 10,
            runeData: { // 必须有
                etching: {
                    divisibility: 7,
                    premine: 1000,
                    rune: "J",
                    spacers: 10,
                    symbol: 'Y',
                    terms: {
                        cap: 1000000000,
                        amount: 1000,
                        height: [12, 13],
                        offset: [15, 16],
                    }
                },
                mint: "26e414:0001",
                pointer: 0,
                burn: false // 必须有
            }
        };
        let signParams: SignTxParams = {
            privateKey: "KyCySnrRzHkEBnDY9RfgHT1iXEP4684sMQxzBwapWmLmaoLzFvki",
            data: btcTxParams
        };
        let wallet = new BitcoinPorvider()
        let result = await wallet.estimateFee(signParams, false)
        console.log(result);

        let tx = await wallet.signTransaction(signParams, false)
        console.log("tx", tx);

    })

    test('regtestnet test', async () => {
        let wallet = new RegTBtcWallet()
        let address = await wallet.getNewAddress({
            privateKey: "cS5TQA1faqQqH8LJn7yjFsMmWyuesqhLXfMin5r6SYNfJaNZKAHy",
            addressType: "segwit_taproot"
        })
        console.log(address);
        
    })
})