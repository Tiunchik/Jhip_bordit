import { IGoods } from '@/shared/model/goods.model';
import { IOrders } from '@/shared/model/orders.model';

export interface IOrderPoint {
  id?: number;
  number?: number;
  goods?: IGoods;
  orders?: IOrders;
}

export class OrderPoint implements IOrderPoint {
  constructor(public id?: number, public number?: number, public goods?: IGoods, public orders?: IOrders) {}
}
