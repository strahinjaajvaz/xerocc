const uuid = require("uuid");
let productOptions = require("../db/productOptions.json");

module.exports = (app) => {
  app.get("/products/:id/options", function (req, res) {
    const filteredProducts = productOptions.filter(
      (item) => item.productId === req.params.id
    );

    return res.json({ data: filteredProducts });
  });

  app.get("/products/:id/options/:productOptionId", function (req, res) {
    const item = productOptions.find(
      (item) =>
        item.productId === req.params.id &&
        item.Id === req.params.productOptionId
    );
    return res.json({ data: item || [] });
  });

  app.post("/products/:id/options", function (req, res) {
    const { id: productId } = req.params;
    const { Name, Description } = req.body;
    const newProductOption = {
      Id: uuid.v4(),
      ProductId: productId,
      Name,
      Description,
    };

    productOptions.push(newProductOption);

    return res.json({ data: newProductOption });
  });

  app.put("/products/:id/options/:productOptionId", function (req, res) {
    const item = productOptions.find(
      (item) =>
        item.productId === req.params.id &&
        item.Id === req.params.productOptionId
    );

    if (!item) return res.json({ data: null });

    const filteredList = productOptions.filter(
      (item) =>
        item.productId !== req.params.id ||
        item.Id !== req.params.productOptionId
    );
    const { Name, Description } = req.body;
    const updatedItem = {
      ...item,
      Name: Name || item.Name,
      Description: Description || item.Description,
    };

    productOptions = [...filteredList, updatedItem];
    return res.json({ data: updatedItem });
  });

  app.delete("/products/:id/options/:productOptionId", function (req, res) {
    productOptions = productOptions.filter(
      (item) =>
        item.productId !== req.params.id ||
        item.Id !== req.params.productOptionId
    );

    return res.json({ deleted: true });
  });
};
