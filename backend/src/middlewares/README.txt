- Why middelware:
Holds functions that intercept (تعترض) HTTP requests in the Express lifecycle — like checking auth, validating input, logging requests, etc.

- ex : authMiddleware.js => Verifies JWT or session to protect 
private routes
       errorHandler.js => Custom error response formatting
       validateInput.js	=> Validates incoming request 
       body/query/params
       logger.js =>	Logs every request (can also live in lib)

- Use when:
The function needs access to req, res, and next

You're modifying or guarding the request before hitting a route       