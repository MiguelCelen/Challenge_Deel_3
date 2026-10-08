import express from 'express'
import messagesRouter from '../routes/messages.js'

const router = express.Router()

router.get('/api/v1', (req, res) => {
  res.json({ status: 'success', message: 'API is running', data: null })
})

router.use('/api/v1/messages', messagesRouter)
router.use('/api/messages', messagesRouter)

export default router