// ==========================================
// 🎉 支付成功页面
// ==========================================

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, PlayCircle, Sparkles } from 'lucide-react';

export default async function SuccessPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b bg-white">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          TikTok AI Course
        </Link>
      </header>

      {/* Success Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              🎉 Payment Successful!
            </h1>
            <p className="text-xl text-gray-600">
              Welcome to the TikTok AI Video Course, {user.firstName || 'there'}!
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">What's Next?</h2>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Your payment has been confirmed</div>
                  <div className="text-sm text-gray-600">Transaction ID: Completed</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Course access has been granted</div>
                  <div className="text-sm text-gray-600">You now have lifetime access to all course materials</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Start learning immediately</div>
                  <div className="text-sm text-gray-600">All video lessons are ready to watch</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/course"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition shadow-lg"
            >
              <PlayCircle className="w-6 h-6" />
              Start Watching Now →
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <p>📧 A confirmation email has been sent to {user.emailAddresses[0].emailAddress}</p>
            <p>💡 You can access your course anytime from your account</p>
          </div>

          {/* Receipt Link */}
          <div className="mt-8 pt-8 border-t">
            <Link href="/course" className="text-purple-600 hover:text-purple-700">
              ← Go to My Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
