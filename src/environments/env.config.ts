export const allConfig = {
    prod: {
        baseApiUrl: 'https://api.danduh.me/v1/',
        // baseApiUrl: 'http://localhost:8090/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'production',
        aws: {
            userPoolId: 'us-east-1_iAYyPanKC', // Your user pool id here
            clientId: '1m16u2cdvitcojqnmejmdg23aa', // Your client id here
            identityPoolId: 'qTvHGez1i',
            region: "us-east-1",
            cognito_idp_endpoint: "https://cognito-idp.us-east-1.amazonaws.com",
            cognito_identity_endpoint: ''
        },
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
            cognito_idp_endpoint: "https://cognito-idp.us-east-1.amazonaws.com",
            cognito_identity_endpoint: ''
        },
    },
    local: {
        // baseApiUrl: 'https://8ajwtnzmn5.execute-api.us-east-1.amazonaws.com/stage/',
        baseApiUrl: 'http://localhost:8090/',
        // baseApiUrl: 'http://api.danduh.me/stage/',
        marketTickerUrl: 'https://min-api.cryptocompare.com/data/',
        name: 'local',
        aws: {
            userPoolId: 'us-east-1_QrRslpjCt', // Your user pool id here
            clientId: '5ld1g5pf3pj7thfkf886ggsqfd', // Your client id here
            identityPoolId: 'QrRslpjCt',
            region: "us-east-1",
            cognito_idp_endpoint: "https://cognito-idp.us-east-1.amazonaws.com",
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
