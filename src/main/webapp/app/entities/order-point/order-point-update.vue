<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="borditApp.orderPoint.home.createOrEditLabel">Create or edit a OrderPoint</h2>
                <div>
                    <div class="form-group" v-if="orderPoint.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="orderPoint.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="order-point-number">Number</label>
                        <input type="number" class="form-control" name="number" id="order-point-number"
                            :class="{'valid': !$v.orderPoint.number.$invalid, 'invalid': $v.orderPoint.number.$invalid }" v-model.number="$v.orderPoint.number.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="order-point-goods">Goods</label>
                        <select class="form-control" id="order-point-goods" name="goods" v-model="orderPoint.goods">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="orderPoint.goods && goodsOption.id === orderPoint.goods.id ? orderPoint.goods : goodsOption" v-for="goodsOption in goods" :key="goodsOption.id">{{goodsOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="order-point-orders">Orders</label>
                        <select class="form-control" id="order-point-orders" name="orders" v-model="orderPoint.orders">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="orderPoint.orders && ordersOption.id === orderPoint.orders.id ? orderPoint.orders : ordersOption" v-for="ordersOption in orders" :key="ordersOption.id">{{ordersOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.orderPoint.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./order-point-update.component.ts">
</script>
