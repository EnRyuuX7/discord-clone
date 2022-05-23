const express = require("express");
const cors = require("cors");
const app = express();
const { Router } = express;
const router = new Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const chat = require("./app/models/chat");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"],
    },
});
chat(io);

const db = require("./app/models");
const Role = require("./app/models/role.model");
const Roles = db.role;
const dbConfig = require("./app/config/db.config");
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Succesfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

//ROUTES
app.use(router);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count == 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT} : http://localhost:3001`);
});
