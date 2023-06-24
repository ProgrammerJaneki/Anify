import axios from 'axios';
import { AnimeRecoModel } from '../../../interface/anime/AnimeRecoModel';
import { useQuery } from '@tanstack/react-query';

const fetchedAnimeReco = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`;
   const getAnimeRecoData = await axios.get(baseUrl);
   const { data } = getAnimeRecoData.data;
   const animeRecoDataList = data?.slice(0, 10).map((reco: AnimeRecoModel) => {
      const animeRecoData: AnimeRecoModel = {
         entry: reco.entry,
         votes: reco.votes,
      };
      return animeRecoData;
   });
   return animeRecoDataList;
};

const useFetchedAnimeReco = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: animeRecoData,
      isFetching: isAnimeRecoFetching,
      isSuccess: isAnimeRecoSuccess,
   } = useQuery<AnimeRecoModel[]>({
      queryKey: ['animeRecoData', mal_id],
      queryFn: () => fetchedAnimeReco(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });

   return { animeRecoData, isAnimeRecoFetching, isAnimeRecoSuccess };
};

export default useFetchedAnimeReco;
