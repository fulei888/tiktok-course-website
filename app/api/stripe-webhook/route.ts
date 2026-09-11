// ==========================================
// 🔔 Stripe Webhook 处理器
// ==========================================
// Stripe 支付成功后会调用这个 API
// 自动记录支付并开通课程权限

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { constructWebhookEvent } from '@/lib/stripe';
import { recordPurchase, grantCourseAccess } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // 1. 获取请求体和签名
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('❌ 缺少 Stripe 签名');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // 2. 验证 Webhook 签名
    let event: Stripe.Event;
    try {
      event = constructWebhookEvent(body, signature);
    } catch (err: any) {
      console.error('❌ Webhook 签名验证失败:', err.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    console.log('📨 收到 Stripe Webhook:', event.type);

    // 3. 处理支付成功事件
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('💰 支付成功:', {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        metadata: session.metadata,
      });

      // 获取用户信息
      const userId = session.metadata?.userId;
      const courseId = session.metadata?.courseId || 'tiktok-ai-course';

      if (!userId) {
        console.error('❌ Webhook 中缺少 userId');
        return NextResponse.json(
          { error: 'Missing userId in metadata' },
          { status: 400 }
        );
      }

      // 4. 记录支付
      const amount = session.amount_total ? session.amount_total / 100 : 0;
      await recordPurchase(
        userId,
        session.payment_intent as string,
        amount,
        'completed'
      );

      // 5. 自动开通课程权限
      const accessGranted = await grantCourseAccess(userId, courseId);

      if (accessGranted) {
        console.log('✅ 课程权限已自动开通:', { userId, courseId });
      } else {
        console.error('❌ 开通课程权限失败:', { userId, courseId });
      }
    }

    // 6. 处理支付失败事件
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('❌ 支付失败:', {
        paymentIntentId: paymentIntent.id,
        lastError: paymentIntent.last_payment_error,
      });

      // 可以在这里添加通知用户的逻辑
    }

    // 7. 返回成功响应
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook 处理失败:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
