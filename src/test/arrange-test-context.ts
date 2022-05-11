import ModelName from "../models/model-name";
import User from "../models/user";
import { AuthService } from "../services/auth/auth-service";
import StorageAdapterStub from "../services/storage/storage-adapter.stub";
import { StorageServiceType, StorageState } from "../services/storage/storage.types";

function arrangeStorageService(initialState: StorageState): StorageServiceType {
  return new StorageAdapterStub(initialState);
}

export default function arrangeTestContext(userId: string, plainTextPassword: string) {
  
  const mockUser = new User(
    userId,
    "fulano",
    AuthService.hashPassword(plainTextPassword)
  );

  
  const initialState: StorageState = {
    [ModelName.User]: {
      [mockUser.id]: mockUser 
    }
  }

  const storageService = arrangeStorageService(initialState)
  const authService = new AuthService(storageService)


  return {
    authService,
  }
}