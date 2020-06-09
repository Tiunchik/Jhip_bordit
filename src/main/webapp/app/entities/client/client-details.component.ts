import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IClient } from '@/shared/model/client.model';
import ClientService from './client.service';

@Component
export default class ClientDetails extends mixins(JhiDataUtils) {
  @Inject('clientService') private clientService: () => ClientService;
  public client: IClient = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientId) {
        vm.retrieveClient(to.params.clientId);
      }
    });
  }

  public retrieveClient(clientId) {
    this.clientService()
      .find(clientId)
      .then(res => {
        this.client = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
