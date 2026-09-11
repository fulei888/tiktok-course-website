-- ==========================================
-- 🚀 快速修复：创建表 + 开通你的权限
-- ==========================================
-- 复制所有内容，粘贴到 Supabase SQL Editor，点击 Run

-- 1. 创建 purchases 表
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- 2. 创建 course_access 表
CREATE TABLE IF NOT EXISTS course_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id TEXT DEFAULT 'tiktok-ai-course',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_course_access_user_id ON course_access(user_id);

-- 3. 给你的账号开通权限（你已经支付了！）
INSERT INTO course_access (user_id, course_id, expires_at)
VALUES ('user_3J6i8XVE1vCxkp4JkyYrfD1ptRH', 'tiktok-ai-course', NULL)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- 4. 记录你的支付
INSERT INTO purchases (user_id, stripe_payment_id, amount, status)
VALUES ('user_3J6i8XVE1vCxkp4JkyYrfD1ptRH', 'manual_grant', 29.90, 'completed')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- ==========================================
-- ✅ 完成！
-- ==========================================
-- 执行后刷新页面，你就能访问课程了
