eslint-plugin-import是什么？
该插件目的在于支持ES6以上的导入/导出语法，并防止文件路径和导入名称拼写错误的问题。

import/order是什么？
按照约定的规则对引入的模块进行排序。

import/order常用规则介绍
groups
约定引入模块顺序的集合。

选项
"builtin", "external", "internal", "unknown", "parent", "sibling", "index", "object", "type"。

builtin ：内置模块，如 path，fs等 Node.js内置模块。
external ：外部模块，如 lodash ，react 等第三方库。
internal ：内部模块，如相对路径的模块、包名前缀为 @ 的模块。
unknown ：未知模块，如模块名没有指定扩展名或模块路径缺失扩展名。
parent ：父级目录的模块。
sibling ：同级目录的模块。
index ：当前目录的 index 文件。
object ：使用ES6 导入的模块。
type ：使用 import type 导入的模块。
默认值
["builtin", "external", "parent", "sibling", "index"]。

使用方法
"groups": ["index", 
      "sibling",
      "parent",
      "internal",
      "external",
      "builtin",
      "object",
      "type"
]
 
// 亦可
"groups": [
  'builtin',
  ['sibling', 'parent'], // 可以混合使用
  'index',
  'object'
]
注意：

强制执行的顺序与组中每个元素的顺序相同。

省略的类型被隐式地分组在一起作为最后一个元素。

pathGroups
可以通过该配置设置别名，进行自定义路径分组。

属性
pattern
该组中模块的最短匹配路径

patternOptions
最短匹配的选择，默认值：nocomment: true。即禁止将#开头的视为注释的行为。

group
该模块路径所属的组，在规定的组中选一个，pathGroup将相对于该组定位。

position
定义该模块路径在其所属组别中的位置，可以是“after”或“before”，如果未提供，则pathGroup将像组一样定位。

newlines-between
不同组之间是否换行。

选项
ignore：忽略，不会报告与导入组之间的新行相关的错误。

always：始终，每个组之间将强制增加至少一条新行，并且组内的新行将被禁止。为了防止导入之间出现多行，可以使用’no-multiple-empty-lines‘规则。

always-and-inside-groups：始终和内部组，规则同always，但其允许在组内插入空行。

never：从不，整个导入部分不允许出现新行。

默认值
ignore

alphabetize
根据字母顺序对每组内的引用进行排序。

属性
order
选项：asc|desc|ignore，默认值： ignore

orderImportKind
规定引入类型的排序顺序

选项：asc|desc|ignore，默认值： ignore

caseInsensitive
字母排序时是否忽略大小写

选项：true|false，默认值： false

ESLint引入步骤
1.安装
npm install eslint-plugin-import --save-dev
2.配置
plugins
plugins: ['import']
rules
rules: {
   'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '../**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: './*.scss',
            group: 'sibling',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        // alphabetize: {
        //   order: 'asc',
        //   caseInsensitive: true,
        // },
      },
    ]
}
3.旧代码修复
执行命令：npm run eslint-fix
————————————————
版权声明：本文为CSDN博主「青春微凉不悲伤」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u010753613/article/details/130135672