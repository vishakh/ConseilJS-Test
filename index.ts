import fetch from 'cross-fetch';
import * as log from 'loglevel';
import * as cjs from 'conseiljs';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
cjs.registerLogger(logger);
cjs.registerFetch(fetch);

const tezosServer = "https://tezos-prod.cryptonomic-infra.tech:443"

const conseilServer: cjs.ConseilServerInfo  = {
    url: "https://conseil-prod.cryptonomic-infra.tech:443",
    apiKey: "ac640e80-6b17-4a93-9b5e-d71ce0c954d7",
    network: "mainnet"
}

const keystore = {
    publicKey: 'edpktmb36jHWgw4Zw7yvLft8ZRQt1v6NgWrfLUTQEKYvxHtmJhWWH5',
    privateKey: 'Tezos Secret Key: edskS29nSEhbzwoGrVvSgmPMroMhQ3YmuJHcoTm4LcvZF9s5nW34nYwMm3hNGb8yo7Lt3bW914E6VZzkFRdUkYUMh8PN89A7VT',
    publicKeyHash: 'tz1NEGFHXe2XEztwCfpduZqULRFTUZQTezSt',
    seed: '',
    storeType: cjs.KeyStoreType.Fundraiser
};

const getHead = async () => {
    const blockHead =  await cjs.TezosNodeReader.getBlockHead(tezosServer);
    console.log("blockHead", JSON.stringify(blockHead))
    return blockHead
}

const createInvocationTransaction = () => {
    const params: cjs.ContractParameters = {
        entrypoint: "balanceOf",
        value: { "string": "tz1Xy5UM1tC3CFcbPBVq5PjufaxcLjMwfQkE" }
    }

    const op: cjs.Transaction = {
        kind: "transaction",
        source: keystore.publicKeyHash,
        fee: "0",
        counter: "14654460",
        gas_limit: "10000",
        storage_limit: "0",
        amount: "0",
        destination: "KT1LxPGwkrvj8gG8k8CkpyKQaWyQAsnLfHLg",
        parameters: params
    }
    return op;
}

const readView = async () => {
    const result = await cjs.TezosNodeWriter.runView(
        tezosServer,
        "main",
        "KT1LxPGwkrvj8gG8k8CkpyKQaWyQAsnLfHLg",
        "getAccountSnapshotView",
        { "string": "tz1Xy5UM1tC3CFcbPBVq5PjufaxcLjMwfQkE" },
        "2845658"
    )
    console.log("result", JSON.stringify(result))
}


//getHead();
//const op = createInvocationTransaction()
readView()

