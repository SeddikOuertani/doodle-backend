module.exports.handleConnection = async (socket) => {
  socket.on('step', data => {
    console.log(data)
    console.log(socket.id)
  })

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
}