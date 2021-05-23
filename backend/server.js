const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/db");

dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
	console.log(`Server running at port ${process.env.PORT} in ${process.env.NODE_ENV} MODE`);
});

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`Error:${err.message}`);
	console.log(`Shutting down the server due to uncaught exception`);
	server.close(() => {
		process.exit(1);
	});
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.log(`Error:${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);
	server.close(() => {
		process.exit(1);
	});
});
