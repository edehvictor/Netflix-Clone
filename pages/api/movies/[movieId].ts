import { NextApiRequest, NextApiResponse } from "next";
import prismdb from "@/Lib/prismadb";
import serverAuth from "@/Lib/serverAuth";

// This api fetches the movieid  that was clicked to be played
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).end();
  }
  try {
    await serverAuth(req, res);

    const { movieId } = req.query;


    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await prismdb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    // if (!movie) {
    //   throw new Error("Invalid ID");
    // }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
