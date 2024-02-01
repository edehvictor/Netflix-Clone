import Navbar from "@/Components/Navbar";
import { signOut, signIn, useSession, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import BillBoard from "@/Components/BillBoard";
import MovieList from "@/Components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/Components/infoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {

  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();

  return (
    <>
      {/* <button onClick={()=> signOut()} className="w-80 text-green-200 py-4 px-4 bg-red-600 text-center rounded-md">Sign Out</button> */}
      <InfoModal visible onClose={() => {}}/>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My list" data={favourites} />
      </div>
      <p>
        {/* {session ? `${session.user?.name},` : "No name"}{" "} */}
        {/* {session ? "Welcome to Netflix" : " "} */}
      </p>
      {/* <h1 className="text-2xl text-green-200">Netflix Clone</h1>
      <ul className="flex px-3">
        <p> Logged in as: {user?.name}</p>
        {!session ? (
          <button
            className="bg-red-600 py-3 text-white   rounded-md w-full mt-10 hover:bg-red-700 transition"
            onClick={() => {
              signIn("github", { callbackUrl: "/blog" });
            }}
          >
            Sign in with Github
          </button>
        ) : (
       
      
        )}
      </ul>
      {session ? `${session.user?.name},` : "No name"} Welcome to NextJs */}
      {/* {session ? `${session.user?.name},` : "No name"} {session ? 'Welcome to Netflix' :  " "} */}
    </>
  );
}
