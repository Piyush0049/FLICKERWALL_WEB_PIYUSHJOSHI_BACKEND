const app = require("./app");
const dotenv = require("dotenv");
const connecttodatabase = require("./config/database");

dotenv.config();
connecttodatabase();

app.listen(process.env.PORT, () => {
    console.log(`App working on http://localhost:${process.env.PORT}`)
});  