// ==========================================
// 🏠 Landing Page（首页）
// ==========================================

import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { checkUserAccess } from '@/lib/supabase';
import { CheckCircle, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';

export default async function LandingPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const hasAccess = userId ? await checkUserAccess(userId) : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TikTok AI Course
          </div>
          <div className="flex items-center gap-4">
            {userId ? (
              <>
                <span className="text-gray-700">
                  👋 Hi, {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]}
                </span>
                {hasAccess ? (
                  <Link href="/course" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Go to Course
                  </Link>
                ) : (
                  <Link href="#pricing" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Get Started
                  </Link>
                )}
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in" className="px-6 py-2 text-purple-600 hover:text-purple-700 transition">
                  Sign In
                </Link>
                <Link href="/sign-up" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
          🔥 Trending on TikTok
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Learn How to Create<br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TikTok Videos with AI
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Step-by-step tutorials for beginners. Create viral content in minutes, not hours.
        </p>
        <div className="flex gap-4 justify-center">
          {userId && hasAccess ? (
            <Link href="/course" className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg">
              Go to My Course →
            </Link>
          ) : (
            <>
              <a href="#pricing" className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg">
                Get Started — $29.90
              </a>
              <a href="#course-content" className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-50 transition">
                See What's Inside
              </a>
            </>
          )}
        </div>
      </section>

      {/* Course Content */}
      <section id="course-content" className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl my-12">
        <h2 className="text-4xl font-bold text-center mb-12">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, title: 'Lesson 1', desc: 'How to Find Viral TikTok Ideas' },
            { icon: Sparkles, title: 'Lesson 2', desc: 'How to Create AI Images' },
            { icon: PlayCircle, title: 'Lesson 3', desc: 'How to Make the Video' },
            { icon: TrendingUp, title: 'Lesson 4', desc: 'How to Add Voice & Music' },
            { icon: TrendingUp, title: 'Lesson 5', desc: 'How to Edit & Export' },
            { icon: Sparkles, title: 'Lesson 6', desc: 'How to Post on TikTok' },
          ].map((lesson, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <lesson.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{lesson.title}</div>
                <div className="text-gray-600">{lesson.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">$29.90</div>
            <div className="text-purple-100">One-time payment • Lifetime access</div>
          </div>
          <div className="space-y-4 mb-8">
            {['✅ 10+ Video Tutorials', '✅ AI Prompt Templates', '✅ TikTok Examples & Scripts', '✅ Lifetime Access', '✅ All Future Updates'].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-lg">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {userId && hasAccess ? (
            <Link href="/course" className="block w-full py-4 bg-white text-purple-600 rounded-xl text-center font-bold text-lg hover:bg-gray-100 transition">
              Go to My Course →
            </Link>
          ) : (
            <Link href={userId ? "/course" : "/sign-up"} className="block w-full py-4 bg-white text-purple-600 rounded-xl text-center font-bold text-lg hover:bg-gray-100 transition">
              {userId ? "Get Started Now →" : "Sign Up to Get Started →"}
            </Link>
          )}
          <div className="text-center mt-6 text-sm text-purple-100">
            🔒 Secure payment via Stripe
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 text-center text-gray-600 border-t">
        <p>© 2026 TikTok AI Course. All rights reserved.</p>
      </footer>
    </div>
  );
}
