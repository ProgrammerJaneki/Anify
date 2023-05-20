export interface FilterModel {
   value: string | number;
   setValue: React.Dispatch<React.SetStateAction<string>>;
   dropDown: boolean;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
   valueOptions: string[];
   filterName: string;
}
