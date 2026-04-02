# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **dumi + father + vite** 的 React 组件库，使用 yarn workspaces 管理多包结构。

## 常用命令

```bash
# 安装依赖
yarn install

# 启动文档开发服务器
yarn start

# 构建组件库 (father)
yarn build

# 构建组件库 (vite，在 packages/components 目录)
yarn build:components

# 构建文档
yarn docs:build

# 预览文档构建结果
yarn docs:preview

# 代码检查
yarn lint           # 运行 ESLint + Stylelint
yarn lint:es        # 仅 ESLint
yarn lint:css       # 仅 Stylelint

# 代码格式化 (通过 lint-staged 自动执行)
# prettier 配置: 单引号、尾部逗号、80 字符宽度
```

## 项目结构

```
├── packages/
│   ├── components/          # 主组件包 @orinui/component-library
│   │   ├── src/             # 组件源码
│   │   ├── dist/            # 构建产物 (es/lib)
│   │   ├── vite.config.ts   # vite 构建配置
│   │   └── package.json
│   └── utils/               # 工具函数包 (待开发)
├── docs/                    # dumi 文档
├── src/                     # 根包入口 (示例组件)
├── .dumirc.ts               # dumi 配置
└── .fatherrc.ts             # father 配置
```

## 组件包结构

`packages/components/src/` 包含以下组件：

- `base-table` - 基础表格 (支持虚拟滚动 virtuallist-antd)
- `chart` - ECharts 图表封装
- `sider-tree` - 侧边树
- `complex-tree` - 复杂树组件
- `modal` - 弹窗
- `sheet` - Excel 上传
- `dateCom` / `DateRangeCom` / `EndDateRangeCom` - 日期相关组件
- `table-*` - 表格相关组件 (header/operate/tabs/second-header)
- `TreeSelect` - 树选择器
- `Hooks` - 自定义 Hooks
- `styled` - styled-components 样式工具

## 构建系统

- **根包**: 使用 `father build`，输出到 `dist/`
- **components 包**: 使用 `vite build`，输出 ESM/CJS 双格式到 `dist/es/` 和 `dist/lib/`
- 外部化依赖: react、react-dom、antd、echarts、lodash、styled-components 等

## 技术栈

- React 18 + TypeScript
- antd 4.24.12
- echarts + echarts-for-react
- styled-components
- vite (组件构建)
- father (库构建)
- dumi (文档)

## Git 提交规范

使用 commitlint + @commitlint/config-conventional，提交信息需遵循 Conventional Commits 规范。
