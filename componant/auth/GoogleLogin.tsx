"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GoogleLogin() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      if (response.ok) {
        // تحديث حالة السيرفر فوراً ليتعرف على الكوكي الجديدة
        router.refresh();
        // تحويل المستخدم للصفحة الرئيسية
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-all w-full"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google" 
        className="w-5 h-5" 
      />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
}