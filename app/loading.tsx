import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full ">
      <Image src="/loading.svg" width={100} height={100} alt="로딩중" />
    </div>
  );
}
