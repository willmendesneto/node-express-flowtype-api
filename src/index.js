// @flow

import * as http from 'http';
import debug from 'debug';
import Api from './Api';
import type { ErrnoError } from './types';

const logger = debug('flow-api:startup');
const app: Api = new Api();
const DEFAULT_PORT: number = 4000;

function normalizePort(val: any): number | string {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (port && isNaN(port)) return port;
  else if (port >= 0) return port;
  return DEFAULT_PORT;
}

const port: string | number = normalizePort(process.env.PORT);
// $FlowFixMe: express libdef issue
const server: http.Server = http.createServer(app.express);

server.listen(port);

server.on('error', (error: ErrnoError) => {
  if (error.syscall !== 'listen') throw error;
  const bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port.toString()}`;

  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
    // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  logger(`Listening on ${bind}`);
});
