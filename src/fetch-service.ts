import * as http from 'http';
import * as url from 'url';

export class HttpService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // POST method
    public async post(endpoint: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Internal Server Error');
        }
    }

    // GET all method
    public async getAll(endpoint: string): Promise<any> {
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

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Internal Server Error');
        }
    }

    // GET by ID method
    public async getById(endpoint: string, id: string): Promise<any> {
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

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Internal Server Error');
        }
    }

    // PUT method
    public async put(endpoint: string, id: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Internal Server Error');
        }
    }

    // DELETE method
    public async delete(endpoint: string, id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Internal Server Error');
        }
    }
}
