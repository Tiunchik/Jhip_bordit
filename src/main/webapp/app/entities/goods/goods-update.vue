<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="borditApp.goods.home.createOrEditLabel">Create or edit a Goods</h2>
                <div>
                    <div class="form-group" v-if="goods.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="goods.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="goods-name">Name</label>
                        <input type="text" class="form-control" name="name" id="goods-name"
                            :class="{'valid': !$v.goods.name.$invalid, 'invalid': $v.goods.name.$invalid }" v-model="$v.goods.name.$model"  required/>
                        <div v-if="$v.goods.name.$anyDirty && $v.goods.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.goods.name.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.goods.name.minLength">
                                This field is required to be at least 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="goods-price">Price</label>
                        <input type="number" class="form-control" name="price" id="goods-price"
                            :class="{'valid': !$v.goods.price.$invalid, 'invalid': $v.goods.price.$invalid }" v-model.number="$v.goods.price.$model"  required/>
                        <div v-if="$v.goods.price.$anyDirty && $v.goods.price.$invalid">
                            <small class="form-text text-danger" v-if="!$v.goods.price.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.goods.price.numeric">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="goods-image">Image</label>
                        <div>
                            <img v-bind:src="'data:' + goods.imageContentType + ';base64,' + goods.image" style="max-height: 100px;" v-if="goods.image" alt="goods image"/>
                            <div v-if="goods.image" class="form-text text-danger clearfix">
                                <span class="pull-left">{{goods.imageContentType}}, {{byteSize(goods.image)}}</span>
                                <button type="button" v-on:click="clearInputImage('image', 'imageContentType', 'file_image')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_image" id="file_image" v-on:change="setFileData($event, goods, 'image', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="image" id="goods-image"
                            :class="{'valid': !$v.goods.image.$invalid, 'invalid': $v.goods.image.$invalid }" v-model="$v.goods.image.$model"  required/>
                        <input type="hidden" class="form-control" name="imageContentType" id="goods-imageContentType"
                            v-model="goods.imageContentType" />
                        <div v-if="$v.goods.image.$anyDirty && $v.goods.image.$invalid">
                            <small class="form-text text-danger" v-if="!$v.goods.image.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="goods-category">Category</label>
                        <select class="form-control" id="goods-category" multiple name="category" v-model="goods.categories">
                            <option v-bind:value="getSelected(goods.categories, categoryOption)" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.goods.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./goods-update.component.ts">
</script>
