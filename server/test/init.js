const os = require("os");
const fs = require("fs-extra");
const path = require("path");
const util = require("util");
const chalk = require("chalk");
const exec = util.promisify(require("child_process").exec);
const {
  configPath,
  defaultConfigPath,
  recommendMaterialsPath,
  appName,
  rootPath,
  staticPublishPath,
} = require("../const.js");

const { Sequelize, Model } = require("sequelize");
const sequelize = require("../db.js");

class User extends Model {}

function blockMapping(list = [], materialInfo) {
  const res = list
    ?.filter((v) => v)
    .map(function (v) {
      const defaultPath = v.defaultPath || `/packages/${v.key}`;
      return {
        name: v.key,
        title: v.title,
        author: v.author,
        description: v.description,
        sourceCode:
          v.url ||
          `http://git.sf-express.com/projects/GIS-JW/repos/gis-jw-core-ui/browse${defaultPath}?at=${encodeURIComponent(
            "refs/heads/" + materialInfo.gitBranch
          )}`,
        screenshot: v.img || "1.png",
        // category: v.tags && v.tags[0],
        category: v.tags,
        tags: v.tags,
        type: v.type || "block",
        dependencies: v.dependencies,
        previewUrl: `/${materialInfo.staticName}/${v.key}/`,
        downloadPath: defaultPath,
        staticName: materialInfo.staticName,
        belongLib: v.belongLib,
      };
    });
  return res;
}

async function genMaterialsJsonFile(item, materialsDir) {
  try {
    const { jsonFile } = item;
    let newJson = { ...item, list: {} };
    const jsonFilePath = path.join(materialsDir, jsonFile);
    let data = await fs.readJson(jsonFilePath);
    const blocks = data.blocks || data.list; // 两种物料的配置不一样
    newJson.list.blocks = blockMapping(blocks, item);
    // 同步成统一规范格式的配置，后续持续直接读此文件
    const dest = path.join(materialsDir, "materials.json");
    let str = JSON.stringify(newJson, null, "\t");
    await fs.writeFile(dest, str);
  } catch (err) {
    console.error(err);
  }
}

// 物料数据转换
async function materialsTranslate(item, materialsDir) {
  genMaterialsJsonFile(item, materialsDir);
}

// 同步文件或文件夹
async function copy(sd, td) {
  if (!fs.pathExistsSync(td)) {
    fs.mkdirSync(td, { recursive: true });
  }
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = fs.readdirSync(sd, { withFileTypes: true });
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = path.resolve(sd, file.name);
    // 目标文件
    const tagFile = path.resolve(td, file.name);
    // 文件是目录且未创建
    if (file.isDirectory() && !fs.existsSync(tagFile)) {
      fs.mkdirSync(tagFile, (err) => console.log(err));
      copy(srcFile, tagFile);
    } else if (file.isDirectory() && fs.existsSync(tagFile)) {
      // 文件时目录且已存在
      copy(srcFile, tagFile);
    }
    !file.isDirectory() &&
      fs.copyFileSync(srcFile, tagFile, fs.constants.COPYFILE_FICLONE);
  }
}

