import ModelName from "../../models/model-name";
import { StorageInterface, StorageState } from "./storage.types";

class StorageAdapterStub implements StorageInterface {
  private state: StorageState

  constructor(initialState = {}) {
    this.state = initialState
  }

  create(modelName: ModelName, entity: any) {
    const modelState = this.state[modelName]
    modelState[entity.id]

  }

  getById(modelName: ModelName, id: string): object | null {
    const modelState = this.state[modelName]
    return modelState[id]
  }
}

export default StorageAdapterStub