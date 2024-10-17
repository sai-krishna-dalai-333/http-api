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
exports.HttpRequestHandler = void 0;
class HttpRequestHandler {
    constructor(service) {
        if (service) {
            this.service = service;
        }
    }
    post(fetchMethod, req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string 
        });
        req.on('end', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = JSON.parse(body); // Parse JSON body 
                // Call create method on the provided service instance dynamically based on URL or type.
                const createdEntity = yield this.service[fetchMethod](payload);
                console.log('Created Entity:', createdEntity);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(createdEntity));
            }
            catch (error) {
                console.error('Error processing request:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        }));
    }
    get(fetchMethod, req, res) {
        const methodName = String(fetchMethod);
        this.service[methodName]()
            .then((data) => {
            console.log(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        })
            .catch((error) => {
            console.error(`Error fetching data using ${methodName}:`, error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        });
    }
    getById(fetchMethod, id, req, res) {
        if (id === null) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'ID is required' }));
        }
        const methodName = String(fetchMethod);
        this.service[methodName](id)
            .then((data) => {
            if (data) {
                console.log(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(data));
            }
            else {
                // Not found case
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: ` not found` }));
            }
        })
            .catch((error) => {
            console.error(`Error fetching data by ID using ${methodName}:`, error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: error.message }));
        });
    }
    update(fetchMethod, id, req, res) {
        if (id === null) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "ID is required" }));
        }
        let body = '';
        // Read data from request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = JSON.parse(body); // Parse JSON body
                const updatedEntity = yield this.service[fetchMethod](payload);
                console.log('Updated Entity:', updatedEntity);
                if (updatedEntity) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify(updatedEntity));
                }
                else {
                    // Not found case
                    res.writeHead(404, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: `Resource not found` }));
                }
            }
            catch (error) {
                console.error(`Error updating resource using update method:`, error);
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: error.message }));
            }
        }));
    }
    delete(fetchMethod, id, res) {
        if (id === null) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "ID is required" }));
        }
        this.service[fetchMethod](id)
            .then(() => {
            res.writeHead(204); // No Content response on success
            return res.end();
        })
            .catch((error) => {
            console.error(`Error deleting resource using delete method:`, error);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: error.message }));
        });
    }
}
exports.HttpRequestHandler = HttpRequestHandler;
