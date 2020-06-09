<template>
    <div>
        <h2 id="page-heading">
            <span id="goods-heading">Goods</span>
            <router-link :to="{name: 'GoodsCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-goods">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Goods
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
        <div class="alert alert-warning" v-if="!isFetching && goods && goods.length === 0">
            <span>No goods found</span>
        </div>
        <div class="table-responsive" v-if="goods && goods.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('price')"><span>Price</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'price'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('image')"><span>Image</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'image'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="goods in goods"
                    :key="goods.id">
                    <td>
                        <router-link :to="{name: 'GoodsView', params: {goodsId: goods.id}}">{{goods.id}}</router-link>
                    </td>
                    <td>{{goods.name}}</td>
                    <td>{{goods.price}}</td>
                    <td>
                        <a v-if="goods.image" v-on:click="openFile(goods.imageContentType, goods.image)">
                            <img v-bind:src="'data:' + goods.imageContentType + ';base64,' + goods.image" style="max-height: 30px;" alt="goods image"/>
                        </a>
                        <span v-if="goods.image">{{goods.imageContentType}}, {{byteSize(goods.image)}}</span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'GoodsView', params: {goodsId: goods.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'GoodsEdit', params: {goodsId: goods.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(goods)"
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
            <span slot="modal-title"><span id="borditApp.goods.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-goods-heading">Are you sure you want to delete this Goods?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-goods" v-on:click="removeGoods()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./goods.component.ts">
</script>
