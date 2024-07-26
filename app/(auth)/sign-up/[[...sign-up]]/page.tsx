import CorpSignUpForm from "@/features/auth/corp-sign-up/corp-signup-form";
import SignUpForm from "@/features/auth/sign-up/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/share/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex-col items-center h-full px-4 md:flex">
        <div className="space-y-4 text-center md:w-96">
          <h1 className="text-3xl mt-10 font-bold text-[#2E2A47] ">회원가입</h1>
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">일반회원</TabsTrigger>
              <TabsTrigger value="corporate">기업회원</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="text-left">
                <SignUpForm />
              </div>
            </TabsContent>
            <TabsContent value="corporate">
              <div className="text-left">
                <CorpSignUpForm />
              </div>
            </TabsContent>
          </Tabs>
          <Link href="/sign-in" className="block mt-10 text-sm text-menu">
            이미 회원이시라면 여기를 클릭해주세요.
          </Link>
        </div>
      </div>
      <div className="items-center justify-center hidden h-full bg-menu md:flex">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
