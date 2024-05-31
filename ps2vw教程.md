1. 找到node_modules/postcss-px-to-viewport/index.js

将atRule修改为AtRule

2. 安装patch-package

npm install patch-package-D

3.在package.json的scripts中增加如下内容

"postinstall": "patch-package",

4.运行指令

npx patch-package postcss-px-to-viewport

5.重新install数据

pnpm install 或 npm install

6.重启项目即可

 