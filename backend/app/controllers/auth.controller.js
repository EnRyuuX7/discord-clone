const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function randomNumberGen() {
    return Number(Math.floor(1000 + Math.random() * 9000).toString());
}

exports.signup = (req, res) => {
    const user = new User({
        id: randomNumberGen(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find({ name: { $in: req.body.roles } }),
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered succesfully" });
                    });
                };
        } else {
            Role.findOne({ name: "user" }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [Role._id];
                user.save((err) => {
                    if (err) {
                        res.sed(500, { message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500, { message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password",
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, //24 hr            })
            });

            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                message: "Login successfull!",
                loggedIn: true,
            });
        });
};
