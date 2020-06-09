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
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./orders-details.component.ts">
</script>
