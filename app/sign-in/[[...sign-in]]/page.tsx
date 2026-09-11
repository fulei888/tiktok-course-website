// ==========================================
// 🔐 登录页面
// ==========================================

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <SignIn />
    </div>
  );
}
