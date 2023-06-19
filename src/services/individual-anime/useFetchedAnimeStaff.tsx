import axios from 'axios';
import { AnimeStaffModel } from '../../interface/AnimeStaffModel';
import { useQuery } from '@tanstack/react-query';

const fetchedAnimeStaff = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/staff`;
   const getAnimeStaffData = await axios.get(baseUrl);
   const { data } = getAnimeStaffData.data;
   const animeStaffDataList: AnimeStaffModel[] = data.map(
      (data: AnimeStaffModel) => {
         const animeStaffData: AnimeStaffModel = {
            person: data.person,
            positions: data.positions,
         };
         return animeStaffData;
      }
   );
   return animeStaffDataList;
};

const useFetchedAnimeStaff = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: staffData,
      isFetching: isStaffFetching,
      isSuccess: isStaffSuccess,
   } = useQuery({
      queryKey: ['staffData', mal_id],
      queryFn: () => fetchedAnimeStaff(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });

   return { staffData, isStaffFetching, isStaffSuccess };
};

export default useFetchedAnimeStaff;
