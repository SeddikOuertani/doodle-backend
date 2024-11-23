const app = require('./app');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const { handleConnection } = require('./socket-handlers');


// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const io = new Server(server);
io.on('connection', handleConnection);