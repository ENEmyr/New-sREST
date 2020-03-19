const DB_CONFIG = require('../config/configDB.json');

class MongooseConnect {
  constructor(username, password, connectionURI) {
    const options = {
      user              : username || DB_CONFIG.username,
      pass              : password || DB_CONFIG.password,
      useUnifiedTopology: true,
      useNewUrlParser   : true,
      keepAlive         : 300000,
      connectTimeoutMS  : 30000
    }
    this.options       = options
    this.connectionURI = connectionURI || DB_CONFIG.connectionURI
    this.mongoose      = require('mongoose')
  }

  set options(val) {
    return this._options = val
  }

  set connectionURI(val) {
    return this._connectionURI = val
  }

  get options() {
    return this._options
  }

  get connectionURI(){
    return this._connectionURI
  }

  get state() {
    return this._mongoose.connection.readyState
  }

  async connect() {
    const state = this.mongoose.connection.readyState;
    if(state === 0 || state === 3){
      try {
        await this.mongoose.connect(this.connectionURI, this.options)
      } catch (error) {
        return false
      }
      return true
    } else {
      return true
    }
  }

  disconnect() {
    this.mongoose.connection.close()
    return true
  }
}

module.exports = MongooseConnect
