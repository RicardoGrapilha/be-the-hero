const app = require('./app');
require('mandatoryenv').load([
    'DB_HOST',
    'DB_DATABASE',
    'DB_USER',
    'DB_PASSWORD',
    'PORT',
    'SECRET'
]);
const { PORT } = process.env;

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);