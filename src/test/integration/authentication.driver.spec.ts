import User from "../../models/user";
import IncorrectPasswordError from "../../services/auth/exceptions/incorrect-password.error";
import NotFoundError from "../../services/auth/exceptions/not-found-error";
import UserAlreadyExists from "../../services/auth/exceptions/user-already-exists";
import arrangeTestContext from "../arrange-test-context";

describe('Authentication Driver', () => {
  describe('Registering', () => {
    describe('GIVEN a mock user', () => {

      const userId = "a random userId"
      const plainTextPassword = "12345678" 
      const newUserId = "a new user"

      const { authService } = arrangeTestContext(userId, plainTextPassword)
  
      const user = new User(
        newUserId,
        'beltrano',
        plainTextPassword
      )


      it("SHOULD SUCCEED in calling .register()", () => {
        expect(() => {
          authService.register(user)
        }).not.toThrow(Error)
      })
    })
    describe('GIVEN an existing mock user', () => {

      const userId = "a random userId"
      const plainTextPassword = "12345678" 
    
      const { authService } = arrangeTestContext(userId, plainTextPassword)
  
      const user = new User(
        userId,
        'fulano',
        plainTextPassword
      )

      it("SHOULD NOT SUCCEED in calling .register() UserAlreadyExists", () => {
        expect(() => {
          authService.register(user)
        }).toThrow(UserAlreadyExists)
      })
    })
  })

  describe('Authenticating', () => {
    describe('GIVEN an existing mock user', () => {

      const userId = "a random userId"
      const plainTextPassword = "12345678" 
    
      const { authService } = arrangeTestContext(userId, plainTextPassword)
  
      it("SHOULD SUCCEED in calling .authenticate()", () => {
        
        expect(() => {
          authService.authenticate(userId, plainTextPassword) 
        }).not.toThrow(NotFoundError)
      })
    })
    describe('GIVEN an unknown userId', () => {
  
      const userId = "a random userId"
      const plainTextPassword = "12345" 
      const unknownUserId = "xyz"
  
      const { authService } = arrangeTestContext(unknownUserId, plainTextPassword)
  
      it("SHOULD NOT SUCCEED in calling .authenticate() NotFoundError", () => {
        
        expect(() => {
          authService.authenticate(userId, plainTextPassword) 
        }).toThrow(NotFoundError)
      })
    })
    describe('GIVEN an incorrect password', () => {
  
      const userId = "a random userId"
      const plainTextPassword = "12345678" 
      const IncorrectPlainTextPassword = "an incorrect password" 
      
      const { authService } = arrangeTestContext(userId, plainTextPassword)
  
      it("SHOULD NOT SUCCEED in calling .authenticate() IncorrectPasswordError", () => {
        
        expect(() => {
          authService.authenticate(userId, IncorrectPlainTextPassword) 
        }).toThrow(IncorrectPasswordError)
      })
    })
  })
}); 