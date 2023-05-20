export interface HoverModalDataModel {
   type: string;
   episodes: number;
   genres: { mal_id: number; name: string }[];
   score: number;
   season: string;
   studios: { name: string }[];
   year: number;
}
