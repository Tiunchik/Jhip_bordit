import { ICategory } from '@/shared/model/category.model';

export interface IGoods {
  id?: number;
  name?: string;
  price?: number;
  imageContentType?: string;
  image?: any;
  categories?: ICategory[];
}

export class Goods implements IGoods {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public imageContentType?: string,
    public image?: any,
    public categories?: ICategory[]
  ) {}
}
