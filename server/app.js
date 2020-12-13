/* entry point  */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./key");

//=========MiddleWares=====//
app.use(express.json()); //to take all incoming request and pass to json

//=======end Middleware ========//

//======Models========//
require("./models/user");
mongoose.model("User");
//==========//========//

//=========DB Connect=====//
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("we are now connected");
});
mongoose.connection.on("error", () => {
  console.log("error connecting", err);
});
//======end DB connect========//

//=======Routes=====//
app.use(require("./routes/auth"));

//=====end Routes=====//

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
