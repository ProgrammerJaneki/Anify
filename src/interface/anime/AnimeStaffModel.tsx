export interface AnimeStaffModel {
  person: {
    mal_id: number;
    name: string;
    url: string;
    images: { jpg: { image_url: string } }
  };
  positions: string;
}