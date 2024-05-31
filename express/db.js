/**
 * 连接pg数据库并完成初始化
 */
const Sequelize = require("sequelize");
const { db } = require("./const.js");

const sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPassword, {
  host: db.dbHost,
  port: db.dbPort,
  dialect: db.dbDialect,
  pool: {
    max: db.dbPoolMax,
    min: db.dbPoolMin,
    idle: db.dbPoolIdle,
  },
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功...");
  })
  .catch((err) => {
    console.error("数据库连接失败:", err);
  });

module.exports = sequelize;
