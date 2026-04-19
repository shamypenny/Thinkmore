# 智学导航 MVP

这是一个面向 K1-K12 教育场景的 AI 产品原型，目标不是直接给学生答案，而是把 AI 变成思维引导者。当前实现覆盖学生端、家长端、教师端三条主线，并对 OCR、LLM、班级分析能力做了可替换的 service 抽象。

## 当前能力

- 学生端：按小学/初中/高中学段切换 prompt 的引导式问答、知识点掌握页、学习建议页
- 家长端：作业上传、批改结果、辅导建议、学习趋势看板
- 教师端：班级学情工作台、学生列表、知识点薄弱项、教学建议
- Demo 角色登录：学生 / 家长 / 教师
- Prisma 数据模型：覆盖用户、班级、作业、提交、批改、知识点、引导会话、学习指标、教学建议

## 技术栈

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Prisma + SQLite
- Recharts
- Zod
- OpenAI JavaScript SDK

## 启动方式

1. 安装依赖

```bash
npm install
```

2. 初始化数据库并生成 Prisma Client

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

3. 启动开发环境

```bash
npm run dev
```

4. 打开浏览器访问

```text
http://localhost:3000
```

## 演示账号

当前版本采用演示登录，无需账号密码。

- 学生端：林小满
- 家长端：陈女士
- 教师端：周老师

进入 `/login` 后选择角色即可，系统会写入 demo cookie 并跳转到对应工作台。

## 登录方式

项目启动后，按下面方式进入演示系统：

1. 运行 `npm run dev`
2. 打开 `http://localhost:3000`
3. 点击首页的“进入演示系统”，或直接访问 `http://localhost:3000/login`
4. 在登录页选择身份：
   - 学生端：进入学生工作台与引导式问答
   - 家长端：进入作业上传、批改结果和辅导建议
   - 教师端：进入学情看板、学生列表和教学建议

补充说明：

- 当前是演示登录，不需要输入账号密码
- 系统通过浏览器 cookie 记录当前身份
- 如果想切换身份，进入其他角色前先点击页面右上区域的“退出演示登录”，再重新选择角色

## 目录结构

```text
app/                  路由、页面和 API
components/           通用 UI 组件
features/             角色业务组件
lib/mock-data/        演示数据
lib/services/         AI、批改、学情等服务抽象
prisma/               数据模型与种子数据
types/                领域类型
```

## 当前架构说明

- 学生端问答通过 `app/api/student/chat/route.ts` 调用 `lib/services/guide-service.ts`
- 家长端批改通过 `app/api/parent/correct/route.ts` 调用 `lib/services/correction-service.ts`
- 教师端看板使用 `lib/services/teacher-insights-service.ts`
- 目前 OCR 仍为 mock，可替换为真实服务

## 接入真实 OpenAI 兼容模型

学生端引导式问答已经支持真实模型接入，默认策略如下：

- 如果设置了 `OPENAI_API_KEY`，学生端优先调用真实模型，并按年级标签自动切换小学 / 初中 / 高中导学策略
- 如果未设置或真实调用失败，会自动回退到本地 mock 引导逻辑
- 默认模型为 `gpt-5.4-mini`
- 如果你使用兼容 OpenAI 的第三方网关，可以填写 `OPENAI_BASE_URL`

在 `.env` 中补充：

```bash
OPENAI_API_KEY="你的密钥"
OPENAI_BASE_URL=""
OPENAI_MODEL="gpt-5.4-mini"
```

说明：

- 留空 `OPENAI_BASE_URL` 时，默认使用 OpenAI 官方接口
- 如果你接的是兼容 OpenAI 的平台代理，只需要改 `OPENAI_BASE_URL` 和 `OPENAI_API_KEY`
- 当前只把学生端问答接成真实模型，家长端批改和教师端建议仍然使用 mock 数据

## 后续接入建议

- 继续增强 `guide-service.ts` 的学生导学 prompt，并按年级段做差异化策略
- 把 `correction-service.ts` 拆成 OCR 识别层、题目解析层、批改层
- 把教师端 mock 数据替换为 Prisma 聚合查询
- 把演示登录替换为 Auth.js 或组织内统一认证

## 已知取舍

- 为了保证本地一键运行，数据库先采用 SQLite，而不是 PostgreSQL
- 家长端 OCR 和教师端建议没有接真实外部服务，当前以 mock 数据验证产品链路
- 角色登录为 demo cookie 版本，适合 MVP 演示，不适合生产
