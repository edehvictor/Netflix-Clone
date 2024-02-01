import useSWR from "swr";
import fetcher from "@/Lib/fetcher";

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    isLoading,
    error,
  };
};
export default useMovie;
