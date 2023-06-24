export interface MiniTopMangaModel {
   mal_id: number;
   images: {
      jpg: {
         image_url: string;
      };
   };
   title: string;
   type: string;
   chapters: string;
   published: {
      from: string;
      to: string;
   };
   score: string;
   genres: {
      mal_id: number;
      name: string;
   }[];
}
