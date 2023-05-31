import { createContext } from 'react';

interface IconSizesModel {
   searchIcon: string;
   closeIcon: string;
   sortIcon: string;
}

export interface GlobalContextType {
   iconSizes: IconSizesModel;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);
