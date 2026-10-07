import mongoose from 'mongoose'
import Message from '../../../models/Message.js'

// JSend "fail": de client stuurde iets verkeerd door
const fail = (res, code, message) => res.status(code).json({ status: 'fail', message })

const isValidId = (id) => mongoose.isValidObjectId(id)

// GET /api/v1/messages  en  GET /api/v1/messages?user=username
export const list = async (req, res, next) => {
  try {
    const { user } = req.query

    if (user) {
      const messages = await Message.find({ user })
      return res.json({
        status: 'success',
        message: `Messages from user ${user}`,
        data: { messages },
      })
    }

    const messages = await Message.find()
    res.json({
      status: 'success',
      message: 'GETTING messages',
      data: { messages },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/messages/:id
export const show = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 400, 'Invalid message id')

    const message = await Message.findById(id)
    if (!message) return fail(res, 404, 'Message not found')

    res.json({
      status: 'success',
      message: `GETTING message ${id}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/v1/messages
// Body: { "message": { "user": "Pikachu", "text": "..." } }
export const create = async (req, res, next) => {
  try {
    const { user, text } = req.body?.message ?? {}
    if (!user || !text) return fail(res, 400, 'A message needs a user and a text')

    const message = await Message.create({ user, text })
    res.status(201).json({
      status: 'success',
      message: 'Message saved',
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

// PUT /api/v1/messages/:id
export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 400, 'Invalid message id')

    const { user, text } = req.body?.message ?? {}
    if (!user && !text) return fail(res, 400, 'Nothing to update: send a user and/or a text')

    const changes = {}
    if (user) changes.user = user
    if (text) changes.text = text

    const message = await Message.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    })
    if (!message) return fail(res, 404, 'Message not found')

    res.json({
      status: 'success',
      message: 'Message updated',
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/messages/:id
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 400, 'Invalid message id')

    const message = await Message.findByIdAndDelete(id)
    if (!message) return fail(res, 404, 'Message not found')

    res.json({
      status: 'success',
      message: 'Message deleted',
      data: { message: { _id: message._id } },
    })
  } catch (err) {
    next(err)
  }
}
