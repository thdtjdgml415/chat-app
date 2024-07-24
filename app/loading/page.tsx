"use client";
import AlertLogin from "@/features/auth/login/alert-login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginRedirection = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refresh");

    if (accessToken && refreshToken) {
      setToken(accessToken);
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accesstoken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      router.push("/"); // 홈으로 리다이렉트
    } else {
      // 토큰이 없으면 로그인 실패 처리
      console.error("로그인 실패");
    }

    setIsLoading(false); // 로딩 상태 해제
  }, [router]);

  return (
    <>
      {/* // 로딩 중인 상태를 나타내는 컴포넌트 */}
      {isLoading ? (
        <div className="w-full h-screen bg-background flex items-center justify-center">
          <div className="loader loader--style2" title="1">
            <Image src="/loading.svg" width={100} height={100} alt="로딩중" />
          </div>
        </div>
      ) : token ? null : (
        <AlertLogin content="로그인" />
      )}
    </>
  );
};

export default LoginRedirection;
