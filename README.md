# orinui

[![NPM version](https://img.shields.io/npm/v/orinui.svg?style=flat)](https://npmjs.org/package/orinui)
[![NPM downloads](http://img.shields.io/npm/dm/orinui.svg?style=flat)](https://npmjs.org/package/orinui)

A react library developed with dumi

## 开发规范

### 技术栈与约束

- React 18 + TypeScript（`strict: true`）
- dumi + father + Vite（组件库与文档同时维护）
- antd：`~5.29.3`（以 `packages/components/package.json` 为准）
- styled-components、echarts（以及配套的封装包）

### 格式化与代码规范

- Prettier
  - `printWidth: 80`
  - `singleQuote: true`
  - `trailingComma: 'all'`
  - `proseWrap: 'never'`（Markdown 保持原有换行风格）
  - 通过 `prettier-plugin-organize-imports` 自动整理 import
- ESLint
  - 继承自 `@umijs/lint/dist/config/eslint`
- 提交前校验
  - `pre-commit` 阶段会运行 `npx lint-staged`（包含 prettier/eslint/stylelint 的 staged 校验）

### Import 约定

- 跨包优先使用：`@orinui/*`
  - 例如：`@orinui/components`、`@orinui/hooks`
- 包内使用：`@/`
  - 例如在 `packages/components` 内部使用 `@/components/...`

### TypeScript 配置

- 基于根 `tsconfig.json` 的路径别名：
  - `@orinui/components` / `@orinui/hooks` / `@orinui/utils` / `@orinui/ai-skills`
- 子包各自 `tsconfig.json` 的 `@/*` 指向该包的 `src/*`

## 运行命令

```bash
# 安装依赖
pnpm install

# 启动文档开发服务器
pnpm start

# 构建组件库（father / watch）
pnpm build:watch

# 构建组件库（全部）
pnpm build

# 构建文档
pnpm docs:build

# 预览文档生产构建
pnpm docs:preview

# 代码质量检查
pnpm lint
pnpm lint:es
pnpm lint:style

# 诊断工具
pnpm doctor
```

说明：`package.json` 的脚本内部使用 `pnpm run ...` 调度，因此建议直接使用 `pnpm`。如果你使用 `yarn start`/`yarn build`，也需要保证本机已安装 `pnpm`。

## 提交规范

- `commitlint`：使用 `@commitlint/config-conventional`，遵循 Conventional Commits
- `husky`：
  - `pre-commit`：运行 `npx lint-staged`
  - `commit-msg`：运行 `npx commitlint --edit`

常用示例：

- `feat: 添加新组件`
- `fix: 修复 xxx 崩溃问题`
- `docs: 更新 README`
- `style: 代码格式化`
- `refactor: 简化/重构逻辑`
- `test: 添加单元测试`
- `chore: 更新构建/工具链`
- `build: 更新构建脚本`
- `ci: 更新 CI 工作流`
- `perf: 性能优化`

## 目录结构

```text
.
├─ packages/
│  ├─ components/     # @orinui/components
│  ├─ hooks/          # @orinui/hooks
│  ├─ utils/          # @orinui/utils
│  └─ ai-skills/      # @orinui/ai-skills
├─ docs/              # dumi 文档与 demo
├─ src/               # 根入口（示例/对外入口）
├─ .dumirc.ts         # dumi 配置
└─ .fatherrc.ts       # father 配置
```

## LICENSE

MIT
