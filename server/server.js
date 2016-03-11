var express = require('express'),
    app = express(),
    server  = require('http').createServer(app);
     
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() { console.log('Node app running on port', app.get('port')) });
app.use(express.static('./client'));
