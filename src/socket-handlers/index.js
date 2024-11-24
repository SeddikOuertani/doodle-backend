const redisClient = require("../redis");
const { removeStepsByField } = require('../redis/handlers')

module.exports.handleConnection = async (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('step', async (data) => {
    const stepData = {...data, userId: socket.id}
    socket.broadcast.emit('stepadded', stepData)
    await redisClient.rPush('steps', JSON.stringify(stepData))
  })

  // Handle disconnections
  socket.on('disconnect', async () => {
    console.log('A user disconnected:', socket.id);
    await removeStepsByField(redisClient, { key: 'userId', value: socket.id })
  });
}