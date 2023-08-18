# 调试指南

该子包为 single-spa 的基座应用，用来控制子应用的渲染、切换
## 通过微前端方式启动子应用

1. 请确保 single-spa-app1 合 single-spa-app2 包都已经执行了 `pnpm run build && pnpm run preview` 命令；
2. 执行 `pnpm run dev` 命令；
4. 访问：http:locahost: 3000；
