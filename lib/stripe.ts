// ==========================================
// 💳 Stripe 支付配置
// ==========================================
// 这个文件配置 Stripe 客户端
// 用于创建支付会话和处理 Webhook

import Stripe from 'stripe';

// 从环境变量获取 Stripe Secret Key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

// 创建 Stripe 实例
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2026-08-26.dahlia', // 使用最新的 API 版本
  typescript: true,
});

// ==========================================
// 🛠️ Stripe 常用操作
// ==========================================

/**
 * 创建 Checkout Session（支付会话）
 */
export async function createCheckoutSession({
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const coursePrice = parseInt(process.env.COURSE_PRICE_CENTS || '2990');
  const courseName = process.env.NEXT_PUBLIC_COURSE_NAME || 'TikTok AI Video Course';

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: courseName,
            description: 'Complete video course with templates and examples',
          },
          unit_amount: coursePrice, // 价格（美分）
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail,
    metadata: {
      userId,
      courseId: 'tiktok-ai-course',
    },
    managed_payments: {
      enabled: false, // 禁用 Managed Payments（测试环境）
    },
  });

  return session;
}

/**
 * 验证 Stripe Webhook 签名
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('❌ STRIPE_WEBHOOK_SECRET 未配置');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

/**
 * 获取支付会话详情
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

/**
 * 创建退款
 */
export async function createRefund(paymentIntentId: string): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
}

// ==========================================
// 📊 Stripe Webhook 事件类型
// ==========================================

export type StripeWebhookEvent =
  | 'checkout.session.completed'
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'charge.refunded';

/**
 * 格式化价格（美分 -> 美元）
 */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * 测试卡号（用于开发测试）
 */
export const TEST_CARDS = {
  success: '4242 4242 4242 4242',
  declined: '4000 0000 0000 0002',
  insufficientFunds: '4000 0000 0000 9995',
  require3DS: '4000 0025 0000 3155',
};
