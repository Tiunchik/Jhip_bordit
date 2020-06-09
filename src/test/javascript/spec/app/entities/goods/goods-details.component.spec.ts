/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import GoodsDetailComponent from '@/entities/goods/goods-details.vue';
import GoodsClass from '@/entities/goods/goods-details.component';
import GoodsService from '@/entities/goods/goods.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Goods Management Detail Component', () => {
    let wrapper: Wrapper<GoodsClass>;
    let comp: GoodsClass;
    let goodsServiceStub: SinonStubbedInstance<GoodsService>;

    beforeEach(() => {
      goodsServiceStub = sinon.createStubInstance<GoodsService>(GoodsService);

      wrapper = shallowMount<GoodsClass>(GoodsDetailComponent, { store, localVue, provide: { goodsService: () => goodsServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundGoods = { id: 123 };
        goodsServiceStub.find.resolves(foundGoods);

        // WHEN
        comp.retrieveGoods(123);
        await comp.$nextTick();

        // THEN
        expect(comp.goods).toBe(foundGoods);
      });
    });
  });
});
