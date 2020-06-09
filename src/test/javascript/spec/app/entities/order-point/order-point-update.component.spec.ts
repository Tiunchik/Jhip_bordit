/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OrderPointUpdateComponent from '@/entities/order-point/order-point-update.vue';
import OrderPointClass from '@/entities/order-point/order-point-update.component';
import OrderPointService from '@/entities/order-point/order-point.service';

import GoodsService from '@/entities/goods/goods.service';

import OrdersService from '@/entities/orders/orders.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('OrderPoint Management Update Component', () => {
    let wrapper: Wrapper<OrderPointClass>;
    let comp: OrderPointClass;
    let orderPointServiceStub: SinonStubbedInstance<OrderPointService>;

    beforeEach(() => {
      orderPointServiceStub = sinon.createStubInstance<OrderPointService>(OrderPointService);

      wrapper = shallowMount<OrderPointClass>(OrderPointUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          orderPointService: () => orderPointServiceStub,

          goodsService: () => new GoodsService(),

          ordersService: () => new OrdersService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.orderPoint = entity;
        orderPointServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(orderPointServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.orderPoint = entity;
        orderPointServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(orderPointServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
