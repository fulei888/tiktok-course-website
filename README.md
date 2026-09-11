# TikTok AI Video Course Website 🎥

一个完整的在线课程销售平台，使用 Next.js 14 + Stripe + Clerk + Supabase 构建。

## 📋 项目状态

✅ **房子已建好** - 所有代码都已经完成  
🔌 **等待通电** - 需要你填写 API Keys  
🚀 **准备上线** - 填完配置立即可用

---

## 🔌 快速开始（你只需做 3 件事）

### 1. 复制环境变量文件
```bash
cp .env.example .env.local
```

### 2. 填写 API Keys
打开 `.env.local`，按照注释填写你的 keys

### 3. 启动项目
```bash
npm install
npm run dev
```

打开 http://localhost:3000 🎉

---

## 📖 完整文档

详细的配置步骤、部署指南、常见问题请看 `.env.example` 文件中的注释。

---

## 🏗️ 已完成的功能

- ✅ 漂亮的 Landing Page
- ✅ 用户注册/登录（Clerk）
- ✅ Stripe 支付集成
- ✅ 自动开通权限
- ✅ 课程内容保护
- ✅ 响应式设计

---

## 💡 下一步

1. 注册账号：Vercel, Supabase, Clerk, Stripe
2. 获取 API Keys 并填入 `.env.local`
3. 在 Supabase SQL Editor 执行 `supabase-init.sql`
4. 运行 `npm run dev`
5. 测试支付流程（用测试卡 4242 4242 4242 4242）
6. 添加你的视频内容
7. 部署到 Vercel

**详细步骤请看 `.env.example` 文件！**

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
