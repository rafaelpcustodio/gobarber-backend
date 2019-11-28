import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models)); // associar avatar img com o user
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect('mongodb://localhost:27017/gobarber', {
        useNewUrlParser: true,
        useFindAndModify: true,
      })
      .catch(err => console.log(err));
  }
}

export default new Database();
