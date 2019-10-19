import { Configuration } from "../stock";

export type CartItem = Configuration & {
  model: string;
  id: string;
  slug: string;
  quantity: number;
};
