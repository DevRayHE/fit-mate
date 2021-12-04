const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ExerciseRecord extends Model {}

// Define each table row attributes with data validation
ExerciseRecord.init(
  {
    exercise_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // minutes
    duration: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    calories_burnt: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "exercise",
        key: "exercise_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exerciseRecord",
  }
);


module.exports = ExerciseRecord;

