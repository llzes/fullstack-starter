// CONFIGURATION FILE
// We will be using this to hook up our database to our server file!

'use strict';

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'postgresql://dev:dev@localhost/dev-cheesecakedb';

const TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL || 'postgresql://dev:dev@localhost/test-cheesecakedb');

exports.DATABASE={
  client:'pg',
  connection:DATABASE_URL,
};

exports.TEST_DATABASE={
  client:'pg',
  connection:TEST_DATABASE_URL,
};

exports.PORT = process.env.PORT || 8080;