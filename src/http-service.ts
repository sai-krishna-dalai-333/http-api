// http-request-handler.ts
import * as http from 'http';

export class HttpRequestHandler<T> { 
     private service!: T; 

     constructor(service?: T) { 
         if (service) { 
             this.service = service; 
         } 
     } 

    public post(fetchMethod: keyof T, req: http.IncomingMessage, res: http.ServerResponse) { 
        let body: string = ''; 

        req.on('data', chunk => { 
            body += chunk.toString(); // Convert Buffer to string 
        }); 

        req.on('end', async () => { 
            try { 
                const payload = JSON.parse(body); // Parse JSON body 

                // Call create method on the provided service instance dynamically based on URL or type.
                const createdEntity = await (this.service as any)[fetchMethod](payload); 

                console.log('Created Entity:', createdEntity); 

                res.writeHead(201, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify(createdEntity)); 
            } catch (error: any) { 
                console.error('Error processing request:', error);  
                res.writeHead(500, { 'Content-Type': 'application/json' });  
                res.end(JSON.stringify({ message: error.message }));  
            }  
        });  
    }
     
     public get(fetchMethod: keyof T, req: http.IncomingMessage, res: http.ServerResponse) {
        const methodName = String(fetchMethod);  
        (this.service as any)[methodName]()
            .then((data: any) => {
                console.log(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch((error: any) => {
                console.error(`Error fetching data using ${methodName}:`, error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            });
    }

    public getById(fetchMethod: keyof T, id: number | null, req: http.IncomingMessage, res: http.ServerResponse) {
        if (id === null) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'ID is required' }));
        }

        const methodName = String(fetchMethod);

        (this.service as any)[methodName](id)
            .then((data: any) => {
                if (data) {
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify(data));
                } else {
                    // Not found case
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({ message: ` not found` }));
                }
            })
            .catch((error:any) => {
               console.error(`Error fetching data by ID using ${methodName}:`, error);
               res.writeHead(500,{ 'Content-Type': 'application/json' });
               return 	res.end(JSON.stringify({ message:error.message }));
           });
   }

   public update(fetchMethod: keyof T, id: number | null,req: http.IncomingMessage, res: http.ServerResponse) {
    if (id === null) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "ID is required" }));
    }

    let body: string = '';

    // Read data from request
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', async () => {
        try {
            const payload = JSON.parse(body); // Parse JSON body

            const updatedEntity = await (this.service as any)[fetchMethod](payload);
            
            console.log('Updated Entity:', updatedEntity);
            
            if (updatedEntity) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(updatedEntity));
            } else {
                // Not found case
                res.writeHead(404,{ "Content-Type": "application/json" });
                return 	res.end(JSON.stringify({ message:`Resource not found` }));
           }
       } catch (error:any) {
           console.error(`Error updating resource using update method:`, error);
           res.writeHead(500,{ "Content-Type": "application/json" });
           return 	res.end(JSON.stringify({ message:error.message }));
       }
   });
}

public delete(fetchMethod: keyof T, id: number | null, res: http.ServerResponse) {
    if (id === null) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "ID is required" }));
    }

    (this.service as any)[fetchMethod](id)
        .then(() => {
            res.writeHead(204); // No Content response on success
            return res.end();
        })
        .catch((error:any) => {
            console.error(`Error deleting resource using delete method:`, error);
            res.writeHead(500,{ "Content-Type": "application/json" });
            return 	res.end(JSON.stringify({ message:error.message }));
        });
}

}
