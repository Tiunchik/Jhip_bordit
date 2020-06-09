import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import GoodsService from '../goods/goods.service';
import { Goods, IGoods } from '@/shared/model/goods.model';

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

  public isSaving = false;
  public currentLanguage = '';
  public orderPoints: OrderPoint[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderPointId) {
        vm.retrieveOrderPoint(to.params.orderPointId);
      }
      if (to.params.ordersId) {
        vm.loadOrders(to.params.ordersId);
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
      .then(gds => {
        if (this.$route.params.ordersId) {
          this.orderPointService()
            .retrieveByOrder(Number(this.$route.params.ordersId))
            .then(res => {
              let array: IGoods[] = [];
              gds.data.forEach(function (el, ind, good) {
                let yes: boolean = true;
                res.data.forEach(function (elem, index, orders) {
                  if (elem.goods.id === el.id) {
                    yes = false;
                  }
                });
                if (yes) {
                  array.push(el);
                }
              });
              this.goods = array;
            });
        }
      });
  }

  public loadOrders(ordersId) {
    this.ordersService()
      .find(ordersId)
      .then(ord => (this.orderPoint.orders = ord));
  }
}
