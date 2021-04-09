class response {
  body;
  constructor(message, valid = true, error = null) {
    this.body = {
      valid: valid,
      body: {
        message: message,
        error: error,
      },
    };
  }
}

module.exports = response;
