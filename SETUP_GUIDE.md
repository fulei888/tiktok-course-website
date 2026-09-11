# 🚀 快速配置指南

## 第一步：注册账号（15 分钟）

### 1. Supabase（数据库）
- 访问：https://supabase.com
- 点击 "Start your project"
- 创建新项目（选择离你最近的区域）
- 等待项目创建完成

### 2. Clerk（用户认证）
- 访问：https://clerk.dev
- 点击 "Sign up"
- 创建新应用
- 选择认证方式（推荐：Email + Google）

### 3. Stripe（支付）
- 访问：https://stripe.com
- 点击 "Sign up"
- ⚠️ **先使用测试模式**，不要切换到生产模式

### 4. Vercel（部署，可选）
- 访问：https://vercel.com
- 用 GitHub 账号登录
- 暂时不需要操作，等部署时再用

---

## 第二步：获取 API Keys（10 分钟）

### Supabase Keys

1. 登录 Supabase
2. 选择你的项目
3. 点击左侧菜单 `Settings` → `API`
4. 复制以下内容：

```
Project URL: https://xxxxx.supabase.co
复制到 → NEXT_PUBLIC_SUPABASE_URL

anon public:  eyJhbGciOiJIUzI1...
复制到 → NEXT_PUBLIC_SUPABASE_ANON_KEY

service_role: eyJhbGciOiJIUzI1...
复制到 → SUPABASE_SERVICE_ROLE_KEY
```

### Clerk Keys

1. 登录 Clerk
2. 选择你的应用
3. 点击左侧菜单 `Configure` → `API Keys`
4. 复制：

```
Publishable key: pk_test_xxxxx
复制到 → NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

Secret key: sk_test_xxxxx
复制到 → CLERK_SECRET_KEY
```

### Stripe Keys

1. 登录 Stripe
2. 确认左上角是 **"Test mode"**（测试模式）
3. 点击右上角 `Developers`
4. 点击 `API keys`
5. 复制：

```
Publishable key: pk_test_xxxxx
复制到 → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

Secret key: sk_test_xxxxx
复制到 → STRIPE_SECRET_KEY
```

---

## 第三步：配置 Stripe Webhook（5 分钟）

⚠️ **这一步很重要！不配置的话支付成功后不会自动开通权限**

### 本地开发（测试用）

1. 安装 Stripe CLI：
```bash
# Mac
brew install stripe/stripe-cli/stripe

# Windows
下载：https://github.com/stripe/stripe-cli/releases/latest
```

2. 登录：
```bash
stripe login
```

3. 启动 Webhook 转发：
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

4. 复制终端显示的 `whsec_xxxxx` 到 `STRIPE_WEBHOOK_SECRET`

### 线上部署（生产用）

1. 在 Stripe Dashboard 点击 `Developers` → `Webhooks`
2. 点击 `Add endpoint`
3. 填写：
   - Endpoint URL: `https://你的域名.vercel.app/api/stripe-webhook`
   - Events to send: 选择 `checkout.session.completed`
4. 保存后，复制 `Signing secret` 到 `STRIPE_WEBHOOK_SECRET`

---

## 第四步：初始化数据库（2 分钟）

1. 登录 Supabase
2. 选择你的项目
3. 点击左侧菜单 `SQL Editor`
4. 点击 `New query`
5. 打开项目中的 `supabase-init.sql` 文件
6. 复制所有内容
7. 粘贴到 SQL Editor
8. 点击 `Run`

✅ 看到 "Success" 就说明数据库表创建完成了！

---

## 第五步：配置项目（3 分钟）

1. 打开项目目录：
```bash
cd ~/tiktok-course-website
```

2. 复制环境变量模板：
```bash
cp .env.example .env.local
```

3. 用编辑器打开 `.env.local`：
```bash
# Mac
open .env.local

# 或使用 VS Code
code .env.local
```

4. 把刚才获取的所有 keys 填进去

5. 保存文件

---

## 第六步：启动项目（1 分钟）

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问：http://localhost:3000

🎉 **如果看到漂亮的 Landing Page，说明配置成功了！**

---

## 第七步：测试支付流程（5 分钟）

### 1. 注册账号
- 点击右上角 "Sign Up"
- 用真实邮箱注册（会收到验证邮件）

### 2. 尝试支付
- 点击 "Get Started — $29.90"
- 会跳转到 Stripe 支付页面

### 3. 使用测试卡
```
卡号：4242 4242 4242 4242
有效期：任意未来日期（比如 12/25）
CVV：任意 3 位数字（比如 123）
邮编：任意 5 位数字（比如 12345）
```

### 4. 完成支付
- 点击 "Pay"
- 应该会自动跳转到课程页
- 如果能看到课程内容，说明一切正常！

---

## 常见问题

### Q1: 找不到 .env.local 文件
**A**: 这是隐藏文件，在 Mac Finder 中按 `Cmd + Shift + .` 可以显示隐藏文件。

### Q2: npm run dev 报错
**A**: 
1. 检查 Node.js 版本（需要 18+）：`node --version`
2. 删除 `node_modules` 重新安装：`rm -rf node_modules && npm install`

### Q3: Clerk 报错 "Missing publishable key"
**A**: 
1. 确认 `.env.local` 中有 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
2. 重启开发服务器（Ctrl+C 然后重新 `npm run dev`）

### Q4: 支付成功但没开通权限
**A**: 
1. 检查 Stripe Webhook 是否配置
2. 查看终端日志，看有没有报错
3. 检查 Supabase 的 `purchases` 和 `course_access` 表是否有数据

### Q5: 本地 Webhook 不工作
**A**: 确保 `stripe listen` 命令还在运行，每次重启电脑需要重新运行。

---

## 下一步

### 添加视频内容

1. 等视频制作完成
2. 选择视频托管方案：
   - **Cloudflare Stream**（推荐，$1/1000分钟）
   - **Bunny CDN**（便宜，$0.01/GB）
   - **YouTube Unlisted**（免费但不太专业）

3. 上传视频后，在 `app/course/page.tsx` 中更新 `videoId`

### 部署到生产环境

```bash
# 推送代码到 GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main

# 在 Vercel 中导入项目
# 1. 登录 vercel.com
# 2. 点击 "Import Project"
# 3. 选择 GitHub 仓库
# 4. 添加环境变量（复制 .env.local 的内容）
# 5. 部署
```

### 切换到生产模式

1. Stripe 切换到 Live mode
2. 重新获取生产环境 keys
3. 更新 Vercel 环境变量
4. 更新 Stripe Webhook URL
5. 开始收钱！💰

---

**🎉 恭喜！你的 TikTok 课程网站已经准备好了！**

需要帮助？检查：
- 浏览器控制台（F12）
- 终端日志
- Stripe Dashboard → Developers → Webhooks → Logs
- Supabase Dashboard → Logs
