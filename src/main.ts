import * as http from 'http';
import * as url from 'url';
import { HttpService } from './http-service'; // Adjust the import path as necessary

const apiService = new HttpService('http://localhost:3000'); // Base URL for your API

// Create the server
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname; // Extract pathname

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST' && pathname === '/items') {
        apiService.post(req, res, 'items');
    } else if (req.method === 'GET' && pathname === '/items') {
        apiService.getAll(req, res, 'items');
    } else if (req.method === 'GET' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.getById(req, res, 'items', id);
    } else if (req.method === 'PUT' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.put(req, res, 'items', id);
    } else if (req.method === 'DELETE' && pathname && pathname.startsWith('/items/')) {
        const id = pathname.split('/')[2];
        apiService.delete(req, res, 'items', id);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
