import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOrderPoint } from '@/shared/model/order-point.model';
import OrderPointService from './order-point.service';

@Component
export default class OrderPointDetails extends Vue {
  @Inject('orderPointService') private orderPointService: () => OrderPointService;
  public orderPoint: IOrderPoint = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderPointId) {
        vm.retrieveOrderPoint(to.params.orderPointId);
      }
    });
  }

  public retrieveOrderPoint(orderPointId) {
    this.orderPointService()
      .find(orderPointId)
      .then(res => {
        this.orderPoint = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
