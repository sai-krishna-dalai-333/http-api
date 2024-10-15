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
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Error:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // GET all method
    getAll(endpoint) {
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
                return yield response.json();
            }
            catch (error) {
                console.error('Error:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // GET by ID method
    getById(endpoint, id) {
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
                return yield response.json();
            }
            catch (error) {
                console.error('Error:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // PUT method
    put(endpoint, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Error:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
    // DELETE method
    delete(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.message || 'An error occurred');
                }
            }
            catch (error) {
                console.error('Error:', error);
                throw new Error('Internal Server Error');
            }
        });
    }
}
exports.HttpService = HttpService;
