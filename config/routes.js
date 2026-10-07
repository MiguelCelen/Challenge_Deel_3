import express from 'express'
import messagesRouter from '../routes/messages.js'

const router = express.Router()

router.use('/api/v1/messages', messagesRouter)
// de opgave vermeldt ook /api/messages/:id (zonder v1)
router.use('/api/messages', messagesRouter)

export default router
