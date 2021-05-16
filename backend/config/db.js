const mongoose = require("mongoose");

const connectDataBase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then((con) => {
			console.log(`Db connected with the host: ${con.connection.host}`);
		});
};

module.exports = connectDataBase;
