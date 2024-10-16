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
const http = __importStar(require("http"));
class HttpService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // Helper function to make HTTP requests
    makeRequest(method, endpoint, data) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: `${this.baseUrl}/${endpoint}`,
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const req = http.request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk.toString(); // Convert Buffer to string
                });
                res.on('end', () => {
                    if (typeof res.statusCode === 'number' && res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(JSON.parse(body)); // Parse and resolve the response body
                    }
                    else {
                        reject(new Error(`Error ${res.statusCode}: ${body}`));
                    }
                });
            });
            req.on('error', (error) => {
                reject(error);
            });
            if (data) {
                req.write(JSON.stringify(data)); // Write data for POST and PUT requests
            }
            req.end(); // End the request
        });
    }
    // POST method
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending POST request to ${this.baseUrl}/${endpoint} with data:`, data);
                const result = yield this.makeRequest('POST', endpoint, data);
                console.log('POST request successful:', result);
                return result;
            }
            catch (error) {
                console.error('Error in POST method:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // GET all method
    getAll(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending GET request to ${this.baseUrl}/${endpoint}`);
                const result = yield this.makeRequest('GET', endpoint);
                console.log('GET request successful:', result);
                return result;
            }
            catch (error) {
                console.error('Error in GET all method:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // GET by ID method
    getById(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending GET request to ${this.baseUrl}/${endpoint}/${id}`);
                const result = yield this.makeRequest('GET', `${endpoint}/${id}`);
                console.log('GET by ID request successful:', result);
                return result;
            }
            catch (error) {
                console.error('Error in GET by ID method:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // PUT method
    put(endpoint, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending PUT request to ${this.baseUrl}/${endpoint}/${id} with data:`, data);
                const result = yield this.makeRequest("PUT", `${endpoint}/${id}`, data);
                console.log("PUT request successful:", result);
                return result;
            }
            catch (error) {
                console.error("Error in PUT method:", error);
                throw new Error("Internal Server Error");
            }
        });
    }
    // DELETE method
    delete(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending DELETE request to ${this.baseUrl}/${endpoint}/${id}`);
                yield this.makeRequest("DELETE", `${endpoint}/${id}`);
                console.log("DELETE request successful");
            }
            catch (error) {
                console.error("Error in DELETE method:", error);
                throw new Error("Internal Server Error");
            }
        });
    }
}
exports.HttpService = HttpService;
