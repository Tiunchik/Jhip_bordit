<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="orders">
                <h2 class="jh-entity-heading"><span>Orders</span> {{orders.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Date</span>
                    </dt>
                    <dd>
                        <span>{{orders.date | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Client</span>
                    </dt>
                    <dd>
                        <div v-if="orders.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: orders.client.id}}">{{orders.client.lastName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="orders.id" :to="{name: 'OrdersEdit', params: {ordersId: orders.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
                <router-link :to="{name: 'OrderPointCreateWith', params: {ordersId: orders.id}}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-order-point">
                    <font-awesome-icon icon="plus"></font-awesome-icon>
                    <span >
                    Create a new Order Point
                </span>
                </router-link>
                <b-alert :show="dismissCountDown"
                         dismissible
                         :variant="alertType"
                         @dismissed="dismissCountDown=0"
                         @dismiss-count-down="countDownChanged">
                    {{alertMessage}}
                </b-alert>
            </div>
        </div>
        <div class="alert alert-warning" v-if="!isFetching && orderPoints && orderPoints.length === 0">
            <span>No orderPoints found</span>
        </div>
        <div class="table-responsive" v-if="orderPoints && orderPoints.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>Point ID</span></th>
                    <th><span>Item name</span></th>
                    <th><span>quantity</span></th>
                    <th><span>Order number</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orderPoint in orderPoints" v-if="orderPoint.orders && orderPoint.orders.id === orders.id"
                    :key="orderPoint.id">
                    <td>
                        <router-link :to="{name: 'OrderPointView', params: {orderPointId: orderPoint.id}}">{{orderPoint.id}}</router-link>
                    </td>
                    <td>
                        <div v-if="orderPoint.goods">
                            <router-link :to="{name: 'GoodsView', params: {goodsId: orderPoint.goods.id}}">{{orderPoint.goods.name}}</router-link>
                        </div>
                    </td>
                    <td>{{orderPoint.number}}</td>
                    <td>
                        <div v-if="orderPoint.orders">
                            <router-link :to="{name: 'OrdersView', params: {ordersId: orderPoint.orders.id}}">{{orderPoint.orders.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OrderPointView', params: {orderPointId: orderPoint.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'OrderPointEdit', params: {orderPointId: orderPoint.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(orderPoint)"
                                      variant="danger"
                                      class="btn btn-sm"
                                      v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="borditApp.orderPoint.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-orderPoint-heading">Are you sure you want to delete this Order Point?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-orderPoint" v-on:click="removeOrderPoint()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./orders-details.component.ts">
</script>
