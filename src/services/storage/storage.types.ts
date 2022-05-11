import ModelName from "../../models/model-name"
import StorageAdapterStub from "./storage-adapter.stub"
import StoragePostgresAdapter from "./storage-postgres.adapter"

export type StorageServiceType = StorageAdapterStub | StoragePostgresAdapter

export interface StorageState {
  [key: string]: {[key: string]: object}
}
export interface StorageInterface {
  getById: (modelName: ModelName, id: string) => object | null,
  create: (modelName: ModelName, entity: any) => void
}