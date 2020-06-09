import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import GoodsService from '../goods/goods.service';
import { IGoods } from '@/shared/model/goods.model';

import OrdersService from '../orders/orders.service';
import { IOrders } from '@/shared/model/orders.model';

import AlertService from '@/shared/alert/alert.service';
import { IOrderPoint, OrderPoint } from '@/shared/model/order-point.model';
import OrderPointService from './order-point.service';

const validations: any = {
  orderPoint: {
    number: {},
  },
};

@Component({
  validations,
})
export default class OrderPointUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('orderPointService') private orderPointService: () => OrderPointService;
  public orderPoint: IOrderPoint = new OrderPoint();

  @Inject('goodsService') private goodsService: () => GoodsService;

  public goods: IGoods[] = [];

  @Inject('ordersService') private ordersService: () => OrdersService;

  public orders: IOrders[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderPointId) {
        vm.retrieveOrderPoint(to.params.orderPointId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.orderPoint.id) {
      this.orderPointService()
        .update(this.orderPoint)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A OrderPoint is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.orderPointService()
        .create(this.orderPoint)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A OrderPoint is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveOrderPoint(orderPointId): void {
    this.orderPointService()
      .find(orderPointId)
      .then(res => {
        this.orderPoint = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.goodsService()
      .retrieve()
      .then(res => {
        this.goods = res.data;
      });
    this.ordersService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
  }
}
