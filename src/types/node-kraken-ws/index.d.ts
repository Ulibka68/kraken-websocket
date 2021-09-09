import type WebSocket from 'ws';

declare module 'node-kraken-ws' {
  type SubscribeNames = 'ticker' | 'ohlc' | 'trade' | 'spread' | 'book';
  export type KrakenPair = 'DOGE/USD' | 'BTC/USDT' | 'ETH/USDT';
  const a: KrakenPair = 'DOGE/USD1';

  // constconst { reqid, depth, interval, snapshot, reconnect } = options
  export interface SubscribeOptions {
    reqid?: number; // номер выдаваемый клиентским id
    depth: number; // Optional - depth associated with book subscription in number of levels each side, default 10. Valid Options are: 10, 25, 100, 500, 1000
    interval: number; // Optional - Time interval associated with ohlc subscription in minutes. Default 1. Valid Interval values: 1|5|15|30|60|240|1440|10080|21600
    snapshot: boolean; // Optional - whether to send historical feed data snapshot upon subscription (supported only for ownTrades subscriptions; default = true)
    reconnect: boolean;
    token?: string;
    ratecounter?: boolean; //	Optional - whether to send rate-limit counter in updates (supported only for openOrders subscriptions; default = false)
  }

  export interface SubscribeRetResult {
    channelID: number;
    channelName: string;
    event: string;
    pair: string;
    reqid: number;
    status: string;
    subscription: string;
    unsubscribe: () => any;
  }

  export declare class KrakenWS {
    public socketMessageHandlers: Array<any>;
    public subscriptions: any;

    connect(): Promise<WebSocket>;
    async reconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
    disconnect(): Promise<void>;
    send(message: any): any;
    handleMessage(event: any): any;
  }

  export declare class KrakenWSPublic extends KrakenWS {
    subscribe(
      pair: Array<KrakenPair> | KrakenPair,
      name: SubscribeNames,
      options: SubscribeOptions
    ): Promise<boolean>;

    connect(): Promise<WebSocket>;

    subscribeToSpread({ pair: KrakenPair, reqid: number }): Promise<boolean>;

    subscribeToTicker({ pair: KrakenPair, reqid: number }): Promise<boolean>;
    subscribeToTrade({
      pair: KrakenPair,
      reqid: number,
    }): Promise<SubscribeRetResult>;

    subscribeToBook({
      pair: KrakenPair,
      reqid: number,
      depth: number,
    }): Promise<boolean>;
  }

  export declare class KrakenWSPrivate extends KrakenWS {
    subscribeToOpenOrders({ reqid: number, reconnect: boolean });
  }
}

// export default function createDebug(a: string): (a: string) => void;
