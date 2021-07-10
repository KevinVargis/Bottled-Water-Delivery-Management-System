const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const companyRegisterInput = require("../../validation/register_company");
const supervisorRegisterInput = require("../../validation/register_supervisor");
const managerRegisterInput = require("../../validation/register_manager");

const boyRegisterInput = require("../../validation/register_boy");
const driverRegisterInput = require("../../validation/register_driver");
const validateLoginInput = require("../../validation/login");

const Company = require("../../models/Company");
const Manager = require("../../models/Manager")
const Boy = require("../../models/Boy")
const Driver = require("../../models/Driver")
const Supervisor = require("../../models/Supervisor")
const Kharidaar = require("../../models/Kharidaar")
const User = require("../../models/User")

router.post("/Companyregister", (req, res) => {
  const { errors, isValid } = companyRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Company.findOne({ email: req.body.email }).then(company => {
    if (company) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
      const newcompany = new Company({
        name: req.body.name,
        email: req.body.email,
        line1: req.body.line1,
        line2: req.body.line2,
        line3: req.body.line3,
        pincode: parseInt(req.body.pincode),
        GSTNo: req.body.GSTNo,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newcompany.password, salt, (err, hash) => {
          if (err)
            throw err;
          newcompany.password = hash;
          newcompany
            .save()
            .then(company => res.json(company))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/Companylogin", (req, res) => { 
  // login for all the users
  // Form validation
  // console.log(req.body)
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const aadharnum = req.body.aadharnum

  // Find company by email
  Company.findOne({ email }).then(company => {
    // Check if company exists
    if (!company) {
      User.findOne({ $or: [{ email }, { aadharnum }] }).then(user => {
        if (!user) {
          // console.log("Fuck")
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
        if (user.type == 'M') {
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user._id,
                name: user.name,
                type: user.type,
                companyid: user.companyid

              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 86400
                },
                (err, token) => {
                  return res.json({
                    success: true,
                    token: "Bearer" + token,
                    type: user.type,
                    pl: payload
                  });
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });

            }
          })
        }
        else {
          var testData;
          if (user.type == 'S') {
            testData = Supervisor;
          }
          else if (user.type == 'K') {
            testData = Kharidaar;
          }
          else if (user.type == 'D') {
            testData = Driver;
          }
          else {
            testData = Boy;
          }
          if (user.type == 'S' || user.type == 'K') {
            testData.findOne({ email: user.email }).then(testUser => {
              if (user.type == 'K') {
                if (testUser.requested === 1) {
                  if (testUser.deliverydate < new Date()) {
                    testUser.requested = 0
                    testUser.deliverydate = new Date(new Date().getTime() + (10 * 1000 * 60 * 60 * 24))
                  }
                }
                else {
                  testUser.deliverydate = new Date(new Date().getTime() + (10 * 1000 * 60 * 60 * 24))
                }
                newkh = new Kharidaar(testUser)
                Kharidaar.findByIdAndUpdate(newkh._id, newkh, { new: true }, function (err, newkh) {
                  if (err) {
                    console.log("gadbad ho gaya")
                    return
                  }
                  else {
                    bcrypt.compare(password, user.password).then(isMatch => {
                      if (isMatch) {
                        const payload = {
                          id: user._id,
                          name: user.name,
                          type: user.type,
                          companyid: user.companyid,
                          managerid: testUser.managerid,
                          active: ((user.type == 'K') ? testUser.active : ''),
                          requested: ((user.type == 'K') ? testUser.requested : ''),
                          day: ((user.type == 'K') ? testUser.day : ''),
                          cansrequired: ((user.type == 'K') ? testUser.cansrequired : ''),
                          subscansrequired: ((user.type == 'K') ? testUser.subscansrequired : ''),
                          email: user.email,
                          deliverydate : testUser.deliverydate
                        };

                        jwt.sign(
                          payload,
                          keys.secretOrKey,
                          {
                            expiresIn: 86400
                          },
                          (err, token) => {
                            return res.json({
                              success: true,
                              token: "Bearer" + token,
                              type: user.type,
                              pl: payload
                            });
                          }
                        );
                      } else {
                        return res
                          .status(400)
                          .json({ passwordincorrect: "Password incorrect" });
                      }
                    })
                  }
                })
              }
              else{
                bcrypt.compare(password, user.password).then(isMatch => {
                  if (isMatch) {
                    const payload = {
                      id: user._id,
                      name: user.name,
                      type: user.type,
                      companyid: user.companyid,
                      managerid: testUser.managerid,
                      active: ((user.type == 'K') ? testUser.active : ''),
                      requested: ((user.type == 'K') ? testUser.requested : ''),
                      day: ((user.type == 'K') ? testUser.day : ''),
                      cansrequired: ((user.type == 'K') ? testUser.cansrequired : ''),
                      subscansrequired: ((user.type == 'K') ? testUser.subscansrequired : ''),
                      email: user.email
                    };

                    jwt.sign(
                      payload,
                      keys.secretOrKey,
                      {
                        expiresIn: 86400
                      },
                      (err, token) => {
                        return res.json({
                          success: true,
                          token: "Bearer" + token,
                          type: user.type,
                          pl: payload
                        });
                      }
                    );
                  } else {
                    return res
                      .status(400)
                      .json({ passwordincorrect: "Password incorrect" });
                  }
                })
              }
            })
          }
          else {
            testData.findOne({ aadharnum: user.aadharnum }).then(testUser => {
              bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                  const payload = {
                    id: user._id,
                    name: user.name,
                    type: user.type,
                    companyid: user.companyid,
                    managerid: testUser.managerid,
                    aadharnum: user.aadharnum
                  };
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 86400
                    },
                    (err, token) => {
                      return res.json({
                        success: true,
                        token: "Bearer" + token,
                        type: user.type,
                        pl: payload
                      });
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });

                }
              })
            })
          }

        }
        // bcrypt.compare(password, user.password).then(isMatch => {
        //   if (isMatch) {
        //     const payload = {
        //       id: user._id,
        //       name: user.name,
        //       type: user.type,
        //       companyid: user.companyid

        //     };
        //     jwt.sign(
        //       payload,
        //       keys.secretOrKey,
        //       {
        //         expiresIn: 86400
        //       },
        //       (err, token) => {
        //         return res.json({
        //           success: true,
        //           token: "Bearer" + token,
        //           type: user.type,
        //           pl: payload
        //         });
        //       }
        //     );
        //   } else {
        //     return res
        //       .status(400)
        //       .json({ passwordincorrect: "Password incorrect" });

        //   }
        // })
      })
    }
    else {
      bcrypt.compare(password, company.password).then(isMatch => {
        if (isMatch) {
          // company matched
          // Create JWT Payload
          const payload = {
            id: company._id,
            name: company.name,
            email: company.email,
            GSTNo: company.GSTNo,
            pincode: company.pincode,
            type: "C"
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 86400 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                pl: payload
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
  });
});

router.post("/Managerregister", (req, res) => {
  // console.log("Debug bolte")
  const { errors, isValid } = managerRegisterInput(req.body);
  // console.log("Kartik2")
  // console.log(req.body)
  // console.log("Kartik3")
  // console.log(errors)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  // console.log("Kartik")
  User.findOne({ $or: [{ email: req.body.email }, { aadharnum: req.body.aadharnum }] }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email/Aadhar Number already exists",
        aadharnum: "Aadhar Number or email is already existing "
      });
    }
    else {
      const newuser = User({
        name: req.body.name,
        email: req.body.email,
        line1: req.body.line1,
        line2: req.body.line2,
        line3: req.body.line3,
        pincode: parseInt(req.body.pincode),
        password: req.body.password1,
        aadharnum: req.body.aadharnum,
        phonenum: req.body.phonenum,
        companyid: req.body.companyid,
        type: "M"
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          if (err)
            throw err;
          newuser.password = hash;
          newuser
            .save()
            .then(
              user => {
                res.json(user)
                const newmanager = Manager({
                  email: req.body.email,
                })
                newmanager
                  .save()
                  .then(manager => {
                    return res
                  })
                  .catch(err => console.log(err));
              }
            )
            .catch(err => console.log(err));
        });
      });
    }
  })
})

module.exports = router;
