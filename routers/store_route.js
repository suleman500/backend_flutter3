const express = require('express');
const route = express.Router();
const Store = require('../model/store.model');
const {authJwt} = require('../helper/jwt');
const storeController = require('../controllers/store_controller');




route.get('/', storeController.getAllStores);
route.get('/:id', storeController.getStoreById);
route.post('/createStore', storeController.createdStore);
route.put('/updateStore', storeController.updateStore);

//route.post('/test', storeController.testCreateStore);


module.exports = route;
console.log('✅ store_route.js loaded');