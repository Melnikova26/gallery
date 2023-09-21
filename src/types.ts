import { DropdownIndicatorProps } from "react-select";

export interface ThemeContextType {
  theme: string;
  lightThemeThenBlack: string;
  lightThemeThenWhite: string;
  toggleTheme: () => void;
}

export interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export interface IPaintingsType {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface IDataType {
  data: IPaintingsType[];
  totalPaintings: number;
}

export interface ICardsProps {
  paintings: IDataType | undefined;
}

export interface DropdownProps extends DropdownIndicatorProps {
  isDropdownOpen: boolean;
}

export interface ISelectValues {
  value: string;
  label: string;
}
export interface IAuthor {
  id: number;
  name: string;
}
export interface ILocation {
  id: number;
  location: string;
}

export interface ParamsType {
  name?: string;
  authorId?: number;
  locationId?: number;
  from?: number;
  to?: number;
}
export interface QueryParamsType extends ParamsType {
  _page: number;
  _limit: number;
}

export interface ISelectCreatedProps {
  nameValue: string;
  setFilters: Function;
}

export interface IPaginationProps {
  currentPage: number;
  filters?: ParamsType;
  setCurrentPage: Function;
  totalPaintings: number;
}

export interface IPageButtonProps {
  page: number;
  setCurrentPage: Function;
  clazz: string;
}

export interface ISelectItemProps {
  name: string;
  options: ISelectValues[];
  handleChangeFunc: (value: string | null) => void;
}
