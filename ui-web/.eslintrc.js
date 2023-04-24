module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 关闭--函数定义时括号前面是否要有空格
    'semi': 0, // 关闭--语句控制分号结尾
    'object-curly-spacing': 0, // 关闭--强制在大括号中使用一致的空格
    'quotes': 0, // 关闭--强制使用一致的反勾号、双引号或单引号
    'no-trailing-spaces': 0, // 关闭--禁用行尾空格
    'eol-last': 0, // 关闭--要求或禁止文件末尾存在空行
    'indent': 0, // 关闭-强制使用一致的缩进
    'comma-dangle': 0, // 关闭-要求或禁止末尾逗号
    'no-multiple-empty-lines': 0, // 关闭：禁止出现多行空行
    'semi-spacing': 0, // 关闭：强制分号之前和之后使用一致的空格
    'no-empty': 0, // 关闭-禁止出现空语句块
    'dot-notation': 0, // 关闭-强制尽可能的使用点号，例如obj.a,而不是obj['a']
    'padded-blocks': 0, // 关闭-要求或禁止块内填充
    'eqeqeq': 0, // 关闭--要求使用 === 和 !==
  }
}
