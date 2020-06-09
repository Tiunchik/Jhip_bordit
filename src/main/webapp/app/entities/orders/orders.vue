<template>
    <div>
        <h2 id="page-heading">
            <span id="orders-heading">Orders</span>
            <router-link :to="{name: 'OrdersCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-orders">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Orders
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
        <div class="alert alert-warning" v-if="!isFetching && orders && orders.length === 0">
            <span>No orders found</span>
        </div>
        <div class="table-responsive" v-if="orders && orders.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('date')"><span>Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('client.lastName')"><span>Client</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'client.lastName'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orders in orders"
                    :key="orders.id">
                    <td>
                        <router-link :to="{name: 'OrdersView', params: {ordersId: orders.id}}">{{orders.id}}</router-link>
                    </td>
                    <td>{{orders.date | formatDate}}</td>
                    <td>
                        <div v-if="orders.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: orders.client.id}}">{{orders.client.lastName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OrdersView', params: {ordersId: orders.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'OrdersEdit', params: {ordersId: orders.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(orders)"
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
                <infinite-loading
                    ref="infiniteLoading"
                    v-if="totalItems > itemsPerPage"
                    :identifier="infiniteId"
                    slot="append"
                    @infinite="loadMore"
                    force-use-infinite-wrapper=".el-table__body-wrapper"
                    :distance='20'>
                </infinite-loading>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="borditApp.orders.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-orders-heading">Are you sure you want to delete this Orders?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-orders" v-on:click="removeOrders()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./orders.component.ts">
</script>
