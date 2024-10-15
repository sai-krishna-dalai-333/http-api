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
exports.FetchService = void 0;
class FetchService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // POST method
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending POST request to ${this.baseUrl}/${endpoint} with data:`, data);
                const response = yield fetch(`${this.baseUrl}/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const error = yield response.json();
                    console.error(`POST request failed: ${error.message || 'An error occurred'}`);
                    throw new Error(error.message || 'An error occurred');
                }
                const result = yield response.json();
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
                const response = yield fetch(`${this.baseUrl}/${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const error = yield response.json();
                    console.error(`GET request failed: ${error.message || 'An error occurred'}`);
                    throw new Error(error.message || 'An error occurred');
                }
                const result = yield response.json();
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
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const error = yield response.json();
                    console.error(`GET by ID request failed: ${error.message || 'An error occurred'}`);
                    throw new Error(error.message || 'An error occurred');
                }
                const result = yield response.json();
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
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const error = yield response.json();
                    console.error(`PUT request failed: ${error.message || 'An error occurred'}`);
                    throw new Error(error.message || 'An error occurred');
                }
                const result = yield response.json();
                console.log('PUT request successful:', result);
                return result;
            }
            catch (error) {
                console.error('Error in PUT method:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // DELETE method
    delete(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Sending DELETE request to ${this.baseUrl}/${endpoint}/${id}`);
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const error = yield response.json();
                    console.error(`DELETE request failed: ${error.message || 'An error occurred'}`);
                    throw new Error(error.message || 'An error occurred');
                }
                console.log('DELETE request successful');
            }
            catch (error) {
                console.error('Error in DELETE method:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
}
exports.FetchService = FetchService;
