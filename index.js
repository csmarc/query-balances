import { BlockchainUtils, connect, disconnect, Identity, init} from '@kiltprotocol/sdk-js';


// Convert a big number balance to expected float with correct units.
function toUnit(balance) {
  decimals = bc.api.registry.chainDecimals;
  base = new BN(10).pow(new BN(decimals));
  dm = new BN(balance).divmod(base);
  return parseFloat(dm.div.toString() + "." + dm.mod.toString())
}

async function main() {
  await init({
    address: 'wss://westend.kilt.io',
    logLevel: 0,
  });

  const bc = await connect();
  console.log(bc.api.genesisHash.toHex());
  const type1 = bc.api.createType('Option<AccountId>');
  // console.log(type1);
  const query = (await bc.api.query.system.account.entries()).map(([key, value]) => [key.args, k.value]);
  // const query = (await bc.api.query.system.account.entries()).toJSON();

  // console.log(typeof query.data.free.words);
  // console.log(query.data.free.toHuman());
  console.log(query);

}
main().finally(disconnect);

// const a = new BN('000000000000000d8d726b7177a80000', 16);
// console.log(a.toString(10));