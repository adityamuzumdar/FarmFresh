const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// DB connection
// const db = require("./config/keys.js").mongoURI;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
	'mongodb+srv://asdfasdf:dmYyR9B9W39Hal8F@cluster0.7bobry8.mongodb.net/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connected..."))
	.catch(console.err);


// Middleware
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/auth", require("./routes/auth.js"));
app.use("/farmer", require("./routes/farmer.js"));
app.use("/wholesaler", require("./routes/wholesaler.js"));

// Port
const PORT = process.env.PORT || 5111;
app.listen(
	PORT,
	(err) => {
		if(err)
			throw err;

		console.log("Server started on http://localhost:" + PORT);
	}
);