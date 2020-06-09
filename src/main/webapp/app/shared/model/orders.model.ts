import { IOrderPoint } from '@/shared/model/order-point.model';
import { IClient } from '@/shared/model/client.model';

export interface IOrders {
  id?: number;
  date?: Date;
  orderpoints?: IOrderPoint[];
  client?: IClient;
}

export class Orders implements IOrders {
  constructor(public id?: number, public date?: Date, public orderpoints?: IOrderPoint[], public client?: IClient) {}
}
