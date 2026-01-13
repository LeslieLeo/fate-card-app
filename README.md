# 命缘测算应用

一个基于Vue 3的八字、星宿、星座合盘分析应用

## 快速部署（推荐）

### 方法一：使用Vercel CLI（最简单）

1. 双击运行 `deploy.bat` 文件
2. 按照提示登录Vercel账户（如果没有账户，先去 https://vercel.com 注册）
3. 等待部署完成
4. 获得可分享的链接（如：https://your-app.vercel.app）

### 方法二：使用Netlify Drop（无需命令行）

1. 运行 `npm run build` 构建项目
2. 访问 https://app.netlify.com/drop
3. 将 `dist` 文件夹拖拽到页面中
4. 等待部署完成，获得分享链接

### 方法三：通过GitHub部署

1. 将代码推送到GitHub
2. 访问 https://vercel.com 并登录
3. 点击 "Add New Project"
4. 选择你的GitHub仓库
5. 点击 "Deploy"

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录

## 预览生产版本

```bash
npm run build
npm run preview
```

访问 http://localhost:4173

## 功能特性

- 八字合盘分析
- 星宿关系计算（本命星宿 + 值日星宿）
- 西方星座匹配
- 综合契合度评估
- 详细的维度分析
- 个性化建议

## 技术栈

- Vue 3
- Vite
- 纯前端，无需后端

## 部署平台推荐

- **Vercel**（推荐）：免费、快速、自动HTTPS
- **Netlify**：免费、简单、拖拽部署
- **GitHub Pages**：免费、与GitHub集成

## 注意事项

- 本应用为纯前端应用，无需配置后端
- 所有计算都在浏览器中完成
- 部署后即可直接使用，无需额外配置
