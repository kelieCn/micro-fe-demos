# 调试指南

## 通过微前端方式启动子应用

1. 请确保 single-spa-root 子包已经执行了 `pnpm run dev` 命令；
2. 执行 `pnpm run build` 命令会开启监听文件改动并重新构建；
3. 执行 `pnpm run preview` 即可；
4. 访问：http:locahost: 3000；

## 单独启动子应用

1. 执行 `pnpm run dev`；
2. 访问：http:locahost: 4000；