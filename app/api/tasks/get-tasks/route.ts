import connectToMongoDB from "@/lib/server/db/db";
import Tasks from "@/lib/server/models/Tasks";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    await connectToMongoDB();

    const tasks = await Tasks.find();
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export { GET };
export const dynamic = "force-dynamic";