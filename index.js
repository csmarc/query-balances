import { BlockchainUtils, connect, disconnect, Identity, init } from '@kiltprotocol/sdk-js';

async function main() {
  await init({
    // address: 'wss://westend.kilt.io',
    address: 'wss://spiritnet.kilt.io',
    logLevel: 0,
  });

  const bc = await connect();
  console.log(bc.api.genesisHash.toHex());
  const query = await bc.api.query.system.account.entries();
  // const entries = query.map(([key, value]) => [key.args, k.value])
  // console.log(query[0]);
  console.log('"address";        "free balance";"locked amount";"lock until";"vest amount";"vest per block"');

  let lines = query.map(async ([key, account]) => {
    let address = key.args.map(k => k.toHuman())[0];
    let lock_info = (await bc.api.query.kiltLaunch.balanceLocks(address)).unwrapOrDefault();
    let vest_info = (await bc.api.query.vesting.vesting(address)).unwrapOrDefault();

    return `"${key.args.map(k => k.toHuman())[0]}";${account.data.free.toString()};${lock_info.amount};${
      lock_info.block
    };${vest_info.locked};${vest_info.perBlock}`;
  });

  let lines2 = await Promise.all(lines);
  lines2.forEach(l1 => console.log(l1));
}
main().finally(disconnect);
