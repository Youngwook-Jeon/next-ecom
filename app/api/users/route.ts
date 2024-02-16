import UserModel from "@models/userModel";
import startDb from "@lib/db";
import { NextResponse } from "next/server";
import { NewUserRequest } from "@/app/types";
import { hash } from "bcrypt";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  
  const newUser = await UserModel.create({
    ...body,
  });

  return NextResponse.json(newUser);
};
