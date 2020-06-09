import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const Sessions = () => import('../account/sessions/sessions.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Client = () => import('../entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('../entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('../entities/client/client-details.vue');
// prettier-ignore
const Category = () => import('../entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('../entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('../entities/category/category-details.vue');
// prettier-ignore
const Goods = () => import('../entities/goods/goods.vue');
// prettier-ignore
const GoodsUpdate = () => import('../entities/goods/goods-update.vue');
// prettier-ignore
const GoodsDetails = () => import('../entities/goods/goods-details.vue');
// prettier-ignore
const Orders = () => import('../entities/orders/orders.vue');
// prettier-ignore
const OrdersUpdate = () => import('../entities/orders/orders-update.vue');
// prettier-ignore
const OrdersDetails = () => import('../entities/orders/orders-details.vue');
// prettier-ignore
const OrderPoint = () => import('../entities/order-point/order-point.vue');
// prettier-ignore
const OrderPointUpdate = () => import('../entities/order-point/order-point-update.vue');
// prettier-ignore
const OrderPointDetails = () => import('../entities/order-point/order-point-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/sessions',
      name: 'Sessions',
      component: Sessions,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/client',
      name: 'Client',
      component: Client,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/client/new',
      name: 'ClientCreate',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/client/:clientId/edit',
      name: 'ClientEdit',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/client/:clientId/view',
      name: 'ClientView',
      component: ClientDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/new',
      name: 'CategoryCreate',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/:categoryId/edit',
      name: 'CategoryEdit',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/:categoryId/view',
      name: 'CategoryView',
      component: CategoryDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/goods/new',
      name: 'GoodsCreate',
      component: GoodsUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/goods/:goodsId/edit',
      name: 'GoodsEdit',
      component: GoodsUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/goods/:goodsId/view',
      name: 'GoodsView',
      component: GoodsDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/orders/new',
      name: 'OrdersCreate',
      component: OrdersUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/orders/:ordersId/edit',
      name: 'OrdersEdit',
      component: OrdersUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/orders/:ordersId/view',
      name: 'OrdersView',
      component: OrdersDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/order-point',
      name: 'OrderPoint',
      component: OrderPoint,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-point/new',
      name: 'OrderPointCreate',
      component: OrderPointUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-point/:orderPointId/edit',
      name: 'OrderPointEdit',
      component: OrderPointUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-point/:orderPointId/view',
      name: 'OrderPointView',
      component: OrderPointDetails,
      meta: { authorities: [Authority.USER] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
