import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Locations extends Model {}

Locations.init(
  {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    location_name: {
      type: DataTypes.STRING,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "locations",
  }
);
