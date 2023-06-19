export interface MiniAnimeDataModel {
  mal_id: number;
  title: string;
  images: {jpg: {image_url: string}};
  status: string;
}