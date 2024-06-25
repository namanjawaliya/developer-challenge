import connectToMongoDB from "@/lib/server/db/db";
import Tasks from "@/lib/server/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  await connectToMongoDB();

  const { title, description, status, priority, dueDate } = await req.json();

  console.log({dueDate})

  if (!title || !dueDate) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: title or dueDate" },
      { status: 400 }
    );
  }

  try {
    const newTask = new Tasks({
      title,
      description,
      status,
      priority,
      dueDate,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    await newTask.save();

    return NextResponse.json({
      success: true,
      message: "Task created successfully!",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
};

export { POST };
