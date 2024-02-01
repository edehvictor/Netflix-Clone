import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/Lib/prismadb";
import serverAuth from "@/Lib/serverAuth";

// this route generates random movies for the billboard
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400);
  }
  try {
    await serverAuth(req,res);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    console.log(randomMovies, 'randomMoviez')

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
  }
}
