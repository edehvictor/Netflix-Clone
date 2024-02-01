import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/Lib/prismadb";
import serverAuth from "@/Lib/serverAuth";

//this route handles fetching our favourite movies
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        //find id who has relation with favouriteIds,.
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
