import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDb();
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, description, status, genre, creatorId } = await req.json();
    if (!name || !description)
      return NextResponse.json({ error: "Invalid Data" }, { status: 422 });

    await connectToDb();

    const newMovie = await prisma.movie.create({
      data: {
        name,
        description,
        status,
        genre,
        creatorId,
      },
    });
    return NextResponse.json(newMovie, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
