import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date) {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDated(dateString: any) {
  // "20240604" -> 연, 월, 일 추출
  let year = dateString.substring(0, 4);
  let month = dateString.substring(4, 6);
  let day = dateString.substring(6, 8);

  // 월은 0부터 시작하므로 1을 빼줍니다. (1월 = 0, 2월 = 1, ...)
  let date = new Date(year, month - 1, day);

  // 옵션 설정: 한국 시간대, 긴 형식의 날짜 출력
  let options: any = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Seoul",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  // Intl.DateTimeFormat을 사용하여 지정된 포맷으로 날짜 출력
  const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return new Date(formatedDate);
}

export function splitDate(dateString: string) {
  let year = dateString.substring(0, 4);
  let month = dateString.substring(4, 6);
  let day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
}

export function formatDateKor(input: string) {
  const date = new Date(input);
  return date.toLocaleDateString("ko-KO", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

// export const formatDateKo = (dateString) => {
//   const date = new Date(dateString);
//   return format(date, "yyyy-MM-dd HH:mm:ss", { locale: ko });
// };
