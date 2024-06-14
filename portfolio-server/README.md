# How to run server side
npm install

# set .env file according to DB connection parameters

# then on empty Database run the following commands
npm run migrate
npm run seed

# above command will create tables, and 1 record for Admin table to use as Login credentials

# finally
npm run dev