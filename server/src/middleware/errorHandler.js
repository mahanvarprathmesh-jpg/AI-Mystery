export function notFound(_request, response) {
  response.status(404).json({ success: false, message: 'That endpoint was not found.' });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);
  response.status(error.status || 500).json({
    success: false,
    message: error.status ? error.message : 'Something went wrong. Please try again.',
  });
}
