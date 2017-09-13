export const allConfig = {
    prod: {
        baseApiUrl: 'https://api-dev.danduh.me/v1/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'production'
    },
    mock: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'mock'
    },
    local: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'local'
    },
    dev: {
        baseApiUrl: 'https://api-dev.danduh.me/v1/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'local'
    }
};
