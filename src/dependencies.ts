require('dotenv').config()

import StorageAdapterStub from "./services/storage/storage-adapter.stub"
import StoragePostgresAdapter from "./services/storage/storage-postgres.adapter"

type Envvars = {
  useStub: boolean | undefined
}

function readEnvvars(): Envvars {
  const useStub = process.env.useStub

  if(!useStub) {
    throw new Error("Envvar error")
  }

  return {
    useStub: JSON.parse(useStub)
  }
}


function configure() {
  const { useStub } = readEnvvars()

  const StorageService = useStub ? StorageAdapterStub : StoragePostgresAdapter

  return {
    storageService: new StorageService()
  }
}

export default {
  configure
}