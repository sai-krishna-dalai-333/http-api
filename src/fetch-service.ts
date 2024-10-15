import * as http from 'http';
import * as url from 'url';

export class FetchService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // POST method
    public async post(endpoint: string, data: any): Promise<any> {
        try {
            console.log(`Sending POST request to ${this.baseUrl}/${endpoint} with data:`, data);
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`POST request failed: ${error.message || 'An error occurred'}`);
                throw new Error(error.message || 'An error occurred');
            }

            const result = await response.json();
            console.log('POST request successful:', result);
            return result;
        } catch (error) {
            console.error('Error in POST method:', error);
            throw new Error('Internal Server Error');
        }
    }

    // GET all method
    public async getAll(endpoint: string): Promise<any> {
        try {
            console.log(`Sending GET request to ${this.baseUrl}/${endpoint}`);
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`GET request failed: ${error.message || 'An error occurred'}`);
                throw new Error(error.message || 'An error occurred');
            }

            const result = await response.json();
            console.log('GET request successful:', result);
            return result;
        } catch (error) {
            console.error('Error in GET all method:', error);
            throw new Error('Internal Server Error');
        }
    }

    // GET by ID method
    public async getById(endpoint: string, id: string): Promise<any> {
        try {
            console.log(`Sending GET request to ${this.baseUrl}/${endpoint}/${id}`);
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`GET by ID request failed: ${error.message || 'An error occurred'}`);
                throw new Error(error.message || 'An error occurred');
            }

            const result = await response.json();
            console.log('GET by ID request successful:', result);
            return result;
        } catch (error) {
            console.error('Error in GET by ID method:', error);
            throw new Error('Internal Server Error');
        }
    }

    // PUT method
    public async put(endpoint: string, id: string, data: any): Promise<any> {
        try {
            console.log(`Sending PUT request to ${this.baseUrl}/${endpoint}/${id} with data:`, data);
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`PUT request failed: ${error.message || 'An error occurred'}`);
                throw new Error(error.message || 'An error occurred');
            }

            const result = await response.json();
            console.log('PUT request successful:', result);
            return result;
        } catch (error) {
            console.error('Error in PUT method:', error);
            throw new Error('Internal Server Error');
        }
    }

    // DELETE method
    public async delete(endpoint: string, id: string): Promise<void> {
        try {
            console.log(`Sending DELETE request to ${this.baseUrl}/${endpoint}/${id}`);
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`DELETE request failed: ${error.message || 'An error occurred'}`);
                throw new Error(error.message || 'An error occurred');
            }

            console.log('DELETE request successful');
        } catch (error) {
            console.error('Error in DELETE method:', error);
            throw new Error('Internal Server Error');
        }
    }
}
