const express = require('express');
const path = require('path');

// Inicializations
const app = express();
require('./database');


// Settings
app.use(express.json());
app.set('port',3000);
app.use(require('./routes/index'))


// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});