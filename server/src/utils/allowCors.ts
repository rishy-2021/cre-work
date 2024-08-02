import { IncomingMessage, ServerResponse } from 'http';

// Define a type for the handler function
type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void> | void;

// Create a CORS-enabled function wrapper
const allowCors = (fn: Handler): Handler => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // You could also set this to a specific origin:
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
  return await fn(req, res);
};

// Define the handler function
const handler: Handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

// Export the wrapped handler
export default allowCors(handler);
