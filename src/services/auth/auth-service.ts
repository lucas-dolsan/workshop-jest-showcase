import * as crypto from "crypto";
import dependencies from "../../dependencies";
import ModelName from "../../models/model-name";
import User from "../../models/user";
import { StorageServiceType } from "../storage/storage.types";
import IncorrectPasswordError from "./exceptions/incorrect-password.error";
import NotFoundError from "./exceptions/not-found-error";
import PasswordTooShortError from "./exceptions/password-too-short.error";
import UserAlreadyExists from "./exceptions/user-already-exists";

export class AuthService {  
  storageService: StorageServiceType

  constructor(storageService?: StorageServiceType) {
    this.storageService = storageService || dependencies.configure().storageService
  }

  static hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
  
  static generateToken() {
    const length = 20
    // The resulting string will be twice as long as the random bytes you generate; 
    // each byte encoded to hex is 2 characters. 20 bytes will be 40 characters of hex.
    return crypto.randomBytes(length/2).toString('hex');
  }
  
  static validatePassword(password: string) {
    if(password.length < 8) {
      throw new PasswordTooShortError()
    }
  }

  register(user: User) {
    AuthService.validatePassword(user.password)

    const existingUser = <User> this.storageService.getById(ModelName.User, user.id)
    
    if(existingUser) {
      throw new UserAlreadyExists()
    }
    
    user.password = AuthService.hashPassword(user.password)

    this.storageService.create(ModelName.User, user)
  }

  authenticate(userId: string, password: string): string {
    const user = <User> this.storageService.getById(ModelName.User, userId)

    if(!user) {
      throw new NotFoundError()
    }
  
    if(user.password !== AuthService.hashPassword(password)) {
      throw new IncorrectPasswordError()
    }
  
    return AuthService.generateToken()
  }
}

export const authservice = new AuthService()
