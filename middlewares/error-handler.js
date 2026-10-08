
export default (err, req, res, next) => {
  const status = err.status || 500

  res.status(status).json({
    status: status < 500 ? 'fail' : 'error',
    message: err.message,
  })
}
