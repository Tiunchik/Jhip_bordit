import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOrders } from '@/shared/model/orders.model';
import OrdersService from './orders.service';
import OrderPointService from '@/entities/order-point/order-point.service';
import { IOrderPoint } from '@/shared/model/order-point.model';
import { mixins } from 'vue-class-component';
import AlertMixin from '@/shared/alert/alert.mixin';

@Component
export default class OrdersDetails extends mixins(AlertMixin) {
  @Inject('ordersService') private ordersService: () => OrdersService;
  @Inject('orderPointService') private orderPointService: () => OrderPointService;
  private removeId: number = null;

  public orderPoints: IOrderPoint[] = [];

  public isFetching = false;
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

  public mounted(): void {
    this.retrieveAllOrderPoints();
  }

  public clear(): void {
    this.retrieveAllOrderPoints();
  }

  public retrieveAllOrderPoints(): void {
    this.isFetching = true;

    this.orderPointService()
      .retrieve()
      .then(
        res => {
          this.orderPoints = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IOrderPoint): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeOrderPoint(): void {
    this.orderPointService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A OrderPoint is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllOrderPoints();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
