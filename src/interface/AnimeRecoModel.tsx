export interface AnimeRecoModel {
   entry: {
      mal_id: number;
      title: string;
      images: { jpg: { image_url: string } };
   };
   votes: number;
}
