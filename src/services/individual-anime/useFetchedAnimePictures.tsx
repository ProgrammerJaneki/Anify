import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnimeCharactersModel } from '../../interface/AnimeCharactersModel';

interface ImageModel {
   jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
   };
}

interface ImageDataModel {
   data: ImageModel[];
}

const fetchedAnimePictures = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/pictures`;
   const getAnimePicturesData = await axios.get<ImageDataModel>(baseUrl);
   const animePicturesData = getAnimePicturesData.data.data[0].jpg;

   return animePicturesData;
};

const useFetchedAnimePictures = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: animePictureData,
      isFetching: isAnimePictureFetching,
      isSuccess: isAnimePictureSuccess,
   } = useQuery({
      queryKey: ['animePicturedata', mal_id],
      queryFn: () => fetchedAnimePictures(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });
   return { animePictureData, isAnimePictureFetching, isAnimePictureSuccess };
};

export default useFetchedAnimePictures;
