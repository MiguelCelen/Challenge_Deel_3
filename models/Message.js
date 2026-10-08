import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    user: { type: String, default: 'anonymous' },
    text: { type: String, default: '' },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
  },
)

export default mongoose.model('Message', messageSchema)