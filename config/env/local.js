'use strict';

module.exports = {
    logs: {
        logDir: './logs/argoBackendLogs',
        fileName: 'server.logs',
        fileLogLevel: 'info',
        consoleLogLevel: 'debug',
    },
    server: {
        httpsPort: 3443,
        httpPort: 3000,
        enableSSL: false,
    },
    database: {
        host: '127.0.0.1',
        port: '27017',
        db: 'argo',
    },
    amazingQuote: {
        url: 'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge',
        apiKey: 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
    },
    email: {
        user: 'quotes.service@outlook.com',
        password: 'merrywooddrive123!',
        subject: 'Your Submitted Quote',
        senderName: 'Quotes Service',
        server: 'smtp-mail.outlook.com:587',
    },
    cors: {
        allowed: 'http://localhost:4000',
    },
};
