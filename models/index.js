const User = require("./User");
const Exercise = require("./Exercise");
const ExerciseRecord = require("./exerciseRecord");

User.hasMany(ExerciseRecord, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

ExerciseRecord.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

ExerciseRecord.belongsTo(Exercise, {
  foreignKey: "exercise_id",
  onDelete: "CASCADE",
});

Exercise.hasMany(ExerciseRecord, {
  foreignKey: "exercise_id",
  onDelete: "CASCADE",
});

module.exports = { User, Exercise, ExerciseRecord };
