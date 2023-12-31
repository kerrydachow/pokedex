const { SERVER_PORT, LOGIN_PORT } = require("./utils/constants");
const pokemonAdminRoute = require('./routes/pokemonAdminRoute');
const pokemonUserRoute = require('./routes/pokemonUserRoute');
const userRoute = require("./routes/userRoute");
const errorRoute = require("./routes/errorRoute");
const tokenRoute = require("./routes/tokenRoute")
const userAuth = require("./middlewares/userAuth");
const adminAuth = require("./middlewares/adminAuth");
const apiLogger = require("./middlewares/apiLogger")
const { errorLogger, errorResponder, invalidPathHandler, errorValidator, errorApiLogger } = require("./middlewares/errorHandler");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./utils/connectDatabase");
require("dotenv").config();

const app = express();
const login = express();

// Allow CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
login.use(cors({ exposedHeaders: ['auth-token-access', 'auth-token-refresh'], origin: "http://localhost:3000" }))


app.listen(SERVER_PORT, async () => {
    try {
        connectDatabase(stalePokemon=true); // Set to 'true' to (re)populate pokemon
    } catch (error) {
        console.log(error);
        console.log("Failed to connect");
    }
    console.log(`API listening to port ${SERVER_PORT}`);
})

login.listen(LOGIN_PORT, async () => {
    console.log(`Login listening to port ${LOGIN_PORT}`);
})

// Middlewares
login.use(express.json());
login.use(cookieParser());
login.use(userRoute);
login.use(tokenRoute);
login.use(errorRoute);
login.use(errorLogger);
login.use(errorValidator);
login.use(errorResponder);
login.use(invalidPathHandler);

app.use(express.json());
app.use(cookieParser());
app.use(errorRoute);
app.use(userAuth);
app.use(apiLogger);
app.use(pokemonUserRoute);
app.use(adminAuth);
app.use(pokemonAdminRoute);
app.use(errorLogger);
app.use(errorValidator);
app.use(errorApiLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
