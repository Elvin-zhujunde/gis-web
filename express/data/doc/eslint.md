

# 运行环境

node > 14 <br>
vscode插件安装 prettier

# package.json 
## devDependencies 初始化依赖
```js
"devDependencies": {
    ...
// 基础依赖
    "husky": "^8.0.3",
    "@babel/core": "^7.22.17",
    "@babel/eslint-parser": "^7.22.15",
    "eslint": "^7.32.0 || ^8.2.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-html": "^7.1.0",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-prettier": "^5.0.0",
    "prettier": "^3.0.2",
    "prettier-plugin-organize-imports": "^3.2.3",
    "prettier-plugin-packagejson": "^2.4.5",
    
// 选配依赖

    // markdown
    "eslint-plugin-markdown": "^2.2.1",
    
    // jsonc
    "jsonc-eslint-parser": "^2.1.0",
    "eslint-plugin-jsonc": "^2.2.1",
    
    // yaml
    "yaml-eslint-parser": "^0.5.0",

    // vite兼容 eslint
    "vite-plugin-eslint": "^1.8.1",
    
    // ft-eslint-vue-common
    "vue-eslint-parser": "^9.3.1",
    "eslint-plugin-vue": "^9.17.0",
    
    // ft-eslint-typescript
    "@typescript-eslint/parser": "^5.17.0",
    "@typescript-eslint/eslint-plugin": "^5.59.8",
}
//  "babel-eslint": "^10.1.0",  停更

```
依赖说明


