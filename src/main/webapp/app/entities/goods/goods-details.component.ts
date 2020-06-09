import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IGoods } from '@/shared/model/goods.model';
import GoodsService from './goods.service';

@Component
export default class GoodsDetails extends mixins(JhiDataUtils) {
  @Inject('goodsService') private goodsService: () => GoodsService;
  public goods: IGoods = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.goodsId) {
        vm.retrieveGoods(to.params.goodsId);
      }
    });
  }

  public retrieveGoods(goodsId) {
    this.goodsService()
      .find(goodsId)
      .then(res => {
        this.goods = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
