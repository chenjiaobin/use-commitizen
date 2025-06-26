# use-commitizen

一个演示Commitizen工具使用的Vue.js项目，用于规范和校验Git提交信息。

## 📋 项目描述

本项目是一个基于Vue.js 3的示例项目，主要目的是演示如何使用Commitizen工具来规范化Git提交信息。通过使用Commitizen，可以确保团队中的每个开发者都遵循统一的提交信息格式，提高代码仓库的可维护性。

## 📝 Git提交规范

本项目使用Commitizen工具来规范化Git提交信息。提交信息遵循[Conventional Commits](https://www.conventionalcommits.org/)规范。

### 提交类型

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码逻辑）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 使用Commitizen提交

1. 需要先在全局安装commitizen
```bash
npm install -g commitizen
```

2. 如果要在项目中使用commitizen生成符合AngularJS规范的提交说明，初始化cz-conventional-changelog适配器
```bash
commitizen init cz-conventional-changelog --save --save-exact
# 这个命令干了3件事情
# 项目中安装cz-conventional-changelog依赖
# 将适配器依赖保存到package.json的devDependencies字段信息
# 在package.json中新增config.commitizen字段信息，主要用于配置cz工具的适配器路径
```
项目在`package.json`中配置了Commitizen：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

3. 初始化后就可以使用下面的指令了
```bash
# 使用 git cz 替代 git commit
git cz
```

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

示例：
```
feat: 添加用户登录功能

- 实现用户名密码登录
- 添加记住密码功能
- 集成JWT认证

Closes #123
```

### 代码检查
```bash
npm run lint
# 或者使用 yarn
yarn lint
```

### 生成变更日志

```bash
# 增量更新变更日志
npm run changelog

# 重新生成完整的变更日志
npm run changelog:first
```

### 发布新版本

```bash
# 发布补丁版本 (0.1.0 -> 0.1.1)
npm run release:patch

# 发布次要版本 (0.1.0 -> 0.2.0)
npm run release:minor

# 发布主要版本 (0.1.0 -> 1.0.0)
npm run release:major
```

发布流程会自动执行以下步骤：
1. 检查工作目录是否干净
2. 拉取最新代码
3. 运行测试和构建
4. 更新版本号
5. 生成变更日志
6. 提交更改并创建标签
7. 推送到远程仓库

## 🛡️ 提交校验自动化（Husky + Commitlint）

为保证所有提交信息都符合规范，项目集成了[husky](https://typicode.github.io/husky/#/)和[commitlint](https://commitlint.js.org/)。

### 依赖安装

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
```

### 初始化husky

```bash
npm run prepare
```
此命令会自动创建`.husky`目录。

### 添加commit-msg钩子

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```
> 也可以手动在`.husky/commit-msg`文件中写入：
> ```sh
> #!/usr/bin/env sh
> npx --no -- commitlint --edit $1
> ```

### 添加commitlint配置

在项目根目录新建`commitlint.config.js`，内容如下：
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci', 'build'
    ]],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
};
```

### package.json相关配置

```json
"scripts": {
  "prepare": "husky"
},
"devDependencies": {
  "husky": "^9.x.x",
  "@commitlint/cli": "^19.x.x",
  "@commitlint/config-conventional": "^19.x.x"
}
```

### 提交校验效果

当你执行如下命令提交时：
```bash
git commit -m "abc"
```
会被自动拦截并提示格式错误，只有符合规范的提交信息才能成功提交。

## 📋 变更日志生成

本项目使用conventional-changelog来自动生成变更日志，基于Git提交信息自动分类和格式化。

### 变更日志格式

生成的变更日志会按照以下格式组织：

- **Features**: 新功能
- **Bug Fixes**: 错误修复
- **Breaking Changes**: 破坏性变更
- **Documentation**: 文档更新
- **Performance**: 性能优化
- **Refactoring**: 代码重构
- **Tests**: 测试相关
- **Chores**: 构建过程或辅助工具的变动

### 配置说明

在`package.json`中配置了changelog生成脚本：

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "changelog:first": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

参数说明：
- `-p angular`: 使用angular预设格式
- `-i CHANGELOG.md`: 输入文件
- `-s`: 静默模式
- `-r 0`: 从头开始生成（仅用于changelog:first）

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 使用Commitizen提交更改 (`git cz`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Vue.js 官方文档](https://vuejs.org/)
- [Commitizen 官方文档](https://github.com/commitizen/cz-cli)
- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
- [Husky](https://github.com/typicode/husky)
- [commitlint](https://github.com/conventional-changelog/commitlint)
