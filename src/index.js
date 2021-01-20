// Read environment variables
require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listening
app.listen(app.get('port'), () => {
  console.log('ingresa a localhost:',app.get('port'));
});