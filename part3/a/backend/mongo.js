const mongoose = require('mongoose')
const logger = require('./utils/logger')

if (process.argv.length<3) {
  logger.info('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const content = process.argv[3]
const important = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.j14gmlk.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if (content && important) {
  const note = new Note({ content: content, important: important })
  note.save().then(() => {
    mongoose.connection.close()
  })
} else {
  Note.find({}).then(result => {
    result.forEach(note => {
      logger.info(note)
    })
    mongoose.connection.close()
  })
}
