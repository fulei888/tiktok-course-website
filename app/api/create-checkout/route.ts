// ==========================================
// 💳 创建 Stripe 支付会话 API
// ==========================================
// 用户点击"购买"按钮时调用这个 API
// 返回 Stripe Checkout Session ID

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    // 1. 验证用户是否登录
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    // 2. 获取请求数据
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: '缺少用户邮箱' },
        { status: 400 }
      );
    }

    // 3. 获取网站 URL
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 4. 创建 Stripe Checkout Session
    const session = await createCheckoutSession({
      userId,
      userEmail: email,
      successUrl: `${origin}/success`,
      cancelUrl: `${origin}?canceled=true`,
    });

    console.log('✅ 支付会话创建成功:', {
      sessionId: session.id,
      userId,
      email,
    });

    // 5. 返回 Session ID 给前端
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('❌ 创建支付会话失败:', error);
    return NextResponse.json(
      { error: error.message || '创建支付失败' },
      { status: 500 }
    );
  }
}
