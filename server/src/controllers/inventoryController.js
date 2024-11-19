const inventoryModel = require("../models/inventoryModel");
const { sendMessage } = require('../util/socket-io');

const {
  isValidObjectId,
  isValidRequestBody,
} = require("../util/validator");

//-------------------------------------------------------------------------
//                        1. API - POST /inventory
//              (Create a product document from request body.)
//-------------------------------------------------------------------------

const createProduct = async (req, res) => {
  try {
    console.log("\n Create Product API.");
    console.log("\n", req.body);

    if (!isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "Request Body Empty." });
    }

    // Destructuring Request-Body.
    let { eqp_id, user_id, startedAt, time, status } = req.body;

    let data = { eqp_id, user_id, startedAt, time, status };

    // Create Document.
    const createProduct = await inventoryModel.create(data);

    //- **Response format**
    return res.status(201).send({
      status: true,
      message: "Success",
      data: createProduct,
    });
    // message: "Product created successfully.",
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/**
 *
 *
 *
 *
 *
 *
 *
 */

//-------------------------------------------------------------------------
//                        2. API - GET /inventory
//        (Returns all products in the collection that aren't deleted.)
//-------------------------------------------------------------------------

const getProducts = async (req, res) => {
  try {
    console.log("\n getProducts API.");

    const documents = await inventoryModel.find();
    // console.log(documents);
    //- **On error** - Return a suitable error message with a valid HTTP status code.
    if (!documents.length) {
      return res
        .status(404)
        .send({ status: false, message: "No products found." });
    }

    // message: "Fetched Products Successfully.",
    return res.status(200).send({
      status: true,
      message: "Success",
      data: documents,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/**
 *
 *
 *
 *
 *
 *
 *
 */

//-------------------------------------------------------------------------
//                        3. API - GET /inventory/:id
//                     (Returns product details by product id)
//-------------------------------------------------------------------------

const getProductById = async (req, res) => {
  //
  console.log("\n Outside TRY - getProductById API.");

  // Allow Origin "*".
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    console.log("\n getProductById API.");

    const productIdParams = req.params.id;
    console.log(req.params);
    const findProduct = await inventoryModel.findOne({eqp_id: productIdParams});
    if (!findProduct) {
      return res.status(404).send({
        status: false,
        message: `No Such PRODUCT with ID: <${productIdParams}> exist in Database.`,
      });
    }
    //- **On success** - Return HTTP status 200. Also return the product documents.
    return res.status(200).send({
      status: true,
      message: "Success",
      data: findProduct,
    });
    // message: "Fetched Product by ID.",
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/**
 *
 *
 *
 *
 *
 *
 *
 */

//----------------------------------------------------------------------------------
//                        4. API - PUT /inventory/:id
//             (Updates a product by changing at least one or all fields.)
//----------------------------------------------------------------------------------
const updateProductById = async (req, res) => {
  try {
    console.log("\n updateProductById API.");
    console.log(req);
    const productIdParams = req.params.id;
    console.log(productIdParams);
    //- Check if the productId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body.
    const productExist = await inventoryModel.findOne({eqp_id: productIdParams});
    console.log(productExist);
    if (!productExist) {
      console.log("Here");
      let resp = await createProduct(req, res);
      sendMessage("inventory-modified", "refresh :>");
      return resp;
    }

    console.log("\n", req.body); 

    if (!isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "Request Body Empty." });
    }

    // Destructuring Request-Body.
    let { eqp_id, user_id, startedAt, time, status } = req.body;

    productExist.user_id = user_id;
    productExist.startedAt = startedAt;
    productExist.time = time;
    productExist.status = status;

    // Update the Product-document.
    const updateProduct = await inventoryModel.findOneAndUpdate(
      { eqp_id: productIdParams},
      productExist,
      { new: true }
    );

    sendMessage("inventory-modified", "refresh :>");

    //- **Response format**
    //- **On success** - Return HTTP status 200. Also return the updated product document.
    // message: "Product Updated.",
    return res.status(200).send({
      status: true,
      message: "Success",
      data: updateProduct,
    })
  } catch (error) {
    return new Response( JSON.stringify("hoho") ,{ status:500 } )
  }
  
};

/**
 *
 *
 *
 *
 *
 *
 *
 */

//-------------------------------------------------------------------------
//                  5. API - DELETE /inventory/:id
//        (Deletes a product by product id if it's not already deleted.)
//-------------------------------------------------------------------------

const deleteProductById = async (req, res) => {
  try {
    console.log("\n deleteProductById API.");

    const productIdParams = req.params.id;
    if (!isValidObjectId(productIdParams)) {
      return res.status(400).send({
        status: false,
        message: `<productId> in Params: <${productIdParams}> NOT a Valid Mongoose Object ID.`,
      });
    }

    // Delete Product.
    // const deleteProduct = await inventoryModel.findOneAndDelete({
    const deleteProduct = await inventoryModel.findOneAndUpdate(
      { _id: productIdParams, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!deleteProduct) {
      return res.status(404).send({
        status: false,
        message: `No Such PRODUCT with ID: <${productIdParams}> exist in Database (OR already deleted).`,
      });
    }

    //- **On success** - Return HTTP status 200.
    return res.status(200).send({
      status: true,
      message: "Deleted Product by ID.",
      data: deleteProduct,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};