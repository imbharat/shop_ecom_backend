"use strict";

import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("../../config/SequelizeConfig.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default sequelize;
