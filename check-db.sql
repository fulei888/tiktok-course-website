-- 检查数据库中的数据
-- 复制到 Supabase SQL Editor 运行

-- 1. 查看你的权限记录
SELECT * FROM course_access
WHERE user_id = 'user_3J6i8XVE1vCxkp4JkyYrfD1ptRH';

-- 2. 查看你的支付记录
SELECT * FROM purchases
WHERE user_id = 'user_3J6i8XVE1vCxkp4JkyYrfD1ptRH';

-- 3. 查看所有权限记录（看看有没有其他数据）
SELECT * FROM course_access ORDER BY created_at DESC LIMIT 10;
