const express = require("express");
const router = express.Router();

// Product Functions.
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/inventoryController");

//------------------------- Product APIs. ---------------------------------
router.get("/inventory", getProducts);
router.get("/inventory/:id", getProductById);
router.post("/inventory", createProduct);
router.put("/inventory/:id", updateProductById);
router.delete("/inventory/:id", deleteProductById);

//----------------If API is Invalid OR Wrong URL-------------------------
router.all("/**", function (req, res) {
  return res
    .status(404)
    .send({
      status: false,
      message: "Requested API is not available (i.e. Invalid URL).",
    });
});

module.exports = router;
