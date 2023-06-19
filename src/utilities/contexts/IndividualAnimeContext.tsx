import { createContext } from 'react';
import { FullAnimeDataModel } from '../../interface/FullAnimeDataModel';

export interface IndividualAnimeContextType {
   mal_id: string | undefined;
   anime_name: string | undefined;
   fullAnimeData: FullAnimeDataModel | undefined;
}

export const IndividualAnimeContext =
   createContext<IndividualAnimeContextType | null>(null);
