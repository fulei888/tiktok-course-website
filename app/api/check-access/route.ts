// ==========================================
// 🔍 检查用户课程访问权限 API
// ==========================================
// 前端可以调用这个 API 检查用户是否有权限访问课程

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { checkUserAccess } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    // 1. 验证用户是否登录
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { hasAccess: false, error: '请先登录' },
        { status: 401 }
      );
    }

    // 2. 获取课程 ID（可选，默认为主课程）
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId') || 'tiktok-ai-course';

    // 3. 检查权限
    const hasAccess = await checkUserAccess(userId, courseId);

    console.log('🔍 权限检查:', { userId, courseId, hasAccess });

    // 4. 返回结果
    return NextResponse.json({
      hasAccess,
      userId,
      courseId,
    });
  } catch (error: any) {
    console.error('❌ 权限检查失败:', error);
    return NextResponse.json(
      { hasAccess: false, error: error.message || '检查权限失败' },
      { status: 500 }
    );
  }
}
