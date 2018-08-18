import http from 'http'
import { createServer } from 'http'

import app from './server'

// http createServer to listen to events for hmr/ web sockets
const server = http.createServer(app);
let currentApp = app

server.listen(3000, () => {
	console.log("API on port 3000");
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
