"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const http_service_1 = require("./http-service"); // Adjust the import path as necessary
const apiService = new http_service_1.HttpService('http://localhost:3000'); // Base URL for your API
// Create the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname; // Extract pathname
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'POST' && pathname === '/items') {
        apiService.post(req, res, 'items');
    }
    else if (req.method === 'GET' && pathname === '/items') {
        apiService.getAll(req, res, 'items');
    }
    else if (req.method === 'GET' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.getById(req, res, 'items', id);
    }
    else if (req.method === 'PUT' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.put(req, res, 'items', id);
    }
    else if (req.method === 'DELETE' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.delete(req, res, 'items', id);
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});
// Start the server on port 3000
server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
