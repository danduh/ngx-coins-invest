export const allConfig = {
    prod: {
        aws: {
            userPoolId: 'us-east-1_qTvHGez1i', // Your user pool id here
            clientId: '4lacuqa9fblh3o9uu9f1tu1h4p', // Your client id here
            identityPoolId: 'qTvHGez1i',
            region: "us-east-1",
            cognito_idp_endpoint: "https://coinsinvest.auth.us-east-1.amazoncognito.com",
            cognito_identity_endpoint: ''
        },
        baseApiUrl: 'https://api-dev.danduh.me/v1/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'production'
    },
    mock: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'mock',
        aws: {
            userPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
            clientId: '5ld1g5pf3pj7thfkf886ggsqfd', // Your client id here
            identityPoolId: 'QrRslpjCt',
            region: "us-east-1",
            cognito_idp_endpoint: "https://coinsinvest.auth.us-east-1.amazoncognito.com",
            cognito_identity_endpoint: ''
        },
    },
    local: {
        baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'local',
        aws: {
            userPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
            clientId: '5ld1g5pf3pj7thfkf886ggsqfd', // Your client id here
            identityPoolId: 'QrRslpjCt',
            region: "us-east-1",
            cognito_idp_endpoint: "https://coinsinvest.auth.us-east-1.amazoncognito.com",
            cognito_identity_endpoint: ''
        },
    },
    dev: {
        baseApiUrl: 'https://api-dev.danduh.me/v1/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'local',
        aws: {
            userPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
            clientId: '5ld1g5pf3pj7thfkf886ggsqfd', // Your client id here
            identityPoolId: 'QrRslpjCt',
            region: "us-east-1",
            cognito_idp_endpoint: "https://coinsinvest.auth.us-east-1.amazoncognito.com",
            cognito_identity_endpoint: ''
        },
    }
};
