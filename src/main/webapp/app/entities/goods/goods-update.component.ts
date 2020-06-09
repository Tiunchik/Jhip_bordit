import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AlertService from '@/shared/alert/alert.service';
import { IGoods, Goods } from '@/shared/model/goods.model';
import GoodsService from './goods.service';

const validations: any = {
  goods: {
    name: {
      required,
      minLength: minLength(3),
    },
    price: {
      required,
      numeric,
    },
    image: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class GoodsUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('goodsService') private goodsService: () => GoodsService;
  public goods: IGoods = new Goods();

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.goodsId) {
        vm.retrieveGoods(to.params.goodsId);
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
    this.goods.categories = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.goods.id) {
      this.goodsService()
        .update(this.goods)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Goods is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.goodsService()
        .create(this.goods)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Goods is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveGoods(goodsId): void {
    this.goodsService()
      .find(goodsId)
      .then(res => {
        this.goods = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.goods && field && fieldContentType) {
      if (this.goods.hasOwnProperty(field)) {
        this.goods[field] = null;
      }
      if (this.goods.hasOwnProperty(fieldContentType)) {
        this.goods[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
