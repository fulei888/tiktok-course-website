// ==========================================
// 🏠 Landing Page（纯展示版 - 无需配置）
// ==========================================

import Link from 'next/link';
import { CheckCircle, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TikTok AI Course
          </div>
          <div className="flex items-center space-x-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-6 py-2 text-purple-600 hover:text-purple-700 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
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
          <a href="#pricing" className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg">
            Get Started — $29.90
          </a>
          <a href="#course-content" className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-50 transition">
            See What's Inside
          </a>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">10+</div>
            <div className="text-gray-600 mt-2">Video Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">1000+</div>
            <div className="text-gray-600 mt-2">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">4.9★</div>
            <div className="text-gray-600 mt-2">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section id="course-content" className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-12">
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
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Everything Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PlayCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">10+ Video Tutorials</h3>
            <p className="text-gray-600">Step-by-step video lessons covering everything</p>
          </div>
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Prompt Templates</h3>
            <p className="text-gray-600">Ready-to-use prompts for creating content</p>
          </div>
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">TikTok Examples</h3>
            <p className="text-gray-600">Real examples of successful videos</p>
          </div>
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
          <button className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition">
            Get Started Now →
          </button>
          <div className="text-center mt-6 text-sm text-purple-100">
            🔒 Secure payment via Stripe
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600 border-t">
        <p>© 2026 TikTok AI Course. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:text-purple-600">Privacy Policy</a>
          <a href="#" className="hover:text-purple-600">Terms of Service</a>
          <a href="#" className="hover:text-purple-600">Contact</a>
        </div>
      </footer>
    </div>
  );
}
