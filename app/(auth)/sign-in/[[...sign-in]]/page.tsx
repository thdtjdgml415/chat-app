import Image from "next/image";

import GoogleLogin from "@/features/auth/login/google-login";
import LoginForm from "@/features/auth/login/login-form";

export default function signIn() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex-col items-center justify-center h-full px-4 lg:flex">
        <div className="pt-16 space-y-4 text-center">
          <h1 className="text-3xl font-bold text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7e8ca0]">
            Log in or Create account to get back to your chat
          </p>
          <div className="text-left">
            <LoginForm />
          </div>

          <GoogleLogin />
        </div>
      </div>
      <div className="items-center justify-center hidden h-full bg-menu md:flex">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
