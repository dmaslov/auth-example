var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'), //HTTP request logger
  path = require('path'),
  port = parseInt(process.env.PORT, 10) || 8080,
  env = process.env.NODE_ENV || 'dev',
  oauthshim = require('oauth-shim');

oauthshim.debug = true;
oauthshim.init({
  'client_id_here' : 'client_secret_here'
});

app.set('public', path.join(__dirname, 'public'));
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('partial', path.join(__dirname, 'public', 'views', 'partial'));

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(app.get('public')));
app.use(morgan());

/* Routes */
app
.get('/', function (req, res) {
  res.sendFile('index.html', {root: app.get('views')});
})
.get('/partial/:partialName', function (req, res) {
  console.log(req.params['partialName']);
  console.log(app.get('partial'));
  res.sendFile(req.params['partialName'], {root: app.get('partial')});
})
.get('/proxy', oauthshim.request)
.get('/redirect', function(req, res){
  res.sendFile('close.html', {root: app.get('views')});
})
.get('/*', function(req, res){
  res.redirect('/');
});

app.listen(port);
