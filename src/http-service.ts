import * as http from 'http';

export class HttpService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Helper function to make HTTP requests
    private makeRequest(method: string, endpoint: string, data?: any): Promise<any> {
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
                    } else {
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
    public async post(endpoint: string, data: any): Promise<any> {
        try {
            console.log(`Sending POST request to ${this.baseUrl}/${endpoint} with data:`, data);
            const result = await this.makeRequest('POST', endpoint, data);
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
            const result = await this.makeRequest('GET', endpoint);
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
           const result = await this.makeRequest('GET', `${endpoint}/${id}`); 
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
           console.log(`Sending PUT request to ${this.baseUrl}/${endpoint}/${id} with data:` ,data);  
           const result = await this.makeRequest("PUT", `${endpoint}/${id}`, data);  
           console.log("PUT request successful:",result );  
          return result;  
      } catch(error){   
          console.error("Error in PUT method:", error);   
          throw new Error("Internal Server Error");  
      }  
  }  

   // DELETE method
   public async delete(endpoint:string,id:string):Promise<void>{   
       try{     
         console.log(`Sending DELETE request to ${this.baseUrl}/${endpoint}/${id}`);     
         await this.makeRequest("DELETE",`${endpoint}/${id}` );    
         console.log("DELETE request successful");    
     }catch(error){     
         console.error("Error in DELETE method:", error);     
         throw new Error("Internal Server Error");    
     }   
 }
}
