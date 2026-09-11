// ==========================================
// 📝 注册页面
// ==========================================

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <SignUp />
    </div>
  );
}
