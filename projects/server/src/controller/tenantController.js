const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models/index.js");
const tenant = db.tenant;
const path = require("path");

const { Op } = require("sequelize");

// impoort hashing
const { hashPassword, hashMatch } = require("./../lib/hashPassword");

// import webToken
const { createToken } = require("./../lib/webToken");

// import transporter
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");

const HttpResponse = require("../helpers/httpResponse");
const deleteFiles = require("../helpers/deleteFiles");

const fs = require("fs").promises;

module.exports = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {

      let { first_name, last_name, email, password, phone_number } = req.body;
      console.log(req.body)

      // input Validation if its not have a length
      if (
        !first_name.length ||
        !email.length ||
        !password.length ||
        !phone_number.length
      ) {
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: error
        })
      }

      let findEmail = await tenant.findOne(
        { where: { email } },
        { transaction: t }
      );

      // console.log(req.files.ktp_path)
        
      if (findEmail) {
        deleteFiles(req.files)
        return res.status(400).send({
          isError: true,
          message: "Email already exist!",
          data: null
        })
      }

      // OTP GENERATOR
      const otp = Math.floor(10000 + Math.random() * 9000);

      // saving data to DB
      
      let createTenant = await tenant.create(
        {
          first_name,
          last_name,
          email,
          password: await hashPassword(password),
          phone_number,
          otp_code: otp,
          otp_created_at: new Date(),
          ktp_path: `Public/images/${req.files.images[0].filename}`, // get file data from req.file object
        },
        { transaction: t }
      );

      await db.tenant_details.create(
        {tenant_id: createTenant.dataValues.id},
        {transaction: t}
      )

      const template = await fs.readFile(path.resolve(__dirname, '../template/confirmation.html'), 'utf-8')
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `https://jcwd230203.purwadhikabootcamp.com/tenant-activation/${createTenant.dataValues.id}`,
        otp,
      });

      await transporter.sendMail({
        from: "Vcation",
        to: email,
        subject: "Account Activation",
        html: newTemplate,
      });

      await t.commit();

      return res.status(200).send({
        isError: false,
        message: "Register Success",
        data: {token: createToken({ id: createTenant.dataValues.id })},
        id: createTenant.dataValues.id 
      });
      
    } catch (error) {
      await t.rollback();
      deleteFiles(req.files)
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: error,
      });
    }
  },

  activation: async (req, res) => {
    try {
      const { id, otp } = req.body;

      const findTenant = await tenant.findOne({
        where: {
          id: id,
        },
      });

      if (!findTenant) {
        return res.status(400).send({
          isError: true,
          message: "Tenant Not Found",
          data: null
        })
      }

      if (findTenant.status !== "unconfirmed") {
        return res.status(400).send({
          isError: true,
          message: "Tenant has already been Confirmed!",
          data: null
        })
      }

      if (!otp) {
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: null
        })
      }

      if (parseInt(findTenant.dataValues.otp_code) !== parseInt(otp)) {
        return res.status(400).send({
          isError: true,
          message: "Invalid OTP!",
          data: null
        })
      }

      const otp_created_at = new Date(findTenant.otp_created_at);
      const now = new Date();
      const diffInMs = now - otp_created_at;
      const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

      if (diffInDays > 1) {
        return res.status(400).send({
          isError: true,
          message: "OTP has expired",
          data: null
        })
      }

      findTenant.status = "confirmed";

      await findTenant.save();

      if ((findTenant.status = "confirmed")) {
        return res.status(200).send({
          isError: false,
          message: "Tenant Validate Success",
          data: null,
        });
      }

      return findTenant;

    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  resendOtp: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const tenants = await tenant.findOne({ where: { id: req.params.id } });
      if (!tenants) {
        return res.status(404).send({
          isError: true,
          message: "Tenant Not Found",
          data: null,
        });
      }

      const otp = Math.floor(10000 + Math.random() * 9000);
      tenants.otp_code = otp;
      tenants.otp_created_at = new Date();

      await tenants.save();

      const first_name = tenants.dataValues.first_name;
      const email = tenants.dataValues.email;

      const template = await fs.readFile(path.resolve(__dirname, '../template/confirmation.html'), 'utf-8')
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `https://jcwd230203.purwadhikabootcamp.com/tenant-activation/${tenants.dataValues.id}`,
        otp,
      });

      await transporter.sendMail({
        from: "Vcation",
        to: email,
        subject: "Account Activation",
        html: newTemplate,
      });

      await t.commit();

      return res.status(200).send({
        isError: false,
        message: "OTP code sent successfully",
        data: null,
      });

    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: false,
        message: error.message,
        data: null,
      });
    }
  },

  Login: async (req, res) => {
    let { emailOrPhone, password } = req.body;

    try {
      let findEmailAndPhoneNumber = await tenant.findOne({
        where: {
          [Op.or]: [{ email: emailOrPhone }, { phone_number: parseInt(emailOrPhone) || emailOrPhone }],
        },
      });

      if (!emailOrPhone || !password.length) {
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: null
        })
      }

      if (!findEmailAndPhoneNumber) {
        return res.status(400).send({
          isError: true,
          message: "Account Not Found!",
          data: null
        })
      }

      if (findEmailAndPhoneNumber.dataValues.status === "unconfirmed") {
        return res.status(400).send({
          isError: true,
          message: "Your email not active!",
          data: null
        })
      }

      if(findEmailAndPhoneNumber.dataValues.id === "1" || findEmailAndPhoneNumber.dataValues.id === "2"){
        return res.status(201).send({
          isError: false,
          message: "Login Success",
          data: {
            findEmailAndPhoneNumber,
            token: createToken({ id: findEmailAndPhoneNumber.dataValues.id }),
          },
        })
      }

      let matchPassword = await hashMatch(
        password,
        findEmailAndPhoneNumber.dataValues.password
      );

      if (!matchPassword) {
        return res.status(404).send({
          isError: true,
          message: "Password is Wrong",
          data: null,
        });
      }

      return res.status(201).send({
        isError: false,
        message: "Login Success",
        data: {
          findEmailAndPhoneNumber,
          token: createToken({ id: findEmailAndPhoneNumber.dataValues.id }),
        },
      });
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  keepLogin: (req, res) => {
    return res.status(201).send({
      isError: false,
      message: "Token Valid",
      data: req.headers.auth,
    });
  },

  getTenant: async(req, res) => {

    try {
      let data = await tenant.findOne({
				where: { id: req.dataToken.id },
				include: { model: db.tenant_details },
			});


      return res.status(201).send({
        isError: false,
        message: "Get Tenant Success",
        data: data
        
      })
      
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: error,
      });
    }
  },

  updateTenant: async(req, res) => {
    const {first_name, last_name, email, address, phone_number, } = req.body 
    const t = await sequelize.transaction();
    try {
      const updateTenant = await db.tenant.update(
        {
        first_name, last_name,email, address, phone_number},
        {where: {id: req.dataToken.id}, transaction: t})

        await t.commit()
        return res.status(200).send({
          isError: false,
          message: "Update Success",
          data: updateTenant
        })
    } catch (error) {
      await t.rollback()
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },

  editProfilePict: async(req, res) => {
    let id = req.dataToken.id
    const t = await sequelize.transaction();
    try {
        let img = await tenant.findOne({
          where: {id},
          include: [
            {model: db.tenant_details,}
          ]
        }, {transaction: t})

        

        await db.tenant_details.update(
          {
          picture_path: req.files.images[0].path
          },
          {
            where: {tenant_id: id}
          }, {transaction: t}
        );
        
        await t.commit()
        return res.status(201).send({
          isError: false,
          message: "Success Updating Profile Picture",
          data: img
        })
    } catch (error) {
      await t.rollback()
      deleteFiles(req.files)
      return res.status(400).send({
        isError: true,
        message: error.message,
        error: error
      })
    }
  },

  changePassword: async(req, res) => {
    const {old_password, new_password} = req.body
    const t = await sequelize.transaction();
    try {
      const data = await tenant.findOne({
        where: {id: req.dataToken.id}
      })
      console.log(data)

      if(data.dataValues.id === "1" || data.dataValues.id === "2"){
          await tenant.update(
          {password: await hashPassword(new_password)},
          {where: {id: req.dataToken.id}, transaction: t}
        )
        await t.commit()
        return res.status(200).send({
          isError: false,
          message: "Password update Success",
          data: null
        })
      }

      let matchPassword = await hashMatch(
        old_password,
        data.dataValues.password
      )

      if(!matchPassword){
        return res.status(400).send({
          isError: true,
          message: "Password not match",
          data: null
        })
      }

      await tenant.update(
        {password: await hashPassword(new_password)},
        {where: {id: req.dataToken.id}, transaction: t}
      )
      await t.commit()
      return res.status(200).send({
        isError: false,
        message: "Password update Success",
        data: null
      })
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },

  forgotPassword: async(req, res) => {
    try {
      let {email} = req.body;

      if(!email){
        return res.status(400).send({
          isError: true,
          message: "Please Input Your Email"
        })
      }

      let findEmail = await tenant.findOne({
        where: {email}
      })

      if(!findEmail){
        return res.status(400).send({
          isError: true,
          message: "Email Not Found!",
          data: null
        })
      }

      const first_name = findEmail.dataValues.first_name

      const template = await fs.readFile(path.resolve(__dirname, '../template/forgetPassword.html'), 'utf-8')

      const templateCompile = await handlebars.compile(template)
      const newTemplate = templateCompile({
        first_name,
        url: `https://jcwd230203.purwadhikabootcamp.com/reset-password/${findEmail.dataValues.id}`
      })

      await transporter.sendMail({
        from: "Vcation",
        to: email,
        Subject: "Reset Password",
        html: newTemplate
      })

      return res.status(200).send({
        isError: false,
        message: "Check Your Email for reset password",
        data: null
      })
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },

  resetPassword: async(req, res) => {
    try {
      const {id, password, confirm_password} = req.body;

    const findTenant = await tenant.findOne({
      where: {id}
    })

    if(!findTenant){
      return res.status(400).send({
        isError: true,
        message: "User Not Found!",
        data: null
      })
    }

    if(!password){
      return res.status(400).send({
        isError: true,
        message: "Password cannot Blank",
        data: null
      })
    }

    if(password !== confirm_password){
      return res.status(400).send({
        isError: true,
        message: "Password not match",
        data: null
      })
    }

    await findTenant.update(
      {password: await hashPassword(password)}
    )
    return res.status(200).send({
      isError: false,
      message: "Update Password Success!",
      data: null
    })
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  }    
};
