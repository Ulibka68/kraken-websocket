// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { KrakenWSPublic, SubscribeOptions } from 'node-kraken-ws';
// set DEBUG=*

async function testKraken() {
  const instance = new KrakenWSPublic();
  await instance.connect();

  /* const options: SubscribeOptions = {
    depth: 25,
    interval: 1,
    snapshot: false,
    reconnect: false,
  };*/

  // const res = instance.subscribe('BTC/USDT', 'ticker', options);

  /* const { channelID } = await instance.subscribeToSpread({
    pair: 'BTC/USDT',
    reqid: 0,
  });
  console.log('******** channelID ', channelID);*/

  /* await instance.subscribeToTicker({
    pair: 'BTC/USDT',
    reqid: 0,
  });*/

  const book = await instance.subscribeToBook({
    pair: 'BTC/USDT',
    reqid: 0,
    depth: 10,
  });
  console.log('->->->-> book', book);
  // subscribeToTrade;

  const removeListener = instance.on('kraken:subscribe:event', (payload) => {
    // if (payload[0] !== channelID) return;
    console.log('========kraken:subscribe:event', payload);
  });
  console.log('****** removeListener ', removeListener);
}

testKraken();
