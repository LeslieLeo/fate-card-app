@echo off
echo ========================================
echo 命缘测算应用 - 部署脚本
echo ========================================
echo.

echo [1/3] 检查Vercel CLI是否已安装...
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Vercel CLI未安装，正在安装...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo 安装失败，请手动运行: npm install -g vercel
        pause
        exit /b 1
    )
) else (
    echo Vercel CLI已安装
)

echo.
echo [2/3] 构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo [3/3] 部署到Vercel...
echo 请按照提示操作：
echo - 登录你的Vercel账户（如果没有，先去 https://vercel.com 注册）
echo - 选择项目设置（默认即可）
echo - 等待部署完成
echo.
call vercel

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 你现在可以访问你的应用了
echo.
pause
