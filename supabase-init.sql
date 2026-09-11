-- ==========================================
-- 📊 Supabase 数据库初始化脚本
-- ==========================================
-- 在 Supabase SQL Editor 中执行这个脚本
-- 地址：https://supabase.com/dashboard/project/_/sql

-- 1. 创建 purchases 表（支付记录）
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_payment_id ON purchases(stripe_payment_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

-- 2. 创建 course_access 表（课程权限）
CREATE TABLE IF NOT EXISTS course_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id TEXT DEFAULT 'tiktok-ai-course',
  expires_at TIMESTAMPTZ,  -- NULL = 永久访问
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)  -- 每个用户每个课程只能有一条记录
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_course_access_user_id ON course_access(user_id);
CREATE INDEX IF NOT EXISTS idx_course_access_course_id ON course_access(course_id);

-- 3. 启用 Row Level Security（可选，推荐）
-- 如果你想让用户只能看到自己的数据

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的购买记录
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (auth.uid()::text = user_id);

-- 用户只能查看自己的课程权限
CREATE POLICY "Users can view their own course access"
  ON course_access FOR SELECT
  USING (auth.uid()::text = user_id);

-- ⚠️ 注意：Service Role Key 可以绕过 RLS 策略
-- 我们在 API routes 中使用 Service Role Key 来插入数据

-- 4. 创建测试数据（可选，用于开发测试）
-- 取消注释下面的代码来创建测试数据

/*
-- 测试用户 ID（替换为你的 Clerk User ID）
INSERT INTO purchases (user_id, stripe_payment_id, amount, status)
VALUES ('user_test_123', 'pi_test_123456', 29.90, 'completed');

INSERT INTO course_access (user_id, course_id)
VALUES ('user_test_123', 'tiktok-ai-course');
*/

-- 5. 查询示例（测试用）

-- 查看所有购买记录
-- SELECT * FROM purchases ORDER BY created_at DESC;

-- 查看所有课程权限
-- SELECT * FROM course_access ORDER BY created_at DESC;

-- 查看特定用户的权限
-- SELECT * FROM course_access WHERE user_id = 'your_user_id';

-- 6. 清理命令（慎用！）

-- 删除所有测试数据
-- DELETE FROM purchases WHERE stripe_payment_id LIKE 'pi_test_%';
-- DELETE FROM course_access WHERE user_id LIKE 'user_test_%';

-- ==========================================
-- ✅ 初始化完成！
-- ==========================================
-- 执行这个脚本后，你的数据库就准备好了
-- 下一步：在 .env.local 中配置 Supabase 的 API keys
