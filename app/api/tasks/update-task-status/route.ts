import Tasks from "@/lib/server/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  const { taskId, status } = await req.json();

  if (!taskId)
    return NextResponse.json(
      { success: false, error: "Missing required field: taskId" },
      { status: 400 }
    );

  if (!status)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required field: status",
      },
      { status: 400 }
    );

  try {
    const response = Tasks.updateOne(
      { _id: taskId },
      { $set: { status } }
    ).exec();
    console.log({ response });
    return NextResponse.json({
      success: true,
      message: "Task status updated!",
    });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export { POST };
