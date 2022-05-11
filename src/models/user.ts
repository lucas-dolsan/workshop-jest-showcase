class User extends Object {
  id: string
  name: string
  password: string
  
  constructor(id: string, name: string, password: string) {
    super()
    this.id = id
    this.name = name
    this.password = password
  }
}

export default User