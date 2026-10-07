// middlewares/error-handler.js
// Geeft elke fout terug als JSON volgens de JSend-standaard.

export default (err, req, res, next) => {
  const status = err.status || 500

  // 4xx = fout van de client -> "fail", 5xx = fout van de server -> "error"
  res.status(status).json({
    status: status < 500 ? 'fail' : 'error',
    message: err.message,
  })
}
