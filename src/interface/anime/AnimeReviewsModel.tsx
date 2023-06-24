export interface AnimeReviewsModel {
  mal_id: number;
  type: string;
  reactions: {
    overall: number;
    nice: number;
    love_it: number;
    funny: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
  },
  date: string;
  review: string;
  score: number;
  tags: number[];
  user: {
    username: string;
    images: {
      jpg: {
        image_url: string;
      }
    }
  }
}