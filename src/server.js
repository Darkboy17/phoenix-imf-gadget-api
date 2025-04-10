import app from './app.js';
import { swaggerDocs } from './swagger.js';
import { connectDB } from './db.js';

// Set PORT from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to the database and start the server
// If the connection fails, log the error and exit the process
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Initialize Swagger documentation
    // This will set up the Swagger UI and API documentation at /api-docs
    swaggerDocs(app);
  });
}).catch((error) => {

  // Log the error message if the connection fails
  // This will help in debugging connection issues
  console.error('Failed to connect to the database:', error.message);
  process.exit(1); // Exit the process with a failure code
});
