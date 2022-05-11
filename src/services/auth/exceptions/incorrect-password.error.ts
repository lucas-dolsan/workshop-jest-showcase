class IncorrectPasswordError extends Error {
  constructor() {
    super("Incorrect password")
  }
}

export default IncorrectPasswordError