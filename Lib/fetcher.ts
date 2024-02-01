import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data); //This works wirh useSWR to fetch data  when being called

export default fetcher;

