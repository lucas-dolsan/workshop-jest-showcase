import ModelName from "../../models/model-name";
import { StorageInterface } from "./storage.types";

class StoragePostgresAdapter implements StorageInterface {
  constructor() {}
  
  create(entity: any) {
    // 
  }
  
  getById(modelName: ModelName, id: string): object | null {
    // example
    return null
  }
}

export default StoragePostgresAdapter