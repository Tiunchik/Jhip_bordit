<template>
    <div>
        <h2 id="page-heading">
            <span id="order-point-heading">Order Points</span>
            <router-link :to="{name: 'OrderPointCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-order-point">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Order Point
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && orderPoints && orderPoints.length === 0">
            <span>No orderPoints found</span>
        </div>
        <div class="table-responsive" v-if="orderPoints && orderPoints.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Number</span></th>
                    <th><span>Goods</span></th>
                    <th><span>Orders</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orderPoint in orderPoints"
                    :key="orderPoint.id">
                    <td>
                        <router-link :to="{name: 'OrderPointView', params: {orderPointId: orderPoint.id}}">{{orderPoint.id}}</router-link>
                    </td>
                    <td>{{orderPoint.number}}</td>
                    <td>
                        <div v-if="orderPoint.goods">
                            <router-link :to="{name: 'GoodsView', params: {goodsId: orderPoint.goods.id}}">{{orderPoint.goods.name}}</router-link>
                        </div>
                    </td>
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

<script lang="ts" src="./order-point.component.ts">
</script>
