import express from 'express'
import { list, show, create, update, remove } from '../controllers/api/v1/messages.js'

const router = express.Router()

router.get('/', list) // ook ?user=username
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
