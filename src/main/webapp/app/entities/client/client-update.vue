<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="borditApp.client.home.createOrEditLabel">Create or edit a Client</h2>
                <div>
                    <div class="form-group" v-if="client.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="client.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="client-firstName"
                            :class="{'valid': !$v.client.firstName.$invalid, 'invalid': $v.client.firstName.$invalid }" v-model="$v.client.firstName.$model"  required/>
                        <div v-if="$v.client.firstName.$anyDirty && $v.client.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.firstName.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.firstName.minLength">
                                This field is required to be at least 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-patronim">Patronim</label>
                        <input type="text" class="form-control" name="patronim" id="client-patronim"
                            :class="{'valid': !$v.client.patronim.$invalid, 'invalid': $v.client.patronim.$invalid }" v-model="$v.client.patronim.$model"  required/>
                        <div v-if="$v.client.patronim.$anyDirty && $v.client.patronim.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.patronim.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.patronim.minLength">
                                This field is required to be at least 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="client-lastName"
                            :class="{'valid': !$v.client.lastName.$invalid, 'invalid': $v.client.lastName.$invalid }" v-model="$v.client.lastName.$model"  required/>
                        <div v-if="$v.client.lastName.$anyDirty && $v.client.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.lastName.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.lastName.minLength">
                                This field is required to be at least 2 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-age">Age</label>
                        <input type="number" class="form-control" name="age" id="client-age"
                            :class="{'valid': !$v.client.age.$invalid, 'invalid': $v.client.age.$invalid }" v-model.number="$v.client.age.$model" />
                        <div v-if="$v.client.age.$anyDirty && $v.client.age.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.age.min">
                                This field should be at least 0.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.age.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-email">Email</label>
                        <input type="text" class="form-control" name="email" id="client-email"
                            :class="{'valid': !$v.client.email.$invalid, 'invalid': $v.client.email.$invalid }" v-model="$v.client.email.$model"  required/>
                        <div v-if="$v.client.email.$anyDirty && $v.client.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.email.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.email.minLength">
                                This field is required to be at least 6 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="client-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + client.photoContentType + ';base64,' + client.photo" style="max-height: 100px;" v-if="client.photo" alt="client image"/>
                            <div v-if="client.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{client.photoContentType}}, {{byteSize(client.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, client, 'photo', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="client-photo"
                            :class="{'valid': !$v.client.photo.$invalid, 'invalid': $v.client.photo.$invalid }" v-model="$v.client.photo.$model"  required/>
                        <input type="hidden" class="form-control" name="photoContentType" id="client-photoContentType"
                            v-model="client.photoContentType" />
                        <div v-if="$v.client.photo.$anyDirty && $v.client.photo.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.photo.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.client.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./client-update.component.ts">
</script>