| 依赖名 | 说明 |备注|
| --- | --- | --- |
|@babel/core|所有转换都将使用你本地的 [配置文件](https://babel.nodejs.cn/docs/config-files)。|
|@babel/eslint-parser|Babel 解析器（以前的 Babylon）是 [Babel](https://github.com/babel/babel) 中使用的 JavaScript 解析器。|
|husky|使用Husky，编写脚本，在代码提交之前，自动对代码进行格式化、优化、自定义。|
|eslint|eslint检查我们写的 JavaScript 代码是否满足指定规则的 静态代码检查工具 。|
|eslint-config-airbnb-base|这个包提供了Airbnb的基础JS .eslintrc(不含React插件)作为可扩展的共享配置。|
|eslint-config-prettier|使用 Prettier 默认推荐配置，并且关闭 eslint 自身的格式化功能，防止 Prettier 和 ESLint 的自动格式化的冲突|
|eslint-plugin-html|一个ESLint插件，用于从HTML文件中提取和lint脚本|
|eslint-plugin-import| 用于校验es6的import规则，如果增加import plugin，在我们使用webpack的时候，如果你配置了resove.config.js的alias，那么我们希望import plugin的校验规则会从这里取模块的路径，此时需要配置. “rules”: {}, "settings": { // 使用webpack中配置的resolve路径 "import/resolver": "webpack" }.|
|eslint-plugin-markdown|在 Markdown 中使用 Lint JS、JSX、TypeScript 等。<br>[eslint-plugin-markdown中文文档](http://www.npmdoc.org/eslint-plugin-markdownzhongwenwendangeslint-plugin-markdown-jszhongwenjiaochengjiexi.html)|eslint 6+ <br>考虑兼容vue-press
|eslint-plugin-prettier|eslint-plugin-prettier 是 一个 ESLint 插件， 由 Prettier 生态提供，用于报告错误给 ESLint|` "plugin:prettier/recommended", 配置在extends的最后，防止被覆盖`|
|eslint-plugin-vue|这个插件允许我们用ESLint检查. Vue文件中的\<template>和\<script>，以及.js文件中的Vue代码。<br>plugin:vue/base：基础<br>plugin:vue/essential：预防错误的（用于 Vue 2.x）<br>plugin:vue/recommended：推荐的，最小化任意选择和认知开销（用于 Vue 2.x）；<br>plugin:vue/strongly-recommended：强烈推荐，提高可读性（用于 Vue 2.x）；<br>plugin:vue/vue3-essential：（用于 Vue 3.x）<br>plugin:vue/vue3-strongly-recommended：（用于 Vue 3.x）<br>plugin:vue/vue3-recommended：（用于 Vue 3.x）||
|prettier|[Prettier 是一个“有态度”的代码格式化工具](https://www.prettier.cn/docs/next/index.html)|
|prettier-plugin-organize-imports|import 排序 组合 去除无用|
|prettier-plugin-packagejson|package.json 里面的 key 排序|
|vue-eslint-parser|这个解析器允许我们检查 \<template> .vue 文件。\<template> 如果我们在模板中使用复杂的指令和表达式，我们很容易犯错误。这个解析器和eslint-plugin-vue的规则会抓住一些错误。|
|eslint-plugin-jsonc|eslint-plugin-jsonc 是用于 JSON、JSONC 和 JSON5 文件的 ESLint 插件。<br>📛 特点 这个 ESLint 插件提供了与更好的方法相关的 linting 规则，以帮助您避免在使用 JSON、JSONC 和 JSON5 时出现问题|
|jsonc-eslint-parser|这个解析器允许我们下载JSON，JSONC和JSON5文件。这个解析器和eslint-plugin-jsonc的规则将捕获一些错误和代码样式违规。|
|yaml-eslint-parser|A YAML parser that produces output [compatible with ESLint](https://eslint.org/docs/developer-guide/working-with-custom-parsers#all-nodes).这个解析器由优秀的yaml包支持，它在很大程度上受到yaml-unist-parser包的启发。|
|vite-plugin-eslint|vite-plugin-eslint 是一个 Vite 插件，用于在 Vite 项目中集成 ESLint 代码检查功能。它可以帮助我们在开发过程中自动检测代码中的潜在问题，并提供建议和警告，以确保代码的质量和一致性。|
|@typescript-eslint/parser|@typescript-eslint/parser 在解析 TypeScript 代码时，会将 TypeScript 中的类型信息也解析出来，并将其注入到 AST 中，从而使得在进行静态检查时，能够更加准确地判断变量的类型和函数的参数等信息。|
|@typescript-eslint/eslint-plugin|@typescript-eslint/eslint-plugin 有很多 ESLint 的规则我们是可以复用的。 尽管我们对 TypeScript AST 进行了转换，但转换后的 ESTree 中，针对 typescript 中的语法，ESLint 仍然是看不懂的。 所以对于 typescript，ESLint 提供的一些规则不再适用。 该 plugin 的存在就是为了做这样一件事，提供相应的 rule，让 ESLint 能够识别。同时为了避免冲突，在手动开启该 plugin 的某些规则时，需要将 ESLint 当中的一些规则关闭。|
|bebel-eslint|一个对Babel解析器的包装，babel本身也是js解析器的一种。如果我们的代码需要经过babel转化，则对应使用这个解析器|`停止维护，不再更新，改用 @babel/parser`|
|lint-staged|lint-staged 是一个运行 lint 检查和格式化代码的工具，它可以在提交代码之前自动执行预定义的 lint 和格式化命令。|`暂不考虑使用`|

## scripts


```js
    "scripts": {
        "lint": "eslint packages/**/*.{vue,js,html} --fix",
        "prepare": "husky install",
        "prettier": "prettier -w packages/**/*.{vue,js}"
    },
```
# 配置教程
## 选项式配置.eslintrc.cjs


规范提供的eslint模板<br>
- `ft-eslint-base` - *基础规范*<br>
- `ft-eslint-typescript` -*TypeScript规范*<br>
- `ft-eslint-vue-common` -*vue基础规范*<br>
    - `ft-eslint-vue2`<br>
    - `ft-eslint-vue3`<br>

使用配置仅需根目录下新建 **`.eslintrc.cjs`** 文件并引入相应模板文件，如下示例：<br>

```js
// .eslintrc.cjs
module.exports = {
    env: {},
    // 顺序不能变
    extends: ["./ft-eslint-base.cjs", "./ft-eslint-vue-common.cjs"],
    plugins: [],
    parserOptions: {},
    overrides: [],
    settings: {},
    globals: {
        getDomBoxHeight: true,
    },
    rules: {},
}


```
>**`注意`**: **extends**是有配置顺序，配置在后面的文件会覆盖配置在前面的文件。<br>
配置优先级（省略ft-eslint-）为
`base < typescript < vue2 | vue3  `
> 

>如果提供的模板文件无法满足您的代码规范要求<br>您可根目录下运行 **`npx eslint --init`** 或者 **`npm init @eslint/config`** 自行初始化eslint





### ft-eslint-base.cjs

依赖<br>
`"@babel/core": "^7.22.17",`<br>
`"@babel/eslint-parser": "^7.22.15",`<br>
`"eslint": "^7.32.0 || ^8.2.0",`<br>
`"eslint-config-airbnb-base": "^15.0.0",`<br>
`"eslint-config-prettier": "^9.0.0",`<br>
`"eslint-plugin-html": "^7.1.0",`<br>
`"eslint-plugin-import": "^2.25.2",`<br>
`"eslint-plugin-prettier": "^5.0.0",`<br>
```js

module.exports = {
    parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
        // 由于解析器只有一个，用了「vue-eslint-parser」就不能用「babel-eslint」。所以「vue-eslint-parser」的做法是，在解析器选项中，再传入一个解析器选项parser。从而在内部处理「babel-eslint」，检测<script>中的js代码
        // parser: "babel-eslint",
        parser: "@babel/eslint-parser",
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    // 注意顺序，可能会被覆盖
    extends: [
        "airbnb-base", //
        "plugin:prettier/recommended", // 用来解决eslint和prettier之间的冲突。
    ],
    plugins: [
        "html", //
        "import",
    ],

    // 定义全局变量，规避：error ‘XXXXX‘ is not defined no-undef
    globals: {
        SFMap: true,
        // document: "readonly",
        // navigator: "readonly",
        // window: "readonly",
    },
    rules: {
        // prettier
        "prettier/prettier": "warn",
        // js
        // 允许 this.x && this.x.x() 写法
        "no-unused-expressions": "off",
        // 允许++写法
        "no-plusplus": "off",
        // 允许 continue
        "no-continue": "off",
        // 无论您是否选择在标识符中允许悬挂下划线，都纯粹是一种约定，并且不会影响性能，可读性或复杂性。这纯粹是一种偏好。
        "no-underscore-dangle": "off", // "no-underscore-dangle": ["error", { allow: ["_loaded"] }],//也可以选择自己配置允许的变量，但由于本项目_开头变量过多，选择
        // 允许console
        "no-console": "off",
        // import
        // *以下四个是ESlint在vite中出现的坑：因为vite需要自己构建配置而vue-cli自动构建"@"，所以eslint不识别webpack的路径别名
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "import/no-absolute-path": "off",
        "import/no-extraneous-dependencies": "off",
        // 当导出只有一组数据的时候，需要默认导出。 当有两以上的数据时，就需要命名导出，
        "import/prefer-default-export": "off",
        // 告诉 ESLint 不对命名导入进行限制。这意味着你可以自由地使用通配符导入、默认导入或其他方式来导入模块
        "import/named": "off",
    },
    overrides: [
        {
            // 工具库里的js文件要求允许位运算符
            files: ["**/utlis/*.js"],
            rules: {
                // 允许 << & 等位运算
                "no-bitwise": "off",
            },
        },
    ],
    settings: {
        // eslint-plugin-import - import/order配置项  配置教程参考博客 https://blog.csdn.net/u010753613/article/details/130135672
        "import/order": [
            "error",
            {
                // 约定引入模块顺序的集合
                // builtin ：内置模块，如 path，fs等 Node.js内置模块。
                // external ：外部模块，如 lodash ，react 等第三方库。
                // internal ：内部模块，如相对路径的模块、包名前缀为 @ 的模块。
                // unknown ：未知模块，如模块名没有指定扩展名或模块路径缺失扩展名。
                // parent ：父级目录的模块。
                // sibling ：同级目录的模块。
                // index ：当前目录的 index 文件。
                // object ：使用ES6 导入的模块。
                // type ：使用 import type 导入的模块。
                groups: [["builtin", "external"], "internal", ["parent", "sibling"], "index", "unknown"],
                pathGroups: [
                    {
                        pattern: "../**",
                        group: "parent",
                        position: "after",
                    },
                    {
                        pattern: "./*.{scss,less,css}",
                        group: "sibling",
                        position: "after",
                    },
                ],
                "newlines-between": "always",
                // alphabetize: {
                //   order: 'asc',
                //   caseInsensitive: true,
                // },
            },
        ],
    },
}

```

### ft-eslint-typescript.cjs 兼容 TypeScript

依赖<br>
`"@typescript-eslint/parser": "^5.17.0",`<br>
`"@typescript-eslint/eslint-plugin": "^5.59.8",`<br>

```js
module.exports = {
    // 配置导入typescript模块和 启用一组被认为是最佳实践并广泛使用的 @typescript-eslint 规则。这些规则包括但不限于类型检查、空检测、命名约定等
    extends: ["plugin:import/typescript", "plugin:@typescript-eslint/recommended"],
    settings: {
        // 指定解析模块导入路径的字段
        "import/resolver": {
            node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".d.ts"] },
        },
    },
    // typescript的eslint解释器
    parser: "@typescript-eslint/parser",
    rules: {
        // TS
        // 不对对象和数组字面量的末尾逗号进行限制
        "@typescript-eslint/comma-dangle": "off",
        // 是否要求使用分号。`['error', 'never']` 意味着禁止使用分号
        "@typescript-eslint/semi": ["error", "never"],
        // 配置是否允许使用 `// @ts-ignore` 和类似注释来忽略 TypeScript 的类型检查。`'off'` 表示不禁用这种注释
        "@typescript-eslint/ban-ts-comment": "off",
        // 配置对象和类成员之间的分隔符样式。`['error', { multiline: { delimiter: 'none' } }]` 指定多行属性之间不允许有分隔符
        "@typescript-eslint/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
        // 配置类型注解前后的空格。`['error', {}]` 指定需要在冒号前后添加空格
        "@typescript-eslint/type-annotation-spacing": ["error", {}],
        // 强制一致的类型导入风格。`['error', { prefer: 'type-imports', disallowTypeAnnotations: false }]` 表示推荐使用类型导入，并且允许在变量声明时带有类型注解
        "@typescript-eslint/consistent-type-imports": [
            "error",
            { prefer: "type-imports", disallowTypeAnnotations: false },
        ],
        // 强制一致的类型定义风格。`['error', 'interface']` 表示推荐使用接口进行类型定义
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        // 强制一致的索引对象风格。`['error', 'record']` 表示推荐使用记录（record）风格来表示索引对象
        "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
        // 推荐使用更明确的方式处理 TypeScript 中可能出现错误的代码。此设置为 `'error'`，表示强制要求使用 `// @ts-expect-error` 注释来标记明确知道会出现错误的代码块
        "@typescript-eslint/prefer-ts-expect-error": "error",

        // Override JS  取值：off || warn || error
        // 禁用不必要的构造函数
        "no-useless-constructor": "off",
        // 禁用缩进规则
        indent: "off",
        // 配置typescript文件中缩进的方式
        "@typescript-eslint/indent": ["error", 4],
        // 禁用未使用后的变量规则
        "no-unused-vars": "off",
        // 检测未使用变量的方式，除非变量名以下划线开头，否则将报告未使用的变量错误
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        // 禁用重复声明规则
        "no-redeclare": "off",
        // 配置重复声明的检测方式
        "@typescript-eslint/no-redeclare": "error",
        // 在定义之前使用变量或函数
        "no-use-before-define": "off",
        // 配置 TypeScript 文件中在定义之前使用变量或函数时的检测方式,指定函数和类可以在定义之前使用，但变量不能在定义之前使用
        "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false, variables: true }],
        // 禁用花括号风格检查
        "brace-style": "off",
        // 配置ts文件中花括号分各个设置
        "@typescript-eslint/brace-style": "off",
        // 禁用对象字面量内部花括号间距检查
        "object-curly-spacing": "off",
        // 配置ts文件对象内部花括号间距，在对象字面量内部始终需要添加间距，即首尾需要有一个空格
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        // off
        // 禁用强制使用驼峰命名法
        "@typescript-eslint/camelcase": "off",
        // 禁用要求函数返回类型
        "@typescript-eslint/explicit-function-return-type": "off",
        // 禁用要求回显式声明成员可访问性
        "@typescript-eslint/explicit-member-accessibility": "off",
        // 禁用禁止使用any类型
        "@typescript-eslint/no-explicit-any": "off",
        // 禁用禁止在构造函数参数中使用参数属性的规则
        "@typescript-eslint/no-parameter-properties": "off",
        // 禁用禁止空接口的规则
        "@typescript-eslint/no-empty-interface": "off",
        // 禁用不允许使用 `// @ts-ignore` 注释的规则
        "@typescript-eslint/ban-ts-ignore": "off",
        // 禁用禁止空函数的规则
        "@typescript-eslint/no-empty-function": "off",
        // 禁用不允许非空断言操作符 `!` 的规则
        "@typescript-eslint/no-non-null-assertion": "off",
        // 禁用要求显式声明模块边界类型的规则
        "@typescript-eslint/explicit-module-boundary-types": "off",
        // 禁用禁止某些类型的使用（如 `Object` 和 `Function`）的规则
        "@typescript-eslint/ban-types": "off",
        // 禁用不允许使用命名空间的规则
        "@typescript-eslint/no-namespace": "off",
    },
}

```
### ft-eslint-vue-common.cjs

依赖: <br>`"vue-eslint-parser": "^9.3.1",`<br>
    `"eslint-plugin-vue": "^9.17.0",`

```js
module.exports = {
    overrides: [
        {
            files: ["*.vue"],
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
            rules: {
                "no-unused-vars": "off",
                "no-undef": "off",
                "@typescript-eslint/no-unused-vars": "off",
            },
        },
    ],
    plugins: ["vue"],
    rules: {
        // vue
        // 关闭eslint检查文件名是否为驼峰命名
        "vue/multi-word-component-names": "off",
        "vue/max-attributes-per-line": "off",
        "vue/no-v-html": "off",
        "vue/require-prop-types": "off",
        "vue/require-default-prop": "off",

        // reactivity transform
        "vue/no-setup-props-destructure": "off",

        "vue/component-tags-order": [
            "error",
            {
                order: ["template", "script", "style"],
            },
        ],
    },
}
```
### ft-eslint-vue2.cjs


```js

```
### ft-eslint-vue3.cjs


```js
module.exports = {
    env: {
        "vue/setup-compiler-macros": true, // vue3使用<script setup>语法糖时 不引入defineEmits,直接使用时报错
    },
    extends: ["plugin:vue/vue3-recommended", "./ft-eslint-vue-common.cjs"],
    rules: {},
}
```
### 拓展配置

#### 在 Markdown 中使用 Lint JS、JSX、TypeScript 等
- 依赖安装 `"eslint-plugin-markdown": "^2.2.1"`
- 配置 .eslintrc.cjs
    ```js
    module.exports = {
        extends: [
            // 注意顺序，后面配置会覆盖前面配置
            "plugin:markdown/recommended", // eslint-plugin-markdown-配置extends
            ...
        ],
        plugins: [
            ...
            "markdown", // eslint-plugin-markdown-配置plugins
        ],
        overrides: [
            ...
            // eslint-plugin-markdown-配置overide
            {
                files: ["**/*.md"],
                processor: "markdown/markdown",
            },
            {
                // Code blocks in markdown file
                files: ["**/*.md/*.*"],
                rules: {
                    "no-alert": "off",
                    "no-restricted-imports": "off",
                    "no-undef": "off",
                    "no-unused-expressions": "off",
                    "no-unused-vars": "off",
                },
            },
        ],
    }
    ```


#### 兼容 JSON，JSONC和JSON5
- 依赖安装<br>
 `"jsonc-eslint-parser": "^2.1.0",`<br>
 `"eslint-plugin-jsonc": "^2.2.1",`

- 配置 .eslintrc.cjs
    ```js
    module.exports = {
        extends: [
            // 注意顺序，后面配置会覆盖前面配置
            "plugin:jsonc/recommended-with-jsonc", // eslint-plugin-jsonc-配置extends
            ...
        ],
        plugins: [
            ...
            "jsonc", // eslint-plugin-jsonc-配置plugins
        ],
        overrides: [
            ...
            {
                files: ["*.json", "*.json5"],
                parser: "jsonc-eslint-parser",
                rules: {},
            },
        ],
    }

    ```



## .prettierrc.cjs配置
- 依赖<br>
`"prettier": "^3.0.2", `<br>
`"prettier-plugin-organize-imports": "^3.2.3",`<br>
`"prettier-plugin-packagejson": "^2.4.5",`<br>
- 配置
    ```js
    module.exports = {
        semi: false, //句末使用分号
        tabWidth: 4, //缩进长度
        useTabs: false, //使用空格代替tab缩进
        printWidth: 120, //单行长度
        endOfLine: "crlf", //结束行形式
        singleQuote: false, //使用单引号
        insertPragma: false, //在已被preitter格式化的文件顶部加上标注
        proseWrap: "always", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
        jsxSingleQuote: true, // jsx中使用单引号
        trailingComma: "all", //多行时尽可能打印尾随逗号
        bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
        arrowParens: "avoid", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
        requirePragma: false, //无需顶部注释即可格式化
        // parser: "babylon", // 格式化的解析器，默认是babylon
        quoteProps: "as-needed", //仅在必需时为对象的key添加引号
        jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
        singleAttributePerLine: true, // 属性占单行
        vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
        embeddedLanguageFormatting: "auto", //对引用代码进行格式化
        htmlWhitespaceSensitivity: "ignore", //对HTML全局空白不敏感
        plugins: [
            require.resolve("prettier-plugin-organize-imports"), // import 引入排序组合，去除无用
            require.resolve("prettier-plugin-packagejson"), // package.json 里面的排序规则
        ],
    }

    ```
## .eslintignore 和 .prettierignore 配置

```

```


## husky配置（暂未实行，后期有需求再跟进）
- 依赖<br>
`"husky": "^8.0.3",`

- 与package.json同级目录下终端执行<br> `npm set-script prepare "husky install"` <br>
 `npm run prepare` <br>

- 此时目录下会添加一个 .husky文件夹，然后执行<br> `npx husky add .husky/pre-commit 'yarn lint'`<br> 这里是husky在git提交前
要执行一遍 yarn lint命令来规范提交前的代码质量，如不需要提交前进行代码检测，可#进行注释即可


## vscode 配置


```js
{
    // 使用每一种语言的默认格式化规则
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    // 可以使用快捷键Ctrl + Shift + P打开命令面板
    "window.commandCenter": true,
    // 新开文件是一个独立的新窗口
    "workbench.startupEditor": "newUntitledFile",
    // 取消预览模式
    "workbench.editor.enablePreview": false,
    // 自动保存
    "files.autoSave": "afterDelay",
    // 自动保存的间隔时间
    "files.autoSaveDelay": 1000,
    // 在保存文件时自动对代码进行格式化
    "editor.formatOnSave": true,
    // 编辑器的缩略图（minimap）填满整个编辑器的高度
    "editor.minimap.size": "fill",
    // 在缩略图（minimap）中始终显示滑块
    "editor.minimap.showSlider": "always",
    // 单词分隔符中包含哪些字符,双击可复制
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
    // 默认格式化方式，统一为 prettier
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    // 在保存时运行的代码操作类型
    "editor.codeActionsOnSave": {},
    // 将 Visual Studio Code 的图标主题设置为 VSCode Icons
    "workbench.iconTheme": "vscode-icons",
    // 差异编辑器（diff editor）在比较文件时考虑空格的变化
    "diffEditor.ignoreTrimWhitespace": false,
    // 将 Chrome 浏览器设置为 Live Server 打开的默认浏览器
    "liveServer.settings.CustomBrowser": "chrome",
    // 关闭 Visual Studio Code 中删除文件或文件夹时的确认提示
    "explorer.confirmDelete": false,
    // 禁止在 Visual Studio Code 启动时显示 VSCode Icons 的新版本消息提示
    "vsicons.dontShowNewVersionMessage": true,
    // 标准分辨率下进行缩放,可以增加或减少编辑器的整体显示大小,负数的值表示缩小界面，而正数的值则会放大界面
    //"window.zoomLevel": -1,
    // 用于指定在保存文件时应该执行哪些 ESLint 规则的自动修复操作
    // "eslint.codeActionsOnSave.rules": null,
    // 添加或修改特定规则以满足项目或团队的需求
    // "eslint.notebooks.rules.customizations": [],
    "Codegeex.Privacy": false,
}
```

