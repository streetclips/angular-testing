export type TitleParam = string | null | undefined;
export type PriceRangeParam = string | null | undefined;
export type CategoryParam = number | null | undefined;

export interface SearchParams {
  title?: TitleParam;
  priceRange?: PriceRangeParam;
  category?: CategoryParam;
}
