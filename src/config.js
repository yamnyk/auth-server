module.exports = {
  PORT: process.env.PORT || 8085,
  SECRET_KEY: process.env.SECRET_KEY || 'lorem ipsum 202066',
  dbConnect: "mongodb+srv://admin:12345678!@cluster0.70i0k.mongodb.net/gogi?retryWrites=true&w=majority"
}