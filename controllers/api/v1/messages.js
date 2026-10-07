import mongoose from 'mongoose'
import Message from '../../../models/Message.js'


const fail = (res, code, message) => res.status(code).json({ status: 'fail', message })

const resolveId = async (id) => {
  if (mongoose.isValidObjectId(id)) return id

  const position = Number(id)
  if (!Number.isInteger(position) || position < 1) return undefined

  const [message] = await Message.find()
    .sort({ _id: 1 })
    .skip(position - 1)
    .limit(1)
  return message ? message._id : null
}

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

export const show = async (req, res, next) => {
  try {
    const id = await resolveId(req.params.id)
    if (id === undefined) return fail(res, 400, `Invalid message id: ${req.params.id}`)

    const message = id && (await Message.findById(id))
    if (!message) return fail(res, 404, 'Message not found')

    res.json({
      status: 'success',
      message: `GETTING message ${req.params.id}`,
      data: { message },
    })
  } catch (err) {
    next(err)
  }
}

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

export const update = async (req, res, next) => {
  try {
    const id = await resolveId(req.params.id)
    if (id === undefined) return fail(res, 400, `Invalid message id: ${req.params.id}`)

    const { user, text } = req.body?.message ?? {}
    if (!user && !text) return fail(res, 400, 'Nothing to update: send a user and/or a text')

    const changes = {}
    if (user) changes.user = user
    if (text) changes.text = text

    const message =
      id && (await Message.findByIdAndUpdate(id, changes, { new: true, runValidators: true }))
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

export const remove = async (req, res, next) => {
  try {
    const id = await resolveId(req.params.id)
    if (id === undefined) return fail(res, 400, `Invalid message id: ${req.params.id}`)

    const message = id && (await Message.findByIdAndDelete(id))
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