import * as http from 'http';

export class HttpService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // POST method
    public async post(req: http.IncomingMessage, res: http.ServerResponse, endpoint: string): Promise<void> {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', async () => {
            try {
                const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(JSON.parse(body)),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'An error occurred');
                }

                const newItem = await response.json();
                console.log(newItem);
                res.writeHead(201);
                res.end(JSON.stringify(newItem));
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    }

    // GET all method
    public async getAll(req: http.IncomingMessage, res: http.ServerResponse, endpoint: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            const items = await response.json();
            console.log(items);
            res.writeHead(200);
            res.end(JSON.stringify(items));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    }

    // GET by ID method
    public async getById(req: http.IncomingMessage, res: http.ServerResponse, endpoint: string, id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            const item = await response.json();
            console.log(item);
            res.writeHead(200);
            res.end(JSON.stringify(item));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    }

    // PUT method
    public async put(req: http.IncomingMessage, res: http.ServerResponse, endpoint: string, id: string): Promise<void> {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', async () => {
            try {
                const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(JSON.parse(body)),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'An error occurred');
                }

                const updatedItem = await response.json();
                console.log(updatedItem);
                res.writeHead(200);
                res.end(JSON.stringify(updatedItem));
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    }

    // DELETE method
    public async delete(req: http.IncomingMessage, res: http.ServerResponse, endpoint: string, id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            res.writeHead(204);
            res.end();
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    }
}
