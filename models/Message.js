import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
})

export default mongoose.model('Message', messageSchema)
