# 命缘测算应用 - 部署说明

## 部署到Vercel（推荐，免费）

### 方法一：通过Vercel CLI部署

1. 安装Vercel CLI（如果还没有安装）：
```bash
npm install -g vercel
```

2. 在项目目录下运行：
```bash
cd "E:\LL\学AI\AI coding训练营\fate-card-app"
vercel
```

3. 按照提示操作：
   - 登录你的Vercel账户（如果没有，先去 https://vercel.com 注册）
   - 选择项目设置（默认即可）
   - 等待部署完成

4. 部署成功后，你会得到一个类似这样的链接：
   - https://your-project-name.vercel.app

### 方法二：通过GitHub部署

1. 将代码推送到GitHub仓库：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. 访问 https://vercel.com 并登录

3. 点击 "Add New Project"

4. 选择你的GitHub仓库

5. 点击 "Deploy"

6. 部署完成后，你会得到一个可以分享的链接

## 部署到Netlify（免费）

1. 构建项目：
```bash
npm run build
```

2. 访问 https://app.netlify.com/drop

3. 将 `dist` 文件夹拖拽到页面中

4. 等待部署完成，获得分享链接

## 部署到GitHub Pages（免费）

1. 修改 `vite.config.js`：
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/your-repo-name/',
  server: {
    port: 3000,
    open: true
  }
})
```

2. 构建项目：
```bash
npm run build
```

3. 将 `dist` 文件夹推送到 `gh-pages` 分支

4. 在GitHub仓库设置中启用GitHub Pages

## 本地预览

如果你想先在本地预览生产版本：

```bash
npm run build
npm run preview
```

然后在浏览器中访问 http://localhost:4173
