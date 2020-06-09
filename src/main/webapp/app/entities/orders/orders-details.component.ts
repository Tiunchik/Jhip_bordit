import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOrders } from '@/shared/model/orders.model';
import OrdersService from './orders.service';

@Component
export default class OrdersDetails extends Vue {
  @Inject('ordersService') private ordersService: () => OrdersService;
  public orders: IOrders = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ordersId) {
        vm.retrieveOrders(to.params.ordersId);
      }
    });
  }

  public retrieveOrders(ordersId) {
    this.ordersService()
      .find(ordersId)
      .then(res => {
        this.orders = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
