const express = require('express')
const Router = express.Router();

const jwtVerify = require('./../middleware/decrypt')
const upload = require('./../middleware/uploadProperty')

const {propertyController} = require('../controller')

Router.get('/getAll', propertyController.getAllProperty)
Router.get('/getType', propertyController.getPropertyType)
Router.get('/details', propertyController.getPropertyDetails)
Router.get('/search', propertyController.getPropertyByName)
Router.get('/room-details', propertyController.getPropertyByRooms)
Router.get('/search-rooms', propertyController.getRoomByQuery)
Router.get('/search-date', propertyController.getRoomByDateAndLocation)
Router.get('/city', propertyController.getCity)
Router.post('/create-property', jwtVerify, upload, propertyController.createProperty)
Router.patch('/edit-property',jwtVerify, propertyController.editProperty)
Router.patch('/edit-propertyPicture', upload, propertyController.editPropertyPicture)
Router.delete('/delete-property', jwtVerify, propertyController.deleteProperty)
Router.post('/create-room', jwtVerify, upload, propertyController.createRoom)
Router
Router.patch('/edit-room', propertyController.editRoom)
Router.patch('/edit-roomPicture', upload, propertyController.editRoomPicture)
Router.delete('/delete-room', jwtVerify, propertyController.deleteRoom)
Router.post('/tenant-property', jwtVerify, propertyController.getTenantProperty )
Router.get('/property-connector', propertyController.getPropertyConnector)
Router.get('/room-connector', propertyController.getRoomConnector)
Router.post('/create-review', jwtVerify, propertyController.roomReview)
Router.get('/reviews', propertyController.getRoomReview)
Router.get('/type', propertyController.getType)
Router.get('/property-accommodation', propertyController.getPropertyAccommodation)
Router.get('/room-accommodation', propertyController.getRoomAccommodation)
Router.post('/room-price', propertyController.createSpecialPrice)

Router.post('/check-booking', jwtVerify, propertyController.reviewBookingCheck)
Router.get('/suggestion', propertyController.suggestionByLocation)



module.exports = Router;