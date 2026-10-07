import mongoose from 'mongoose'

export default async function connectDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI ontbreekt in je environment variables (.env)')

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')
}