module.exports = async function init() {
  try {
    const mainPath = path.join(rootPath, `${appName}`); // 主目录
    var materials = [];
    if (!fs.pathExistsSync(mainPath)) {
      fs.mkdirSync(mainPath);
    }
    console.log(`本地缓存目录: ${chalk.blue(mainPath)}`);
    const { nodeTool, downloadPath } = await fs.readJson(defaultConfigPath); // 默认设置
    const recommendMaterials = await fs.readJson(recommendMaterialsPath); // 推荐物料
    materials = materials.concat(recommendMaterials);
    // 初始化个人配置
    if (!fs.pathExistsSync(configPath)) {
      let data = {
        customMaterials: [],
        myProjects: [],
        nodeTool,
        downloadPath,
        workingDirectory: null,
      };
      let str = JSON.stringify(data, null, "\t");
      await fs.writeFile(configPath, str);
    }
    const data = await fs.readJson(configPath);
    if (data.customMaterials) {
      materials = materials.concat(data.customMaterials);
    }
    // 遍历仓库列表
    // console.log(materials);
    for (const item of materials) {
      if (!item.name || !item.gitName) {
        continue;
      }
      if (item.active) {
        let materialsDir = path.join(rootPath, `${appName}/${item.name}`);
        let existMaterialsDir = path.join(
          rootPath,
          `${appName}/${item.name}/${item.gitName}`
        );
        if (fs.pathExistsSync(materialsDir)) {
          let { stdout } = await exec(
            'git config --global http.sslVerify "false"',
            {
              cwd: materialsDir,
            }
          );

          let res = await exec(`git pull origin ${item.gitBranch}`, {
            cwd: existMaterialsDir,
          });

          stdout = res.stdout;

          materialsTranslate(item, existMaterialsDir);
          console.log(`stdout: ${chalk.blue(item.name)} ${stdout}`);
        } else {
          // const mainPath = path.join(os.homedir(), `.${appName}`) // 主目录
          // var materials = []
          if (!fs.pathExistsSync(materialsDir)) {
            fs.mkdirSync(materialsDir);
          }

          let { stdout } = await exec(
            'git config --global http.sslVerify "false"',
            {
              cwd: materialsDir,
            }
          );

          let res = await exec(
            `git clone --depth 1 -b ${item.gitBranch} ${item.gitPath}`,
            {
              cwd: materialsDir,
            }
          );

          stdout = res.stdout;

          materialsTranslate(item, existMaterialsDir);
          console.log(`stdout: ${chalk.blue(item.name)} ${stdout}`);
        }
        // 在服务器部署时，静态文件入nginx
        if (process.env.NODE_ENV === "production" && item.staticUpdate) {
          // if (item.staticUpdate) {
          const staticBlockRootPath = path.join(
            staticPublishPath,
            item.staticName
          );
          if (!fs.pathExistsSync(staticBlockRootPath)) {
            fs.mkdirSync(staticBlockRootPath);
          }
          const packagePath = path.join(existMaterialsDir, "packages");
          // 遍历区块目录，取静态编译包
          fs.readdir(packagePath, (err, files) => {
            files.forEach((blockName) => {
              // 先检查nginx下有没有该区块，有则清空
              const targetBlockPath = path.join(staticBlockRootPath, blockName);
              if (fs.pathExistsSync(targetBlockPath)) {
                fs.emptyDirSync(targetBlockPath);
              }
              const blockPath = path.join(packagePath, blockName);
              const blockStaticPath = path.join(blockPath, blockName);
              if (fs.pathExistsSync(blockStaticPath)) {
                console.log(
                  `开始同步物料${blockName}, 静态文件目录：${blockStaticPath}`
                );
                fs.copySync(blockStaticPath, targetBlockPath);
              }
              // 同步缩略图snapshot文件夹
              const snapshotFolderPath = path.join(blockPath, "snapshot");
              // const snapshotPath = path.join(blockPath, 'snapshot.png')
              if (fs.pathExistsSync(snapshotFolderPath)) {
                const targetSnapshotPath = path.join(
                  staticPublishPath,
                  "resources",
                  "materials",
                  item.staticName,
                  `${blockName}`
                );
                copy(snapshotFolderPath, targetSnapshotPath);
              }
              // else if (fs.pathExistsSync(snapshotPath)) {
              //   const targetSnapshotPath = path.join(
              //     staticPublishPath,
              //     'resources',
              //     'materials',
              //     item.staticName,
              //     `${blockName}.png`
              //   )
              //   console.log(`开始同步物料${blockName}缩略图, 缩略图：${snapshotPath}`)
              //   fs.copySync(snapshotPath, targetSnapshotPath)
              // }
            });
          });
        }
      }
    }
    console.log(chalk.bgBlue("初始化结束"));
    return "初始化成功";
  } catch (err) {
    console.error(err);
  }
};
