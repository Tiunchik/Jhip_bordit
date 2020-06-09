<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="borditApp.orders.home.createOrEditLabel">Create or edit a Orders</h2>
                <div>
                    <div class="form-group" v-if="orders.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="orders.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="orders-date">Date</label>
                        <div class="d-flex">
                            <input id="orders-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.orders.date.$invalid, 'invalid': $v.orders.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.orders.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.orders.date.$anyDirty && $v.orders.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orders.date.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orders.date.ZonedDateTimelocal">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="orders-client">Client</label>
                        <select class="form-control" id="orders-client" name="client" v-model="orders.client">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="orders.client && clientOption.id === orders.client.id ? orders.client : clientOption" v-for="clientOption in clients" :key="clientOption.id">{{clientOption.lastName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.orders.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./orders-update.component.ts">
</script>
