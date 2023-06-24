export interface AnimeDataModel {
   mal_id: number;
   images: { jpg: { image_url: string } };
   title: string;
   title_japanese: string;
   type: string;
   episodes: number;
   genres: { mal_id: number; name: string }[];
   score: number;
   season: string;
   studios: { name: string }[];
   year: number;
}
