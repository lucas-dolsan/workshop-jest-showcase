class PasswordTooShortError extends Error {
  constructor() {
    super("Password too short")
  }
}

export default PasswordTooShortError
