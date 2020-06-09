/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import GoodsUpdateComponent from '@/entities/goods/goods-update.vue';
import GoodsClass from '@/entities/goods/goods-update.component';
import GoodsService from '@/entities/goods/goods.service';

import CategoryService from '@/entities/category/category.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Goods Management Update Component', () => {
    let wrapper: Wrapper<GoodsClass>;
    let comp: GoodsClass;
    let goodsServiceStub: SinonStubbedInstance<GoodsService>;

    beforeEach(() => {
      goodsServiceStub = sinon.createStubInstance<GoodsService>(GoodsService);

      wrapper = shallowMount<GoodsClass>(GoodsUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          goodsService: () => goodsServiceStub,

          categoryService: () => new CategoryService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.goods = entity;
        goodsServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(goodsServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.goods = entity;
        goodsServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(goodsServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
