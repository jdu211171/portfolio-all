require('dotenv').config()

const dbConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SEQUELIZE_CONFIG: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            // ssl: {
            //     rejectUnauthorized: false
            // }
        }
    }
}
module.exports = dbConfig