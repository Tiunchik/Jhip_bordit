/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ClientDetailComponent from '@/entities/client/client-details.vue';
import ClientClass from '@/entities/client/client-details.component';
import ClientService from '@/entities/client/client.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Client Management Detail Component', () => {
    let wrapper: Wrapper<ClientClass>;
    let comp: ClientClass;
    let clientServiceStub: SinonStubbedInstance<ClientService>;

    beforeEach(() => {
      clientServiceStub = sinon.createStubInstance<ClientService>(ClientService);

      wrapper = shallowMount<ClientClass>(ClientDetailComponent, { store, localVue, provide: { clientService: () => clientServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundClient = { id: 123 };
        clientServiceStub.find.resolves(foundClient);

        // WHEN
        comp.retrieveClient(123);
        await comp.$nextTick();

        // THEN
        expect(comp.client).toBe(foundClient);
      });
    });
  });
});
