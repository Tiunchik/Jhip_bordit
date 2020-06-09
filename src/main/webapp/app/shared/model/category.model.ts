import { IGoods } from '@/shared/model/goods.model';

export interface ICategory {
  id?: number;
  name?: string;
  goods?: IGoods[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public goods?: IGoods[]) {}
}
