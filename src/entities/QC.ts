import { singleton } from "tsyringe";
import { Model, DataTypes } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class QCs extends Model {}

QCs.init(
  {
    qc_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    qc_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "qcs",
  }
);
