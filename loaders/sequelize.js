const sequelize = require('../configs/database');
const Logger = require('./logger');

module.exports = async () => {

  // Something code...
  // Relationship sequelize code...
  // Example:
  // Model1.hasMany(Model2, {
  //   foreignKey: { allowNull: false },
  // });
  // Model2.belongsTo(Model1);

  return (
    sequelize
      // .sync({ force: true })
      .sync()
      .then(async () => {
        Logger.success(`✌️ MySql Connected`);
      })
      .catch((error) => {
        Logger.error(`MySql Connection Error: ${error}`);
      })
  );
};
