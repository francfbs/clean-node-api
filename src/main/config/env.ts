export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://api:h50cOB9eXRkFL52K@cluster0-5fly8.azure.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'e90e15bf35ac47819865169dcdb7b42b'
}
