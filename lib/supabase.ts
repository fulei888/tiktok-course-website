// ==========================================
// 📊 Supabase 数据库客户端配置
// ==========================================
// 这个文件创建 Supabase 客户端实例
// 用于操作数据库（purchases 和 course_access 表）

import { createClient } from '@supabase/supabase-js';

// 从环境变量获取配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 创建客户端（客户端使用 Anon Key）
// 如果环境变量未配置，创建一个占位符客户端（避免构建失败）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// ==========================================
// 🔐 服务端 Supabase 客户端（有完整权限）
// ==========================================
// 用于 API routes 和 Server Components
// 使用 Service Role Key，可以绕过 RLS 规则

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// ==========================================
// 📝 数据库类型定义
// ==========================================

export interface Purchase {
  id: string;
  user_id: string;
  stripe_payment_id: string | null;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface CourseAccess {
  id: string;
  user_id: string;
  course_id: string;
  expires_at: string | null;
  created_at: string;
}

// ==========================================
// 🛠️ 常用数据库操作函数
// ==========================================

/**
 * 检查用户是否有课程访问权限
 */
export async function checkUserAccess(userId: string, courseId: string = 'tiktok-ai-course'): Promise<boolean> {
  try {
    // 使用 Admin 客户端绕过 RLS
    if (!supabaseAdmin) {
      console.error('❌ Supabase Admin 客户端未配置');
      return false;
    }

    const { data, error } = await supabaseAdmin
      .from('course_access')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) {
      console.error('❌ 检查权限失败:', error);
      return false;
    }

    console.log('✅ 权限检查结果:', { userId, courseId, hasAccess: !!data });

    // 检查是否过期
    if (data && data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        console.log('⏰ 课程访问已过期');
        return false;
      }
    }

    return !!data;
  } catch (error) {
    console.error('❌ 检查权限异常:', error);
    return false;
  }
}

/**
 * 记录支付信息
 */
export async function recordPurchase(
  userId: string,
  stripePaymentId: string,
  amount: number,
  status: 'pending' | 'completed' | 'failed' = 'completed'
): Promise<boolean> {
  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase Admin 客户端未配置');
    }

    const { error } = await supabaseAdmin.from('purchases').insert({
      user_id: userId,
      stripe_payment_id: stripePaymentId,
      amount,
      status,
    });

    if (error) {
      console.error('❌ 记录支付失败:', error);
      return false;
    }

    console.log('✅ 支付记录成功:', { userId, stripePaymentId, amount });
    return true;
  } catch (error) {
    console.error('❌ 记录支付异常:', error);
    return false;
  }
}

/**
 * 开通课程访问权限
 */
export async function grantCourseAccess(
  userId: string,
  courseId: string = 'tiktok-ai-course',
  expiresAt: Date | null = null
): Promise<boolean> {
  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase Admin 客户端未配置');
    }

    const { error } = await supabaseAdmin.from('course_access').insert({
      user_id: userId,
      course_id: courseId,
      expires_at: expiresAt?.toISOString() || null,
    });

    if (error) {
      // 如果是重复插入错误（用户已有权限），不算失败
      if (error.code === '23505') {
        console.log('ℹ️ 用户已有课程权限:', userId);
        return true;
      }
      console.error('❌ 开通权限失败:', error);
      return false;
    }

    console.log('✅ 课程权限开通成功:', { userId, courseId });
    return true;
  } catch (error) {
    console.error('❌ 开通权限异常:', error);
    return false;
  }
}

/**
 * 获取用户的所有购买记录
 */
export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ 获取购买记录失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('❌ 获取购买记录异常:', error);
    return [];
  }
}
