const messageSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
}, {
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false },
})