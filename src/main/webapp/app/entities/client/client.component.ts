import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClient } from '@/shared/model/client.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ClientService from './client.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Client extends mixins(JhiDataUtils, AlertMixin) {
  @Inject('clientService') private clientService: () => ClientService;
  private removeId: number = null;

  public clients: IClient[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClients();
  }

  public clear(): void {
    this.retrieveAllClients();
  }

  public retrieveAllClients(): void {
    this.isFetching = true;

    this.clientService()
      .retrieve()
      .then(
        res => {
          this.clients = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IClient): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClient(): void {
    this.clientService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Client is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllClients();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
