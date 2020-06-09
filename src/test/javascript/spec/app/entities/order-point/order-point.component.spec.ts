/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OrderPointComponent from '@/entities/order-point/order-point.vue';
import OrderPointClass from '@/entities/order-point/order-point.component';
import OrderPointService from '@/entities/order-point/order-point.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('OrderPoint Management Component', () => {
    let wrapper: Wrapper<OrderPointClass>;
    let comp: OrderPointClass;
    let orderPointServiceStub: SinonStubbedInstance<OrderPointService>;

    beforeEach(() => {
      orderPointServiceStub = sinon.createStubInstance<OrderPointService>(OrderPointService);
      orderPointServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<OrderPointClass>(OrderPointComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          orderPointService: () => orderPointServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      orderPointServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllOrderPoints();
      await comp.$nextTick();

      // THEN
      expect(orderPointServiceStub.retrieve.called).toBeTruthy();
      expect(comp.orderPoints[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      orderPointServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeOrderPoint();
      await comp.$nextTick();

      // THEN
      expect(orderPointServiceStub.delete.called).toBeTruthy();
      expect(orderPointServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
