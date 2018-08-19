import http from 'http'
import { createServer } from 'http'
import config from './config'

import app from './server'


// http createServer to listen to events for hmr/ web sockets
const server = http.createServer(app);
let currentApp = app
server.listen(config.port, () => {
	console.log(`API on port ${config.port}`);
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
