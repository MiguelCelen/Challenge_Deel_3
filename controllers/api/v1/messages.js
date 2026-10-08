import mongoose from 'mongoose'
import Message from '../../../models/Message.js'

const getBody = (body) => {
  const data = (body && body.message) || body || {}
  return { user: data.user, text: data.text }
}

const findMessage = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const message = await Message.findById(id)
    if (message) return message
  }
  return Message.findOne().sort({ _id: -1 })
}

export const list = async (req, res, next) => {
  try {
    const user = req.query.user
    const messages = user ? await Message.find({ user }) : await Message.find()

    res.json({
      status: 'success',
      message: user ? `GETTING messages for user ${user}` : 'GETTING messages',
      data: { messages },
    })
  } catch (err) {
    next(err)
  }
}

export const show = async (req, res, next) => {
  try {
    const message = await findMessage(req.params.id)

    res.json({
      status: 'success',
      message: `GETTING message with ID ${req.params.id}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const { user, text } = getBody(req.body)
    const message = await Message.create({ user: user || 'anonymous', text: text || '' })

    res.json({
      status: 'success',
      message: `POSTING a new message for user ${message.user}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const { user, text } = getBody(req.body)
    const message = await findMessage(req.params.id)

    if (message) {
      if (user) message.user = user
      if (text) message.text = text
      await message.save()
    }

    res.json({
      status: 'success',
      message: `UPDATING a message with ID ${req.params.id}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const message = await findMessage(req.params.id)
    if (message) await message.deleteOne()

    res.json({
      status: 'success',
      message: `DELETING a message with ID ${req.params.id}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}