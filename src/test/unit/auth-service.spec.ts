import { AuthService } from "../../services/auth/auth-service";

describe('authService', () => {
  describe(".hashPassword()", () => {
    describe('GIVEN a plain text password', () => {
      const plainTextPassword = "12345"

      // "12345" in sha256 hex
      const expectedPassword = "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"

      it("SHOULD correctly hash the plain text password", () => {
        const hashedPassword = AuthService.hashPassword(plainTextPassword)
        
        expect(hashedPassword).toBe(expectedPassword)
      })
    })
  })
});