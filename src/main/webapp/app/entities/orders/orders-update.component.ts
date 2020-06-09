import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import OrderPointService from '../order-point/order-point.service';
import { IOrderPoint } from '@/shared/model/order-point.model';

import ClientService from '../client/client.service';
import { IClient } from '@/shared/model/client.model';

import AlertService from '@/shared/alert/alert.service';
import { IOrders, Orders } from '@/shared/model/orders.model';
import OrdersService from './orders.service';

const validations: any = {
  orders: {
    date: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class OrdersUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('ordersService') private ordersService: () => OrdersService;
  public orders: IOrders = new Orders();

  @Inject('orderPointService') private orderPointService: () => OrderPointService;

  public orderPoints: IOrderPoint[] = [];

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ordersId) {
        vm.retrieveOrders(to.params.ordersId);
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
    if (this.orders.id) {
      this.ordersService()
        .update(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Orders is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.ordersService()
        .create(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Orders is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.orders[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.orders[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.orders[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.orders[field] = null;
    }
  }

  public retrieveOrders(ordersId): void {
    this.ordersService()
      .find(ordersId)
      .then(res => {
        res.date = new Date(res.date);
        this.orders = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.orderPointService()
      .retrieve()
      .then(res => {
        this.orderPoints = res.data;
      });
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
  }
}
