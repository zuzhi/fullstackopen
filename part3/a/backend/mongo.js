const mongoose = require('mongoose')
const logger = require('logger')

if (process.argv.length<3) {
  logger.info('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.j14gmlk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    logger.info(note)
  })
  mongoose.connection.close()
})
