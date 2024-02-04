
## 1. 根据助记词生成私钥(wif)
```js
// parmas:
// - mnemonic: 助记词
// - segwitType: 1: bip84, 2: bip49, 3: bip84, 4: bip86
// - index: addresIndex
// - isTest: 是否是测试网
async getPrivateKey(mnemonic: string, segwitType: number, index: number, isTest: boolean)

// return:
// {privateKey: "0x12343"}
```

## 2. 根据私钥(wif)生成地址

```js
// params:
// - privateKey: 私钥(wif)
// - addressType: 地址类型 "Legacy" | "segwit_native" | "segwit_p2sh"
async getAddress(privateKey: string, addressType: string, isTest: boolean)

// return: 
// {address: "0x123434"}
```

## 3. 校验地址
```js
// params:
// - address: 地址
async validAddress(address: string, isTest: boolean)

// return: 
// {valid: true}
```

## 4. inscribe / inscribeSelectUtxoTxAndFee(参数一致,不用穿私钥)
```js
// params:
// - request: InscriptionRequest

const commitTxPrevOutputList: PrevOutput[] = [];
commitTxPrevOutputList.push({
  txId: "a33ea20a5d9c1106e577f920816b4349fcda004f5c74e5896c47779e95220437", // 未花费所属交易 ID
  vOut: 0, // 未花费输出索引
  amount: 4743, // 未花费余额
  address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 未花费地址
  privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***", // 未花费 WIF 编码私钥
}); // 传全部非铭文utxo

// 构造需要铭刻的数据，批量铭刻只需循环构造列表即可
const inscriptionDataList: InscriptionData[] = [];
inscriptionDataList.push({
  contentType: "text/plain;charset=utf-8", // 铭文类型, 使用 MIME 类型表示
  body: `{"p":"brc-20","op":"transfer","tick":"tokb","amt":"1"}`,// 铭文内容，utf-8字符串或二进制 buffer
  revealAddr: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 铭文铭刻 (绑定) 地址
});

// 自定义信息，包括费率、找零地址、铭文输出金额
const request: InscriptionRequest = {
  commitTxPrevOutputList,
  commitFeeRate: 118, // 请使用当前网络费率，以免交易 pending 不上链
  revealFeeRate: 118,
  revealOutValue: 546,
  inscriptionDataList,
  changeAddress: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u",
};

inscribe(request: InscriptionRequest, isTest: boolean) 

// return:
{
  commitTx: '02000000000104',
  revealTxs: [
    '0200000000010195cf7a2aacbb6'
  ],
  commitTxFee: 1180, // commit的服务费
  revealTxFees: [302], // reveal的服务费
  commitAddrs: ['bc1p5vs6u2ff3a6n3qa83xmsxdflqpyg6492nvja4dvpehdf96896e2shx5a0w']
}

// inscribeSelectUtxoTxAndFee
// return:
{
    fixRequest: InscriptionRequest // 筛选并计算过的 request
    inscribeTxs: InscribeTxs
}
```

## 5. signTransaction / transferSelectUtxoTxAndFee(参数一致,不用穿私钥)
```js
let btcTxParams = {
  type: 0
  brc20Inputs: [
    {
      // get-utxo-brc20 返回 utxoList BRC-20 代币
      txId: "a1a41ccfe62ba715a085059ee455f164f649b5321ebb361ef6a4d65b24b047a0",
      vOut: 0,
      amount: 546,
      address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 未花费地址
      privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***", // 未花费 WIF 编码私钥
    },
    {
      // get-utxo 返回 utxoList
      txId: "82c51ff69fd0a55968e346f7093cb9088ce8b60b60a2493c8a5bc57b977ce348",
      vOut: 0,
      amount: 546,
      address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 未花费地址
      privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***", // 未花费 WIF 编码私钥
    }
  ], // brc20 转账时填 铭文对应的utxo,普通转账空list
  inputs: [
    {
      // get-utxo-brc20 返回 utxoList BRC-20 代币
      txId: "a1a41ccfe62ba715a085059ee455f164f649b5321ebb361ef6a4d65b24b047a0",
      vOut: 0,
      amount: 1000,
      address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 未花费地址
      privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***", // 未花费 WIF 编码私钥
    },
    {
      // get-utxo 返回 utxoList
      txId: "82c51ff69fd0a55968e346f7093cb9088ce8b60b60a2493c8a5bc57b977ce348",
      vOut: 0,
      amount: 200000,
      address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 未花费地址
      privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***", // 未花费 WIF 编码私钥
    }
  ],// 传所有非铭文的utxo
  outputs: [
    {
      address: "bc1p9nkcnw8ae9az43uamnaws2e9nvlzm8yjxh48mr3ywvcy7tns6ywqdq77l4",
      amount: 546
    }
  ],
  address: "bc1psnr548clz3f4fz6jmpnw5eqzj2v2musk082wp8fvq5ac3p5ete6qg05u8u", // 找零地址
  feePerB: 72
};

let signParams: SignTxParams = {
  privateKey: "***sXSA1tzG9Hyc2S2ZQLsbR3o8pvzQyz9DYewrRQDcFC2vhcwGT***",
  data: btcTxParams
};

async signTransaction(signTxParams: SignTxParams, isTest: boolean)

// return:
// {tx: tx}

// transferSelectUtxoTxAndFee
// return:
{
    utxoTx: utxoTx // 筛选并计算过的 utxoTx
    fee: number // 服务费
}

type utxoTx = {
    inputs: [];
    outputs: [];
    address: string;
    feePerB?: number;
    decimal?: number;
    fee?: number;
    omni?: omniOutput;
    dustSize?: number;
    bip32Derivation?: Bip32Derivation[];
    derivationPath?: string;
    memo?: string;
    memoPos?: number;
    runeData?: RuneData;
};
```

## 6. calcTxHash
```js
// params:
// - tx:
async calcTxHash(tx: string, isTest: boolean)

// return: 
// {txHash: txHash}
```

## 7. postMessage
```js
// params:
let data = {
    id: number | string // messageId
    method: string // getPrivateKey | getAddress | validAddress | inscribe | signTransaction | calcTxHash
    data: any 
    // 每个方法对应的参数及返回值 如下
    /*
    - getPrivateKey: 
    params: {
        mnemonic: string
        segwitType: number // - segwitType: 1: bip84, 2: bip49, 3: bip84, 4: bip86
        index: number
    }
    return: {
        privateKey: "0x12343"
    }

    getAddress:
    params: {
        privateKey: string
        addressType: string // - addressType: 地址类型 "Legacy" | "segwit_native" | "segwit_p2sh"
    }
    return: {
        address: "0x123434"
    }

    validAddress:
    params: {
        address: string
    }
    return: {
        valid: true
    }

    inscribe:
    params: {
        request: InscriptionRequest
    }
    return: { 
        commitTx: '02000000000104',
        revealTxs: [
            '0200000000010195cf7a2aacbb6'
        ],
        commitTxFee: 1180,
        revealTxFees: [ 302],
        commitAddrs: ['bc1p5vs6u2ff3a6n3qa83xmsxdflqpyg6492nvja4dvpehdf96896e2shx5a0w']
    }

    signTransaction:
    params: {
        signTxParams: SignTxParams
    }
    return: {
        tx: tx
    }

    calcTxHash:
    params: {
        tx: string
    }
    return: {
        txHash: txHash
    }
    */
}

async postMessage(data: any)
```

```js
window.ontoBitcoin.postMessage(json)
```

```js
// error
let body: Message = {
    id: message.id,
    method: message.method,
    data: {
        error: error
    }
}
```