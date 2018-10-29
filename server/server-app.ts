import * as express from 'express';
import * as bodyParser from 'body-parser';
import { registerAppRoutes } from './server-routes';

const args = process.argv.slice(2);
const useThrottle = args.indexOf('--throttle') >= 0;

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
registerAppRoutes(app, useThrottle);
app.use((req, res) => {
  res.redirect('/');
});

module.exports = app;
