const uuid = require("uuid");

let products = require("../db/products.json");
let productOptions = require("../db/productOptions.json");

module.exports = function (app) {
  app.get("/products", function (req, res) {
    if (req.query.name) {
      const filteredProducts = products.filter(
        (item) => item.Name === req.query.name
      );
      // will return a empty array so we don't need to specify that
      return res.json({ data: filteredProducts });
    }
    return res.json({ data: products || [] });
  });

  app.get("/products/:id", function (req, res) {
    const item = products.find((item) => item.Id === req.params.id);
    return res.json({ data: item || [] });
  });

  app.post("/products", function (req, res) {
    const { Name, Description, Price, DeliveryPrice } = req.body;
    // validation on the body to makes sure we get all the required fields
    if (!Name || !Description || !Price || !DeliveryPrice)
      res.status(400).json({
        message: "Please make sure you included all the required fields",
      });
    const newProduct = {
      Name,
      Description,
      Price,
      DeliveryPrice,
      Id: uuid.v4(),
    };
    products.push(newProduct);
    return res.json({ data: newProduct });
  });

  app.put("/products/:id", function (req, res) {
    const { Name, Description, Price, DeliveryPrice } = req.body;
    const item = products.find((item) => item.Id === req.params.id);

    // if there isnt an item with that id, we return null
    if (!item) return res.json({ data: null });

    const filteredList = products.filter((item) => item.Id !== req.params.id);

    // update the new list item
    const updatedItem = {
      ...item,
      Name: Name || item.Name,
      Description: Description || item.Description,
      Price: Price || item.Price,
      DeliveryPrice: DeliveryPrice || item.DeliveryPrice,
    };
    products = [...filteredList, updatedItem];
    return res.json({ data: updatedItem });
  });

  app.delete("/products/:id", function (req, res) {
    products.filter((item) => item.Id !== req.params.id);
    return res.json({ deleted: true });
  });
};
