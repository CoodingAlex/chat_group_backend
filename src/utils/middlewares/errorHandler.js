const boom = require('@hapi/boom');

function checkIsBoom(err) {
  if (!boom.isBoom(err)) {
    return boom.boomify(err);
  }
}
function errorHandler(err, req, res, next) {
  checkIsBoom(err);
  res.status(err.output.statusCode).json({ err });
  console.log(err);
}

module.exports = errorHandler;
