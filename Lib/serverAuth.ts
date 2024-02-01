import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/Lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//This checks if the user is sigbned in
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email || "",
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;

// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";
// import prismadb from "@/Lib/prismadb";

// const serverAuth = async (req: NextApiRequest) => {
//   const session = await getSession({ req }); //fetch loged in user sesssion
//   // console.log(session)
//   // if (!session?.user?.email) {
//   //   throw new Error("Not signed in");
//   // }

//   const currentUser = await prismadb.user.findUnique({
//     where: {
//       email: session?.user?.email || "",
//     },
//   });

//   if (!currentUser) {
//     throw new Error("Not signed in");
//   }
//   return { currentUser };
// };

// export default serverAuth;
