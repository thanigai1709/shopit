const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/db");

dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDataBase();

app.listen(process.env.PORT, () => {
	console.log(`Server running at port ${process.env.PORT} in ${process.env.NODE_ENV} MODE`);
});
