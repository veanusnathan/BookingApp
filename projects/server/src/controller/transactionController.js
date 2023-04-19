const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models");
const transactions = db.transactions;
const { Op } = require("sequelize");
const moment = require("moment");
const path = require("path");

// Import transporter formhandling email
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");

const fs = require("fs").promises;

module.exports = {
  transaction: async (req, res) => {
    const t = await sequelize.transaction();
    const { check_in, check_out, total_guest, room_id, price } = req.body;
    const id = req.dataToken.id;

    try {
      const user = await db.users.findOne({
        where: { id }
      }, { transaction: t });

      if (user.dataValues.status === "unconfirmed") {
        throw {message: "Your Account is Not Active"}
        // return res.status(400).send({
        //   isError: true,
        //   message: "Your Account is Not Active",
        //   data: null,
        // });
      }

      const room = await db.room.findByPk(
        room_id,
        {
          include: { model: db.property, include: db.location },
        },
        { transaction: t }
      );

      if (!room) {
        throw {message: "Room Not Found"}
        // return res.status(404).send({
        //   isError: true,
        //   message: "Room Not Found",
        //   data: null,
        // });
      }

      const blockedDates = await db.room_blocked_dates.findAll({
        where: {
          room_id,
          start_blocked_date: { [Op.lte]: check_out },
          end_blocked_date: { [Op.gte]: check_in },
        },
      }, {transaction: t});

      if (blockedDates.length > 0) {
        throw { message: `Tenant blocked for this room, reason: ${blockedDates[0].dataValues.reason}` }
        // return res.status(400).send({
        //   isError: true,
        //   message: `Tenant blocked for this room, reason: ${blockedDates[0].dataValues.reason}`,
        //   data: null,
        // });
      }

      const bookings = await transactions.findAll(
        {
          where: {
            room_id: room.id,
            check_in: { [Op.lt]: check_out },
            check_out: { [Op.gt]: check_in },
          },
        },
        { transaction: t }
      );

      let bookedRooms = bookings.length;
      const availableRooms = room.dataValues.available_room;
      const remainingRoom = availableRooms - bookedRooms;

      if (remainingRoom <= 0) {
        throw {message: "No rooms available for the selected dates"}
        // return res.status(400).send({
        //   isError: true,
        //   message: "No rooms available for the selected dates",
        //   data: null,
        // });
      }

      const maxGuest = 2;
      const numberOfTransactions = Math.ceil(total_guest / maxGuest);
      let transactionData = [];

      for (let i = 0; i < numberOfTransactions; i++) {
        const guestTransactions = Math.min(
          total_guest - i * maxGuest,
          maxGuest
        );

        const transaction = await transactions.findAll(
          {
            where: {
              room_id: room.id,
              check_in: { [Op.lt]: check_out },
              check_out: { [Op.gt]: check_in },
            },
          },
          { transaction: t }
        );

        if (bookedRooms >= availableRooms) {
          throw {message: "Another booking already exists for the selected dates"}
          // return res.status(404).send({
          //   isError: true,
          //   message: "Another booking already exists for the selected dates",
          //   data: null,
          // });
        }

        if (numberOfTransactions > availableRooms) {
          throw {message: "Max guest is exceeded"}
          // return res.status(404).send({
          //   isError: true,
          //   message: "Max guest is exceeded",
          //   data: null,
          // });
        }

        const order_id =
          moment().format("YYYYMMDDHH") + Math.floor(Math.random() * 10000);

        // const price =
        //   moment(check_out).diff(moment(check_in), "days") *
        //   room.dataValues.price;

        const _transaction = await transactions.create(
          {
            users_id: id,
            room_id,
            check_in,
            check_out,
            total_guest: guestTransactions,
            total_price: price,
            status_id: 4,
            order_id: order_id,
            expired: moment().add(2, "hours").toDate(),
          },
          { transaction: t }
        );

        transactionData.push(_transaction);

        await db.transactions_history.create(
          {
            transactions_id: _transaction.id,
          },
          { transaction: t }
        );

        const isTransactionExpired = (_transaction) => {
          const expiredTime = new Date(_transaction.expired).getTime();
          const currentTime = new Date().getTime();
          return expiredTime < currentTime;
        };
        const isExpired = await isTransactionExpired(_transaction);

        transactionData.push({
          transaction: _transaction,
          isExpired,
        });
        bookedRooms++;
      }

      await t.commit();
      if (transactionData.length > 0) {
        return res.status(200).json({
          isError: false,
          message: "Booked Room success, waiting for payment",
          data: transactionData,
        });
      }
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: error,
      });
    }
  },

  event: async (req, res) => {
    const { room_id } = req.query;

    try {
      const event = await db.event.findAll({
        where: { room_id },
        include: {
          model: db.event_rates,
        },
      });
      if (!event) {
        return res.status(400).send({
          isError: true,
          message: "There is No event available for now",
          data: null,
        });
      }

      return res.status(200).send({
        isError: false,
        message: "Get Event",
        data: event,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  dataTransaction: async (req, res) => {
    try {
      const { room_id, order_id1, order_id2 } = req.body;
      const final_order2 = order_id2 || null;
      const id = req.dataToken.id;
      const transaction = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [
          {
            model: db.room,
            where: { id: room_id },
            include: [{ model: db.room_image }, { model: db.property }],
          },
          {
            model: db.users,
            where: { id: id },
          },
        ],
      });

      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  tenantDataTransaction: async (req, res) => {
    try {
      const { users_id, room_id, order_id1, order_id2 } = req.body;
      const final_order2 = order_id2 || null;
      const id = users_id;
      const transaction = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [
          {
            model: db.room,
            where: { id: room_id },
            include: [{ model: db.room_image }, { model: db.property }],
          },
          {
            model: db.users,
            where: { id: id },
          },
        ],
      });

      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  paymentProof: async (req, res) => {
    const { room_id, order_id1, order_id2 } = req.body;
    const final_order2 = order_id2 || null;
    const t = await sequelize.transaction();
    try {
      const data = await transactions.findAll(
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );
      await transactions.update(
        {
          image_path: `Public/images/${req.files.images[0].filename}`,
          status_id: 7,
        },
        {
          where: {
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Upload success, waiting for tenant approval",
        data: data,
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

  orderList: async (req, res) => {
    const id = req.dataToken.id;
    const {
      page = 1,
      status_id,
      start_date,
      end_date,
      order_id,
      sort_by = "order_id",
    } = req.query;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const where = { users_id: id };
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }
      if (status_id) {
        where.status_id = status_id;
      }
      if (order_id) {
        where.order_id = order_id;
      }

      // order clause by sort params
      let order = [["order_id", "DESC"]];
      if (sort_by === "start_Date") {
        order = [["createdAt", "ASC"]];
      } else if (sort_by === "end_date") {
        order = [["createdAt", "DESC"]];
      }

      const transaction = await transactions.findAll({
        where,
        include: [
          {
            model: db.users,
            include: { model: db.users_details },
          },
          {
            model: db.room,
            include: [
              { model: db.room_image },
              { model: db.property, include: { model: db.property_image } },
            ],
          },
        ],
        offset,
        limit,
        order,
      });

      const total_count = await transactions.count({ where });
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get Order List By Status",
        data: transaction,
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

  cancelOrder: async (req, res) => {
    const { room_id, order_id1, order_id2 } = req.body;
    const final_order2 = order_id2 || null;
    const t = await sequelize.transaction();
    try {
      const data = await transactions.findAll(
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      await transactions.update(
        { status_id: 3 },
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Cancel Order Success",
        data: data,
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

  allOrderList: async (req, res) => {
    const id = req.dataToken.id;
    const page = 1;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const transaction = await transactions.findAll({
        where: { users_id: id },
        include: {
          model: db.room,
          include: [
            { model: db.room_image },
            { model: db.property, include: { model: db.property_image } },
          ],
        },
        offset,
        limit,
      });

      const total_count = await transactions.count({
        where: { users_id: id },
      });
      return res.status(200).send({
        isError: false,
        message: "Get all Order List",
        data: transaction,
        count: total_count,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getAllStatus: async (req, res) => {
    try {
      const status = await db.status.findAll({
        where: { id: [2, 3, 4, 7, 8] },
      });

      return res.status(200).send({
        isError: false,
        message: "Get Status",
        data: status,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getOrderListFilter: async (req, res) => {
    const id = req.dataToken.id;
    const {
      start_date,
      end_date,
      status_id,
      order_id,
      sort_by = "order_id",
      page = 1,
    } = req.query;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      // define where clause for the filters
      const where = { users_id: id };
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }
      if (status_id) {
        where.status_id = status_id;
      }
      if (order_id) {
        where.order_id = order_id;
      }

      // order clause by sort params
      let order = [["order_id", "DESC"]];
      if (sort_by === "start_Date") {
        order = [["createdAt", "ASC"]];
      } else if (sort_by === "end_date") {
        order = [["createdAt", "DESC"]];
      }

      const transaction = await transactions.findAll({
        where,
        include: [
          {
            model: db.users,
            include: { model: db.users_details },
          },
          {
            model: db.room,
            include: [
              { model: db.room_image },
              { model: db.property, include: { model: db.property_image } },
            ],
          },
        ],
        offset,
        limit,
        order,
      });

      const total_count = await transactions.count({ where });

      return res.status(200).send({
        isError: false,
        message: "Get all Order List",
        data: transaction,
        count: total_count,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  tenantOrderList: async (req, res) => {
    const id = req.dataToken.id;
    const { page = 1, status_id, start_date, end_date } = req.body;
    console.log(req.body);
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      // because the transactions doest record the tenant id, we should track the tenant id based on their relations

      const where = {};
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }
      if (status_id) {
        where.status_id = status_id;
      }

      // first get the property which it available in transactions db
      const properties = await db.property.findAll({
        where: { tenant_id: id },
        include: [
          {
            model: db.room,
            include: [
              { model: db.property },
              { model: db.room_image },
              {
                model: transactions,
                where: where,
                include: [
                  {
                    model: db.users,
                    include: { model: db.users_details },
                  },
                ],
              },
            ],
          },
        ],
        order: [
          [{ model: db.room }, { model: transactions }, "check_in", "DESC"],
        ],
      });

      // initialize an empty array to hold the transactions
      let transaction = [];

      properties.forEach((property) => {
        if (property.rooms) {
          property.rooms.forEach((room) => {
            if (room.transactions) {
              transaction = transaction.concat(
                room.transactions.map((transaction) => {
                  return {
                    property: property.dataValues,
                    room: room.dataValues,
                    transaction: transaction.dataValues,
                  };
                })
              );
            }
          });
        }
      });

      const total_data = transaction.length;
      const total_pages = Math.ceil(total_data / page_size);

      transaction = transaction.slice(offset, offset + limit);

      return res.status(200).send({
        isError: false,
        message: "Get Tenant Order List By Status",
        data: transaction,
        total_data: total_data,
        total_pages: total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  acceptRejectOrder: async (req, res) => {
    const { users_id, room_id, order_id1, order_id2, respond, daysCheck } = req.body;
    const final_order2 = order_id2 || null;
    const id = users_id;
    console.log(req.body);
    const t = await sequelize.transaction();
    try {
      const transaction = await transactions.findOne({
        where: {
          room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [{ model: db.users, where: { id } }],
      });

      const room = await db.room.findOne({
        where: { id: transaction.dataValues.id },
        include: { model: db.property },
      });
      const name = room.dataValues.name;
      const desc = room.dataValues.description;
      const price = room.dataValues.price.toLocaleString();
      const address = room.dataValues.property.dataValues.address;
      const propertyName = room.dataValues.property.dataValues.name;
      const order = transaction.dataValues.order_id;
      const totalPrice = transaction.dataValues.total_price.toLocaleString();
      const guest = transaction.dataValues.total_guest;
      const check_in = new Date (transaction.dataValues.check_in);
      const newCheckIn = check_in.toDateString()
      const check_out = new Date (transaction.dataValues.check_out);
      const newCheckOut = check_out.toDateString()


      if (respond === "Accept") {
        await transactions.update(
          { status_id: 2 },
          {
            where: {
              room_id,
              [Op.or]: [
                { order_id: order_id1 },
                { order_id: { [Op.eq]: final_order2 } },
              ],
            },
          },
          { transaction: t }
        );

        const user = await db.users.findOne({ where: { id } });
        const email = user.dataValues.email;

        await db.transactions_history.update(
          { status_id: 2 },
          { where: { transactions_id: transaction.dataValues.id } },
          { transaction: t }
        );

        const template = await fs.readFile(path.resolve(__dirname, '../template/rules.html'), 'utf-8')

        const templateCompile = await handlebars.compile(template);
        const newTemplate = templateCompile({
          name,
          desc,
          price,
          address,
          order,
          totalPrice,
          guest,
          newCheckIn,
          newCheckOut,
          propertyName,
          daysCheck
        });

        await transporter.sendMail({
          from: "Vcation",
          to: email,
          subject: "Rules and Room Details",
          html: newTemplate,
        });

        return res.status(200).send({
          isError: false,
          message: "Payment Accepted",
          data: transaction,
        });
      }

      if (respond === "Reject") {
        await transactions.update(
          { status_id: 8 },
          {
            where: {
              room_id,
              [Op.or]: [
                { order_id: order_id1 },
                { order_id: { [Op.eq]: final_order2 } },
              ],
            },
          },
          { transaction: t }
        );

        await db.transactions_history.update(
          { status_id: 8 },
          { where: { transactions_id: transaction.dataValues.id } },
          { transaction: t }
        );

        return res.status(200).send({
          isError: false,
          message: "Sorry, Payment Rejected",
          data: transaction,
        });
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
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

  salesReport: async (req, res) => {
    const { status_id = 2, page = 1, sort = "desc" } = req.body;
    const id = req.dataToken.id;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const properties = await db.property.findAll({
        where: { tenant_id: id },
        include: [
          {
            model: db.room,
            include: [
              { model: db.property, include: { model: db.property_image } },
              { model: db.room_image },
              {
                model: transactions,
                where: { status_id },
                include: {
                  model: db.users,
                  include: { model: db.users_details },
                },
              },
            ],
          },
        ],
      });

      let transaction = [];

      properties.forEach((property) => {
        if (property.rooms) {
          property.rooms.forEach((room) => {
            if (room.transactions) {
              transaction = transaction.concat(
                room.transactions.map((transaction) => {
                  return {
                    property: property.dataValues,
                    room: room.dataValues,
                    transaction: transaction.dataValues,
                  };
                })
              );
            }
          });
        }
      });

      if (sort === "asc") {
        transaction.sort(
          (a, b) => a.transaction.total_price - b.transaction.total_price
        );
      } else {
        transaction.sort(
          (a, b) => b.transaction.total_price - a.transaction.total_price
        );
      }

      transaction = transaction
        .slice(offset, offset + limit)
        .reduce((acc, curr) => {
          // Find existing entry in the accumulator that matches the current property and room
          const existingEntry = acc.find(
            (entry) =>
              entry.property.id === curr.property.id &&
              entry.room.id === curr.room.id
          );

          // If an existing entry is found, update its revenue and booking count
          if (existingEntry) {
            existingEntry.revenue += curr.transaction.total_price;
            existingEntry.bookings_count += 1;
          }
          // Otherwise, create a new entry with the current property, room, and transaction info
          else {
            const newEntry = {
              property: curr.property,
              room: curr.room,
              revenue: curr.transaction.total_price,
              bookings_count: 1,
            };
            acc.push(newEntry);
          }

          return acc;
        }, []);

      const total_data = transaction.length;
      const total_pages = Math.ceil(total_data / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get Sales Report success",
        data: transaction,
        total_data: total_data,
        total_pages: total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  salesReportByRoom: async (req, res) => {
    const {
      status_id = 2,
      page = 1,
      start_date,
      end_date,
      room_id,
      sort,
    } = req.body;
    console.log(req.body);
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const where = { room_id, status_id };
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }

      let sortOrder = [["total_price", sort]];
      if (sort === "asc") {
        sortOrder = [["total_price", "asc"]];
      } else {
        sortOrder = [["total_price", "desc"]];
      }

      const report = await transactions.findAll({
        where,
        include: [
          { model: db.room, include: { model: db.room_image } },
          { model: db.users, include: { model: db.users_details } },
        ],
        order: sortOrder,
        offset,
        limit,
      });

      const total_data = report.length;
      const total_pages = Math.ceil(total_data / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get Sales Report success",
        data: report,
        total_data: total_data,
        total_pages: total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  blockedDate: async (req, res) => {
    const { room_id, start_date, end_date, reason } = req.body;
    const t = await sequelize.transaction();
    console.log(req.body);
    try {
      // Check if the specified room exists
      const room = await db.room.findOne({ where: { id: room_id } });
      if (!room) {
        return res.status(400).send({
          isError: true,
          message: "Room not found",
          data: null,
        });
      }

      // Check if the specified date range is valid
      if (!start_date || !end_date || start_date >= end_date) {
        return res.status(400).send({
          isError: true,
          message: "Invalid date range",
          data: null,
        });
      }

      // Check if there is an existing blocked date for the specified room and date range
      const existingBlockedDate = await db.room_blocked_dates.findOne(
        {
          where: {
            room_id,
            start_blocked_date: { [Op.lte]: end_date },
            end_blocked_date: { [Op.gte]: start_date },
          },
        },
        { transaction: t }
      );
      if (existingBlockedDate) {
        return res.status(400).send({
          isError: true,
          message:
            "The specified date range has already been blocked for this room",
          data: null,
        });
      }

      // Create a new blocked date entry
      const newBlockedDate = await db.room_blocked_dates.create(
        {
          room_id,
          start_blocked_date: start_date,
          end_blocked_date: end_date,
          reason,
        },
        { transaction: t }
      );

      await t.commit();

      return res.status(200).send({
        isError: false,
        message: "Blocked date added successfully",
        data: newBlockedDate,
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

  getBlockedDate: async (req, res) => {
    const { room_id } = req.query;

    const blocked = await db.room_blocked_dates.findAll({ where: { room_id } });
    return res.status(200).send({
      isError: false,
      message: "Get Data Success",
      data: blocked,
    });
  },

  deleteBlockedDate: async (req, res) => {
    const { start_date, end_date, room_id } = req.body;
    console.log(req.body);

    const date = await db.room_blocked_dates.findOne({
      where: {
        start_blocked_date: start_date,
        end_blocked_date: end_date,
        room_id,
      },
    });

    if (!date) {
      return res.status(400).send({
        isError: true,
        message: "There is no date Blocked!",
        data: null,
      });
    }

    await db.room_blocked_dates.destroy({
      where: { id: date.dataValues.id },
    });

    return res.status(200).send({
      isError: false,
      message: "Delete date Success",
      data: null,
    });
  },

  paidOrderList: async (req, res) => {
    const id = req.dataToken.id;
    const page = 1;
    const status_id = 2;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const paid = await transactions.findAll({
        where: { users_id: id, status_id },
        include: [
          {
            model: db.users,
            include: { model: db.users_details },
          },
          {
            model: db.room,
            include: [
              { model: db.room_image },
              { model: db.property, include: { model: db.property_image } },
            ],
          },
        ],
        offset,
        limit,
        order: [["check_in", "DESC"]],
      });

      return res.status(200).send({
        isError: false,
        message: "Get Tenant Order List By Status",
        data: paid,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },
};
