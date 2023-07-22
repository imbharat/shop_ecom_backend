import { singleton } from "tsyringe";
import { DataTypes, Model } from "sequelize";

import sequelize from "./init/Init";

@singleton()
export default class Orders extends Model {}

Orders.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    net: {
      type: DataTypes.FLOAT,
    },
    customer: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "orders",
    indexes: [
      {
        name: "oid_business",
        unique: true,
        fields: ["order_id", "business_id"],
      },
    ],
  }
);

Orders.sync();
