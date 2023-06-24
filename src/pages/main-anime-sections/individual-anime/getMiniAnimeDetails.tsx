import axios from 'axios';
import { MiniAnimeDataModel } from '../../../interface/anime/MiniAnimeDataModel';

const fetchedMiniAnimeDetails = async (
   mal_id: number
): Promise<MiniAnimeDataModel> => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}`;
   const getMiniAnimeData = await axios.get(baseUrl);
   const { data } = getMiniAnimeData.data;
   const miniAnimeData: MiniAnimeDataModel = {
      mal_id: data.mal_id,
      title: data.title,
      images: data.images,
      status: data.status,
   };
   console.log(miniAnimeData);
   return miniAnimeData;
};

const getMiniAnimeDetails = (mal_id: number) => {
   return fetchedMiniAnimeDetails(mal_id);
};

export default getMiniAnimeDetails;
