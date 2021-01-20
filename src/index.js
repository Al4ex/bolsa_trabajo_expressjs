// Read environment variables


const app = require('./server');
require('./database');

// Server is listening
app.listen(app.get('port'), () => {
  console.log('ingresa a localhost:',app.get('port'));
  console.log('Environment:', process.env.NODE_ENV);
});