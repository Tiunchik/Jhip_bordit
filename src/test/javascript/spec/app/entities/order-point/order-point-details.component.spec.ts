/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import OrderPointDetailComponent from '@/entities/order-point/order-point-details.vue';
import OrderPointClass from '@/entities/order-point/order-point-details.component';
import OrderPointService from '@/entities/order-point/order-point.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('OrderPoint Management Detail Component', () => {
    let wrapper: Wrapper<OrderPointClass>;
    let comp: OrderPointClass;
    let orderPointServiceStub: SinonStubbedInstance<OrderPointService>;

    beforeEach(() => {
      orderPointServiceStub = sinon.createStubInstance<OrderPointService>(OrderPointService);

      wrapper = shallowMount<OrderPointClass>(OrderPointDetailComponent, {
        store,
        localVue,
        provide: { orderPointService: () => orderPointServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOrderPoint = { id: 123 };
        orderPointServiceStub.find.resolves(foundOrderPoint);

        // WHEN
        comp.retrieveOrderPoint(123);
        await comp.$nextTick();

        // THEN
        expect(comp.orderPoint).toBe(foundOrderPoint);
      });
    });
  });
});
