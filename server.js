const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./router");
const app = express();
const port = 3000;
// const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", userRoutes);

// app.get("/", async(request, response) => {
//   const data = await db.getUsers();
//   console.log('data');
//   console.log(data);
//   console.log('data');
//   response.json({ data });
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
