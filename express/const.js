const os = require("os");
const path = require("path");
const appName = "FuTure.Design";
const rootPath =
  process.env.NODE_ENV === "development" ? os.homedir() : "/app/materials";
const staticPublishPath =
  process.env.NODE_ENV === "development" ? "" : "/app/nginx-1.21.6/html";

module.exports = {
  appName,
  rootPath,
  staticPublishPath,
  imageProxyPath: "http://localhost:8008/",
  mainPath: path.join(rootPath, `${appName}`),
  configPath: path.join(rootPath, `${appName}/config.json`),
  defaultConfigPath: path.join(__dirname, "../project.config.json"),
  recommendMaterialsPath: path.join(__dirname, "../recommendMaterials.json"),
  recommendResourcesPath: path.join(__dirname, "../recommendResources.json"),
  resourceImgBaseUrl: path.join(__dirname, "../src/assets/resource"),
  resourceDefaultImg: path.join(__dirname, "../src/assets/logo.png"),

  newsConfig: path.join(__dirname, "./news/config.json"),
  newsDataPath: path.join(__dirname, "./news/newsJson.js"),
  hasBeenSent: path.join(__dirname, "./news/hasBeenSent.json"),
  // 数据库相关配置
  db: {
    dbHost: "localhost",
    dbName: "world",
    // dbPort: 5432,
    dbPort: 3306,
    dbUser: "root",
    dbPassword: "zhu010301.",
    // dbDialect: "postgres", // 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一
    dbDialect: "mysql", // 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一
    dbPoolMax: 500,
    dbPoolMin: 10,
    dbPoolIdle: 60,
  },

  // redis相关配置
  redis: {},
};
