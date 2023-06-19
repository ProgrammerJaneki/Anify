export interface FullAnimeDataModel {
   mal_id: number;
   title: string;
   title_english: string;
   title_japanese: string;
   images: { jpg: { image_url: string } };
   trailer: { youtube_id: string };
   synopsis: string;
   season: string;
   year: number;
   broadcast: { string: string };
   type: string;
   source: string;
   episodes: number;
   status: string;
   aired: { from: string; to: string };
   duration: string;
   rating: string;
   score: number;
   scored_by: number;
   popularity: number;
   rank: number;
   members: number;
   favourites: number;
   genres: { name: string }[];
   producers: { name: string }[];
   licensors: { name: string }[];
   studios: { name: string }[];
   relations: {
      relation: string;
      entry: { mal_id: number; type: string; name: string; url: string }[];
   }[];
   external: { name: string; url: string }[];
   streaming: { name: string; url: string }[];
}
