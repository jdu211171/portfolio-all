module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    publicRouters: [
        {url: '/auth/login', method: 'POST'},
        {url: '/auth/register', method: 'POST'}
    ]
}