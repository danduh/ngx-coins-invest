export const allConfig = {
    prod: {
        baseApiUrl: 'https://i10kcmw72h.execute-api.us-east-1.amazonaws.com/dev/',
        marketTickerUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        name: 'production'
    },
    mock: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        name: 'mock'
    },
    local: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        name: 'local'
    },
    dev: {
        baseApiUrl: 'https://api-dev.danduh.me/v1/',
        marketTickerUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        name: 'local'
    }
};
