import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOrderPoint } from '@/shared/model/order-point.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import OrderPointService from './order-point.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class OrderPoint extends mixins(AlertMixin) {
  @Inject('orderPointService') private orderPointService: () => OrderPointService;
  private removeId: number = null;

  public orderPoints: IOrderPoint[] = [];

  public isFetching = false;

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
