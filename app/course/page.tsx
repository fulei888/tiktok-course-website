// ==========================================
// 🎓 课程页面（受保护）
// ==========================================
// 只有付费用户才能访问

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { checkUserAccess } from '@/lib/supabase';
import Link from 'next/link';
import { Lock, CheckCircle } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import CheckoutButton from '@/components/CheckoutButton';
import LessonCard from '@/components/LessonCard';

export default async function CoursePage() {
  // 1. 检查用户是否登录
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect('/sign-in');
  }

  // 2. 检查用户是否有访问权限
  const hasAccess = await checkUserAccess(userId);

  // 3. 如果没有权限，显示购买页面
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <header className="container mx-auto px-4 py-6 border-b">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TikTok AI Course
            </Link>
            <div className="text-gray-600">
              Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Lock className="w-20 h-20 mx-auto text-purple-600 mb-4" />
              <h1 className="text-4xl font-bold mb-4">Course Access Required</h1>
              <p className="text-xl text-gray-600">
                This content is available to paying members only.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <div className="text-5xl font-bold text-purple-600 mb-2">$29.90</div>
              <div className="text-gray-600 mb-6">One-time payment • Lifetime access</div>

              <div className="space-y-3 mb-8 text-left">
                {[
                  '✅ 10+ Video Tutorials',
                  '✅ AI Prompt Templates',
                  '✅ TikTok Examples & Scripts',
                  '✅ Lifetime Access',
                  '✅ All Future Updates',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <CheckoutButton userEmail={user.emailAddresses[0].emailAddress} />

              <div className="text-sm text-gray-500 mt-4">
                🔒 Secure payment via Stripe
              </div>
            </div>

            <Link href="/" className="text-purple-600 hover:text-purple-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. 如果有权限，显示课程内容
  const lessons = [
    {
      id: 1,
      title: 'Welcome to the Course',
      description: 'Introduction and what you\'ll learn',
      duration: '5 min',
      videoId: 'demo-video-1', // 替换为实际的视频 ID
    },
    {
      id: 2,
      title: 'How to Find Viral TikTok Ideas',
      description: 'Discover trending topics and content ideas',
      duration: '12 min',
      videoId: 'demo-video-2',
    },
    {
      id: 3,
      title: 'How to Create AI Images',
      description: 'Use AI tools to generate stunning visuals',
      duration: '15 min',
      videoId: 'demo-video-3',
    },
    {
      id: 4,
      title: 'How to Make the Video',
      description: 'Edit and assemble your TikTok video',
      duration: '18 min',
      videoId: 'demo-video-4',
    },
    {
      id: 5,
      title: 'How to Add Voice & Music',
      description: 'Create voiceovers and add background music',
      duration: '10 min',
      videoId: 'demo-video-5',
    },
    {
      id: 6,
      title: 'How to Edit & Export',
      description: 'Final edits and export settings',
      duration: '8 min',
      videoId: 'demo-video-6',
    },
    {
      id: 7,
      title: 'How to Post on TikTok',
      description: 'Best practices for posting and hashtags',
      duration: '7 min',
      videoId: 'demo-video-7',
    },
    {
      id: 8,
      title: 'Bonus: AI Prompts Library',
      description: 'Ready-to-use prompts for content creation',
      duration: '10 min',
      videoId: 'demo-video-8',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b bg-white">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TikTok AI Course
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              👋 {user.firstName || user.emailAddresses[0].emailAddress}
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to Your Course! 🎉
          </h1>
          <p className="text-lg text-purple-100">
            Start learning and create your first viral TikTok video today
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Course Lessons</h2>

          <div className="space-y-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>

          {/* Download Resources */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-4">📦 Course Resources</h3>
            <div className="space-y-3">
              <a href="#" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition">
                <div className="font-semibold">AI Prompt Templates</div>
                <div className="text-sm text-gray-600">Ready-to-use prompts for content creation</div>
              </a>
              <a href="#" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition">
                <div className="font-semibold">TikTok Script Examples</div>
                <div className="text-sm text-gray-600">Real examples of successful video scripts</div>
              </a>
              <a href="#" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition">
                <div className="font-semibold">Editing Workflow PDF</div>
                <div className="text-sm text-gray-600">Step-by-step guide for video editing</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
