const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/produtRoutes")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
