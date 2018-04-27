import { Accessory } from '../models/accessory.model';

export interface Dog {
  id?: number;
  name?: string;
  image?: string;
  accessories?: Accessory[];
}
