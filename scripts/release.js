#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const releaseType = args[0]; // patch, minor, major

if (!releaseType || !['patch', 'minor', 'major'].includes(releaseType)) {
  console.error('请指定发布类型: patch, minor, 或 major');
  console.error('使用示例: node scripts/release.js patch');
  process.exit(1);
}

try {
  console.log(`🚀 开始发布 ${releaseType} 版本...`);
  
  // 1. 确保工作目录干净
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.error('❌ 工作目录不干净，请先提交或暂存所有更改');
    process.exit(1);
  }
  
  // 2. 拉取最新代码
  console.log('📥 拉取最新代码...');
  execSync('git pull origin master', { stdio: 'inherit' });
  
  // 3. 运行测试和构建
  console.log('🔨 运行测试和构建...');
  execSync('npm run lint', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  
  // 4. 更新版本号
  console.log(`📦 更新版本号 (${releaseType})...`);
  execSync(`npm version ${releaseType} --no-git-tag-version`, { stdio: 'inherit' });
  
  // 5. 生成changelog
  console.log('📝 生成变更日志...');
  execSync('npm run changelog', { stdio: 'inherit' });
  
  // 6. 提交更改
  console.log('💾 提交更改...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "chore: 发布新版本"', { stdio: 'inherit' });
  
  // 7. 创建标签
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const version = packageJson.version;
  console.log(`🏷️ 创建标签 v${version}...`);
  execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
  
  // 8. 推送到远程仓库
  console.log('📤 推送到远程仓库...');
  execSync('git push origin master', { stdio: 'inherit' });
  execSync(`git push origin v${version}`, { stdio: 'inherit' });
  
  console.log(`✅ 发布完成! 版本: v${version}`);
  console.log('🎉 新版本已推送到远程仓库');
  
} catch (error) {
  console.error('❌ 发布失败:', error.message);
  process.exit(1);
} 