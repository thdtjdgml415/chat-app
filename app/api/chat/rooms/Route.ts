import { NextResponse } from "next/server";
import { get } from "@/share/api/Service";
import { ChatRoomProps } from "@/features/chat/model/chat";
export async function GET() {
  try {
    const data = await get<ChatRoomProps>(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/chat/rooms"
    );
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chat rooms" },
      { status: 500 }
    );
  }
}
