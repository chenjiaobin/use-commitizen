# use-commitizen

一个演示Commitizen工具使用的Vue.js项目，用于规范和校验Git提交信息。

## 📋 项目描述

本项目是一个基于Vue.js 3的示例项目，主要目的是演示如何使用Commitizen工具来规范化Git提交信息。通过使用Commitizen，可以确保团队中的每个开发者都遵循统一的提交信息格式，提高代码仓库的可维护性。

## ✨ 功能特性

- 🚀 基于Vue.js 3框架开发
- 📝 集成Commitizen工具
- 🔧 使用Conventional Changelog规范
- 🎯 自动化的提交信息格式化
- 📦 完整的项目配置

## 🛠️ 技术栈

- **前端框架**: Vue.js 3
- **构建工具**: Vue CLI
- **代码规范**: ESLint
- **提交规范**: Commitizen + cz-conventional-changelog
- **包管理**: npm/yarn


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
