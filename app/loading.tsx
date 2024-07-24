import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 transform translate-x-1/2 trnaslate-y-1/2 flex justify-center items-center">
      <Image src="/loading.svg" width={100} height={100} alt="  " />
    </div>
  );
}
