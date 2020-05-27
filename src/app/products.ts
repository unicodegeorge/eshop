export interface Products {
  id: number;
  title: string;
  descriprion: string;
  unitsOnStock: number;
  price: number;
  images: Image[];
  parameters: [];
  ratings: Rating[];
}
