import { BlockchainUtils, connect, disconnect, Identity, init} from '@kiltprotocol/sdk-js';
import BN from 'bn.js';

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
  const query = (await bc.api.query.system.account.entries());
  // const entries = query.map(([key, value]) => [key.args, k.value])
  console.log(query[0]);
  console.log('address;        free balance');
  query.forEach(([key, account]) => {
    console.log(`${key.args.map((k) => k.toHuman())[0]}; ${account.data.free.toString()}`);
  });

  // const a = new BN('000000000000000d8d726b7177a80000', 16);
  // console.log(a.toString(10));
  // console.log(toUnit(a.toString(10)))

}
main().finally(disconnect);

