import 'dotenv/config';
import http from 'node:http';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { initializeAdmin } from './services/admin.service.js';
import { initializeMenu } from './services/menu.service.js';
import { attachSocketServer } from './socket.js';
const port = Number(process.env.PORT || 5000);
const server = http.createServer(app);
attachSocketServer(server);
try { await connectDatabase(); await initializeAdmin(); await initializeMenu(); server.listen(port, () => console.log(`API listening on port ${port}`)); }
catch (error) { console.error('Startup failed:', error.message); process.exit(1); }
    