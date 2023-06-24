export interface AnimeCharactersModel {
   character: {
      mal_id: number;
      name: string;
      url: string;
      images: { jpg: { image_url: string } };
   };
   role: string;
   voice_actors: {
      language: string;
      person: { name: string; images: { jpg: { image_url: string } } };
   }[];
}

export interface AnimeCharacterListModel {
   data: AnimeCharactersModel[];
}
