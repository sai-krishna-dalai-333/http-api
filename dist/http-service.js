"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
class HttpService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // POST method
    post(req, res, endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(`${this.baseUrl}/${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(JSON.parse(body)),
                    });
                    if (!response.ok) {
                        const error = yield response.json();
                        throw new Error(error.message || 'An error occurred');
                    }
                    const newItem = yield response.json();
                    console.log(newItem);
                    res.writeHead(201);
                    res.end(JSON.stringify(newItem));
                }
                catch (error) {
                    console.error('Error:', error);
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                }
            }));
        });
    }
    // GET all method
    getAll(req, res, endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
                const items = yield response.json();
                console.log(items);
                res.writeHead(200);
                res.end(JSON.stringify(items));
            }
            catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    }
    // GET by ID method
    getById(req, res, endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
                const item = yield response.json();
                console.log(item);
                res.writeHead(200);
                res.end(JSON.stringify(item));
            }
            catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    }
    // PUT method
    put(req, res, endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(JSON.parse(body)),
                    });
                    if (!response.ok) {
                        const error = yield response.json();
                        throw new Error(error.message || 'An error occurred');
                    }
                    const updatedItem = yield response.json();
                    console.log(updatedItem);
                    res.writeHead(200);
                    res.end(JSON.stringify(updatedItem));
                }
                catch (error) {
                    console.error('Error:', error);
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                }
            }));
        });
    }
    // DELETE method
    delete(req, res, endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
                res.writeHead(204);
                res.end();
            }
            catch (error) {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    }
}
exports.HttpService = HttpService;
