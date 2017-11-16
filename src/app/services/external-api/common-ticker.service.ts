import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class CommonTickerService {
    public pairsTickStreams: { [key: string]: BehaviorSubject<any> };

    constructor() {

    }

    /**
     * dynamicly create key:Subject of  streams with data updates
     * @param {string[]} pairs : ['USDT_BTC', 'BTC_ETH']
     */
    addPairTick(pairs: string[]) {
        pairs.forEach((pair) => this.pairsTickStreams[pair] = new BehaviorSubject(0));
    }

    /**
     * emit updated values per subscriber
     * @param {any[]} pairData : [currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow]
     */
    emitPairTick(pairData: any[]) {
        if (!!this.pairsTickStreams[pairData[0]]) {
            this.pairsTickStreams[pairData[0]].next(pairData);
        }
    }
}
