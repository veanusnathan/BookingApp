const { Op, ConnectionRefusedError } = require("sequelize");
const { sequelize } = require("./../sequelize/models");
const db = require("../sequelize/models");
const { offset } = require("@popperjs/core");
const { query, response } = require("express");
const moment = require("moment");
const deleteFiles = require("../helpers/deleteFilesProperty");
const property = db.property;

module.exports = {
  getAllProperty: async (req, res) => {
    const { page = 1 } = req.query;
    const page_size = 9;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const { rows: properties } = await property.findAndCountAll({
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        offset,
        limit,
      });

      const total_count = await property.count(); // get total number of properties
      const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

      return res.status(200).send({
        isError: false,
        message: "Get all Properties Success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyType: async (req, res) => {
    const { type = 1, page = 1 } = req.query;
    let page_size = 9;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const properties = await property.findAll({
        where: { type_id: type },
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        offset,
        limit,
      });

      const total_count = await property.count({ where: { type_id: type } }); // get total number of properties
      const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

      return res.status(200).send({
        isError: false,
        message: "Get data by type Success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyDetails: async (req, res) => {
    const { property_id } = req.query;

    try {
      const properties = await property.findOne({
        where: { id: property_id },
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",

            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
      });
      return res.status(200).send({
        isError: false,
        message: "Get property details Success",
        data: properties,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyByName: async (req, res) => {
    const { page = 1, name } = req.query;
    const page_size = 10;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const properties = await property.findAll({
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        where: name ? { name: { [Op.like]: `%${name}%` } } : {},
        offset,
        limit,
      });

      const total_count = await property.count();
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get all properties success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyByRooms: async (req, res) => {
    const { room_id } = req.query;

    try {
      const rooms = await db.room.findAll({
        where: { id: room_id },
        include: [
          {
            model: db.room_image,
            as: "room_images",
          },
          {
            model: property,
            as: "property",
            include: [
              { model: db.tenant },
              { model: db.location, include: { model: db.city } },
            ],
          },
        ],
      });

      res.status(200).send({
        isError: false,
        message: "Get Room details Success",
        data: rooms,
      });
    } catch (error) {
      res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getRoomByQuery: async (req, res) => {
    const {
      property_name,
      price_min,
      price_max,
      sort_order,
      page = 1,
    } = req.query;

    console.log(req.body);

    const page_size = 20;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      let order = [];

      if (sort_order) {
        if (sort_order === "asc" || sort_order === "desc") {
          order.push(["price", sort_order]);
        } else {
          throw { message: "Invalid sort order" };
        }
      }

      const rooms = await db.room.findAll({
        where: {
          price: {
            [Op.gte]: price_min,
            [Op.lte]: price_max,
          },
          "$property.name$": { [Op.like]: `%${property_name}%` },
        },
        include: [
          {
            model: db.room_image,
            as: "room_images",
          },
          {
            model: property,
            as: "property",
          },
        ],
        order: order,
        offset,
        limit,
        subQuery: false,
      });

      if (rooms.length === 0) {
        return res.status(400).send({
          isError: true,
          message: "There is No Room Match the Criteria ",
          data: rooms,
        });
      }

      const total_count = await db.room.count();
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).json({
        isError: false,
        message: "Get room by query success",
        data: rooms,
        total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).json({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getRoomByDateAndLocation: async (req, res) => {
    const { check_in, check_out, city, page = 1 } = req.query;
    let page_size = 10;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      if (!check_in || !check_out || !city || !page) {
        return res.status(400).send({
          isError: true,
          message: "Field cannot Empty",
          data: null,
        });
      }
      const transaction = await db.location.findAll({
        where: { city_id: city },
        include: [
          {
            model: db.property,
            include: [
              {
                model: db.property_image,
              },
              {
                model: db.room,
                include: [
                  {
                    model: db.room_image,
                  },
                  {
                    model: db.transactions,
                    where: {
                      [Op.or]: [
                        {
                          check_in: {
                            [Op.between]: [check_in, check_out],
                          },
                        },
                        {
                          check_out: {
                            [Op.between]: [check_in, check_out],
                          },
                        },
                      ],
                    },
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
        offset,
        limit,
      });

      const total_count = await db.location.count();
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).json({
        isError: false,
        message: "Get room by query success",
        data: transaction,
        total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).json({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  createProperty: async (req, res) => {
    const {
      name,
      address,
      description,
      type_id,
      city_id,
      city_name,
      location,
      property_accommodation,
    } = req.body;
    console.log(req.body);
    const id = req.dataToken.id;
    const t = await sequelize.transaction();
    try {
      if (city_name !== "") {
        let city = await db.city.findOne({ where: { city: city_name } });
        if (!city) {
          city = await db.city.create({ city: city_name }, { transaction: t });
        }
      }

      let createProperty = await db.property.create(
        {
          name,
          address,
          description,
          type_id,
          tenant_id: id,
        },
        { transaction: t }
      );

      let images = req.files.PROPERTY;
      for (let i = 0; i < images.length; i++) {
        let createPropertyImg = await db.property_image.create(
          {
            image_path: images[i].filename,
            property_id: createProperty.dataValues.id,
          },
          { transaction: t }
        );
        console.log(createPropertyImg);
      }

      let createLocation = await db.location.create(
        {
          name: location,
          city_id,
          property_id: createProperty.dataValues.id,
        },
        { transaction: t }
      );

      const propertyAccommodationArr = property_accommodation
        .split(",")
        .map(Number);
      for (let i = 0; i < propertyAccommodationArr.length; i++) {
        let createConnector = await db.property_connector.create(
          {
            property_id: createProperty.dataValues.id,
            property_accommodation_id: propertyAccommodationArr[i],
          },
          { transaction: t }
        );
        console.log(createConnector);
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Create Property Successful",
        data: {
          createProperty,
          // createPropertyImg,
          createLocation,
        },
      });
    } catch (error) {
      await t.rollback();
      deleteFiles(req.files);
      return res.status(400).send({
        isError: true,
        message: error.message,
        datA: null,
      });
    }
  },

  editProperty: async (req, res) => {
    const {
      name,
      address,
      description,
      type_id,
      city_id,
      city_name,
      location,
      property_id,
      property_accommodation,
    } = req.body;
    const id = req.dataToken.id;
    const t = await sequelize.transaction();
    console.log(req.body);
    try {
      if (
        !name ||
        !address ||
        !description ||
        !type_id ||
        !city_id ||
        !location ||
        !property_id ||
        !property_accommodation
      ) {
        return res.status(400).send({
          isError: true,
          message: "Field Cannot blank",
          data: null,
        });
      }

      // Find the property to be edited
      let property = await db.property.findOne(
        { where: { id: property_id } },
        { transaction: t }
      );
      if (!property) {
        throw new Error("Property not found");
      }

      // Check if the current user is the tenant of the property
      if (property.tenant_id !== id) {
        throw new Error("You are not authorized to edit this property");
      }

      // Update the property with the new data
      property.name = name;
      property.address = address;
      property.description = description;
      property.type_id = type_id;
      await property.save({ transaction: t });

      // Update the property location
      let propertyLocation = await db.location.findOne({
        where: { property_id: property.id },
        transaction: t,
      });
      propertyLocation.name = location;
      propertyLocation.city_id = city_id;
      await propertyLocation.save({ transaction: t });

      const propertyAccommodationArr = property_accommodation
        .filter((value) => !isNaN(Number(value)))
        .map((value) => Number(value));

      if (propertyAccommodationArr.length > 0) {
        await db.property_connector.destroy(
          { where: { property_id } },
          { transaction: t }
        );
        await db.property_connector.bulkCreate(
          propertyAccommodationArr.map((property_accommodation_id) => ({
            property_id,
            property_accommodation_id,
          })),
          { transaction: t }
        );
      } else if (property_accommodation.length > 0) {
        // if the property_accommodation data is not sent from the client but exists in the database, keep it
        await db.property_connector.destroy(
          { where: { property_id, property_accommodation_id: null } },
          { transaction: t }
        );
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Update Property Successful",
        data: {
          property,
          location: propertyLocation,
        },
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        datA: null,
      });
    }
  },

  editPropertyPicture: async (req, res) => {
    const { property_id } = req.body;

    const t = await sequelize.transaction();
    try {
      const property = await db.property.findOne(
        { where: { id: property_id } },
        { transaction: t }
      );
      if (!property) {
        throw new Error("Property not found");
      }

      await db.property_image.destroy(
        {
          where: { property_id: property.id },
        },
        { transaction: t }
      );

      if (req.files.PROPERTY) {
        let images = req.files.PROPERTY;
        for (let i = 0; i < images.length; i++) {
          let createPropertyImg = await db.property_image.create(
            {
              image_path: images[i].filename,
              property_id: property.id,
            },
            { transaction: t }
          );
          console.log(createPropertyImg);
        }
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Upload Image Success",
        data: null,
      });
    } catch (error) {
      await t.rollback();
      deleteFiles(req.files);
      return res.status(400).send({
        isError: true,
        message: error.message,
        datA: null,
      });
    }
  },

  deleteProperty: async (req, res) => {
    const { property_id } = req.body;

    const t = await sequelize.transaction();
    try {
      const locations = await db.location.findOne(
        {
          where: {
            property_id,
          },
        },
        { transaction: t }
      );

      console.log(locations);

      await db.location.destroy(
        {
          where: {
            property_id: locations.dataValues.id,
          },
        },
        { transaction: t }
      );

      const room = await db.room.findOne(
        {
          where: {
            property_id,
          },
        },
        { transaction: t }
      );

      if (room) {
        await db.room_image.destroy(
          {
            where: {
              room_id: room.dataValues.id,
            },
          },
          { transaction: t }
        );

        await db.room.destroy(
          {
            where: {
              id: room.dataValues.id,
            },
          },
          { transaction: t }
        );
      }

      // delete associated property images
      await db.property_image.destroy(
        {
          where: {
            property_id,
          },
        },
        { transaction: t }
      );

      // delete location associated with property
      await db.location.destroy(
        {
          where: {
            property_id,
          },
        },
        { transaction: t }
      );

      // delete property
      const deletedProperty = await db.property.destroy(
        {
          where: {
            id: property_id,
          },
        },
        { transaction: t }
      );

      await t.commit();

      if (deletedProperty > 0) {
        return res.status(200).send({
          isError: false,
          message: "Property deleted successfully",
          data: null,
        });
      } else {
        return res.status(404).send({
          isError: true,
          message: "Property not found",
          data: null,
        });
      }
    } catch (error) {
      await t.rollback();
      return res.status(500).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  createRoom: async (req, res) => {
    const {
      name,
      description,
      available_room,
      room_accommodation,
      price,
      property_id,
    } = req.body;

    const t = await sequelize.transaction();
    try {
      let createRoom = await db.room.create(
        {
          name,
          description,
          available_room,
          price,
          property_id,
        },
        { transaction: t }
      );

      let images = req.files.PROPERTY;
      for (let i = 0; i < images.length; i++) {
        let createRoomImg = await db.room_image.create(
          {
            image_path: images[i].filename,
            room_id: createRoom.dataValues.id,
          },
          { transaction: t }
        );
      }

      const roomAccommodationArr = room_accommodation.split(",").map(Number);
      for (let i = 0; i < roomAccommodationArr.length; i++) {
        let createConnector = await db.room_connector.create(
          {
            room_id: createRoom.dataValues.id,
            room_accommodation_id: roomAccommodationArr[i],
          },
          { transaction: t }
        );
        console.log(createConnector);
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Create Room Successful",
        data: createRoom,
      });
    } catch (error) {
      await t.rollback();
      deleteFiles(req.files);
      return res.status(400).send({
        isError: true,
        message: error.message,
        datA: null,
      });
    }
  },

  editRoom: async (req, res) => {
    const {
      name,
      description,
      available_room = 2,
      room_accommodation,
      price,
      room_id,
    } = req.body;
    console.log(req.body)

    const t = await sequelize.transaction();
    try {
      const room = await db.room.findOne({
        where: { id: room_id },
        transaction: t,
      });


      if (!room) {
        return res.status(404).send({
          isError: true,
          message: `Room with id ${room_id} not found`,
          data: null,
        });
      }

      if(!room.price){
        return res.status(404).send({
          isError: true,
          message: `Please Set The Price again`,
          data: null,
        });
      }

      console.log(price)

      room.name = name;
      room.description = description;
      room.available_room = available_room;
      room.price = price;
      room.room_id = room_id;
      await room.save({ transaction: t });

      const roomAccommodationArr = room_accommodation
        .filter((value) => !isNaN(Number(value)))
        .map((value) => Number(value));

      if (roomAccommodationArr.length > 0) {
        await db.room_connector.destroy(
          { where: { room_id } },
          { transaction: t }
        );
        await db.room_connector.bulkCreate(
          roomAccommodationArr.map((room_accommodation_id) => ({
            room_id,
            room_accommodation_id,
          })),
          { transaction: t }
        );
      } else if (room_accommodation.length > 0) {
        await db.room_connector.destroy(
          { where: { room_id, room_accommodation_id: null } },
          { transaction: t }
        );
      }

      console.log(roomAccommodationArr);

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: `Room with id ${room_id} has been updated`,
        data: room,
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  editRoomPicture: async (req, res) => {
    const { room_id } = req.body;
    console.log(req.body);
    const t = await sequelize.transaction();
    try {
      const room = await db.room.findOne({ where: { id: room_id } });

      if (!room) {
        return res.status(404).send({
          isError: true,
          message: `Room with id ${room_id} not found`,
          data: null,
        });
      }

      // Update room images
      if (req.files.PROPERTY) {
        const images = req.files.PROPERTY;

        // Delete existing room images
        await db.room_image.destroy(
          {
            where: {
              room_id,
            },
          },
          { transaction: t }
        );

        // Create new room images
        for (let i = 0; i < images.length; i++) {
          await db.room_image.create(
            {
              image_path: images[i].filename,
              room_id,
            },
            { transaction: t }
          );
        }
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Success Update Room Picture",
        data: null,
      });
    } catch (error) {
      await t.rollback();
      deleteFiles(req.files);
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getCity: async (req, res) => {
    try {
      const cities = await db.city.findAll({});

      return res.status(200).send({
        isError: false,
        message: "Get City Success",
        data: cities,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  deleteRoom: async (req, res) => {
    const { room_id } = req.body;
    const t = await sequelize.transaction();
    try {
      const room = await db.room.findOne(
        {
          where: {
            id: room_id,
          },
        },
        { transaction: t }
      );

      if (!room) {
        return res.status(404).send({
          isError: true,
          message: "Room not found",
          data: null,
        });
      }

      await db.room_image.destroy(
        {
          where: {
            room_id,
          },
        },
        { transaction: t }
      );

      await db.room.destroy(
        {
          where: {
            id: room_id,
          },
        },
        { transaction: t }
      );

      await t.commit()

      return res.status(200).send({
        isError: false,
        message: "Room deleted successfully",
        data: null,
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getTenantProperty: async (req, res) => {
    const { city_id, type_id, page = 1 } = req.body;
    const id = req.dataToken.id;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    console.log(req.body);

    try {
      const where = { tenant_id: id };
      let cityWhere = {};

      if (type_id) {
        where.type_id = type_id;
      }

      if (city_id) {
        cityWhere = { id: city_id };
      }

      const properties = await property.findAll({
        where,
        include: [
          { model: db.property_connector },
          { model: db.type },
          { model: db.location, include: { model: db.city, where: cityWhere } },
          { model: db.property_image },
          {
            model: db.room,
            include: [{ model: db.room_image }, { model: db.room_connector }],
          },
        ],
        offset,
        limit,
      });

      const total_count = await property.count({ where });
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get Tenant Property",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyConnector: async (req, res) => {
    const { property_id } = req.query;
    console.log(property_id);
    try {
      const connector = await db.property_connector.findAll({
        where: { property_id },
        include: { model: db.property_accommodation },
      });

      const propertyAccommodation = connector.map(
        (value) => value.property_accommodation
      );

      return res.status(200).send({
        isError: false,
        message: "Get data Success",
        data: propertyAccommodation,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getRoomConnector: async (req, res) => {
    const { room_id } = req.query;
    try {
      const connector = await db.room_connector.findAll({
        where: { room_id },
        include: { model: db.room_accommodation },
      });

      const roomAccommodation = connector.map(
        (value) => value.room_accommodation
      );

      return res.status(200).send({
        isError: false,
        message: "Get data Success",
        data: roomAccommodation,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  roomReview: async (req, res) => {
    const { room_id, rating, comment } = req.body;
    const users_id = req.dataToken.id;
    const t = await sequelize.transaction();
    try {
      const room = await db.transactions.findOne({
        where: { users_id, room_id },
      });
      if (!room) {
        return res.status(400).send({
          isError: true,
          message: "You have not rented this property",
          data: null,
        });
      }

      if(comment.length === 0){
        return res.status(400).send({
          isError: true,
          message: "Please fill the Comment",
          data: null
        })
      }

      if(rating === 0){
          return res.status(400).send({
            isError: true,
            message: "Please Give a Rating",
            data: null
          })
      }

      // const history = await db.transactions_history.findOne({
      //   where: { transactions_id: room.dataValues.id },
      // });

      const findRoom = await db.room.findOne({ where: { id: room_id } });

      // Add validation for checkout date
    if (!room.dataValues.check_out || room.dataValues.check_out > new Date()) {
      return res.status(400).send({
        isError: true,
        message: "You can only give a review after checkout",
        data: null,
      });
    }


      // Check transaction status
    if (room.dataValues.status_id !== 2) {
      return res.status(400).send({
        isError: true,
        message: "You can only give a review when the transaction has been paid",
        data: null,
      });
    }

    const check = await db.review.findOne({ where: { users_id, room_id } });
      if (check) {
        return res.status(400).send({
          isError: false,
          message: "You already gave review",
          data: null,
        });
      }


      // create Review
      const review = await db.review.create(
        {
          users_id,
          room_id,
          rating,
          review: comment,
          // transactions_history_id: history.dataValues.id,
        },
        { transaction: t }
      );

      const reviews = await db.review.findAll({ where: { room_id } });
      console.log(reviews);
      let totalRating = 0;
      if (reviews.length > 0) {
        reviews.forEach((review) => {
          totalRating += review.rating;
        });
        const avgRating = totalRating / reviews.length;
        findRoom.rating = avgRating;
      } else {
        findRoom.rating = rating;
      }
      await findRoom.save({ transaction: t });

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Create a Review Success",
        data: review,
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getRoomReview: async (req, res) => {
    const { room_id, page = 1 } = req.query;
    const page_size = 2;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const reviews = await db.review.findAll({
        where: { room_id },
        include: [
          { model: db.users, include: { model: db.users_details } },
        ],
        offset,
        limit,
      });

      const total_count = await db.review.count({ where: { room_id } });
      const total_pages = Math.ceil(total_count / page_size);
      console.log(total_count);
      return res.status(200).send({
        isError: false,
        message: "Get Room Review Success",
        data: reviews,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        error: error.message,
        data: null,
      });
    }
  },

  getType: async (req, res) => {
    const type = await db.type.findAll({});
    return res.status(200).send({
      isError: false,
      message: "Get City Success",
      data: type,
    });
  },

  getPropertyAccommodation: async (req, res) => {
    const propertyAcc = await db.property_accommodation.findAll({});
    return res.status(200).send({
      isError: false,
      message: "Get Property Accommodation Success",
      data: propertyAcc,
    });
  },

  getRoomAccommodation: async (req, res) => {
    const roomAcc = await db.room_accommodation.findAll({});
    return res.status(200).send({
      isError: false,
      message: "Get Room Accommodation Success",
      data: roomAcc,
    });
  },

  createSpecialPrice: async (req, res) => {
    const {
      name,
      start_date,
      end_date,
      room_id,
      status_id = 5,
      total_rooms = 0,
    } = req.body;
    const t = await sequelize.transaction();
    try {
      const discount = req.body.discount === '' ? 0 : parseInt(req.body.discount);
      const markup = req.body.markup === '' ? 0 : parseInt(req.body.markup)
      // check availability of rooms
      const room = await db.room.findOne({ where: { id: room_id } });
      if (!room) {
        throw new Error(`Room with id ${room_id} not found`);
      }
      if (room.dataValues.available_room < total_rooms) {
        throw new Error(
          `Only ${room.dataValues.available_room } rooms available for this event`
        );
      }

       // Check if the room is available during the specified time period
    const events = await db.event.findAll({
      where: {
        room_id,
        [Op.or]: [
          {
            start_date: {
              [Op.between]: [start_date, end_date],
            },
          },
          {
            end_date: {
              [Op.between]: [start_date, end_date],
            },
          },
          {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: start_date,
                },
              },
              {
                end_date: {
                  [Op.gte]: end_date,
                },
              },
            ],
          },
        ],
      },
    }, {transaction: t});

    let event;


    // If there are overlapping events, update the first one with the new details
    if (events.length > 0) {
      const rates = await db.event_rates.findOne({where: {id: events[0].dataValues.event_rates_id}})

      const eventRates = await db.event_rates.update(
        { discount, markup },
        {where: {id: rates.dataValues.id}},
        { transaction: t }
      );
      event = await db.event.update(
        {
          name,
          start_date,
          end_date,
          status_id,
          total_rooms,
        },
        {where: {id: events[0].dataValues.id}},
        {transaction: t}
      );

      return res.status(201).send({
        isError: false,
        message: `Special Prices updated`,
        data: { event, eventRates },
      });
    }
      // create the event_rates
      const eventRates = await db.event_rates.create(
        { discount, markup },
        { transaction: t }
      );

      console.log(eventRates)

      // create the event with the event_rates_id
      event = await db.event.create(
        {
          name,
          room_id,
          start_date,
          end_date,
          event_rates_id: eventRates.id,
          status_id,
          total_rooms,
        },
        { transaction: t }
      );

      // Update the room's available rooms count and event rates ID
      room.dataValues.available_room -= total_rooms;
      room.event_rates_id = eventRates.dataValues.id;
      await room.save({ transaction: t });
    

      await t.commit();
      return res.status(201).send({
        isError: false,
        message: `Special Prices created`,
        data: { event, eventRates },
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  reviewBookingCheck: async(req, res) => {
    const {room_id} = req.body
    const id = req.dataToken.id
    const status_id = 2
    
    const booking = await db.transactions.findAll({where: {users_id: id, room_id, status_id}})

    if(booking.length === 0){
      return res.status(400).send({
        isError: false,
        message: "No Transactions been made"
      })
    }

    return res.status(200).send({
      isError: false,
      message: "Checked",
      data: booking
    })
  },

  suggestionByLocation: async(req, res) => {
    const {city} = req.query;

    try {
      const location = await db.location.findAll({
        where: {city_id : city},
        include: [
          {model: db.property,
          include: [
            {model: db.property_image},
            {model: db.room, include: [{model: db.room_image}]}
          ]}
        ],
      })

      return res.status(200).send({
        isError: false,
        message: "Gey Suggestion By Location Success",
        data: location,
      })
    } catch (error) {
      return res.status(400).json({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  }

};
