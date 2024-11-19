const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (typeof value === "number" && value.toString().trim().length === 0)
    return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (data) {
  let stringId = data.toString().toLowerCase();
  if (!mongoose.Types.ObjectId.isValid(stringId)) {
    return false;
  }
  let result = new mongoose.Types.ObjectId(stringId);
  if (result.toString() != stringId) {
    return false;
  }
  return true;
};

// const isValidPrice = function (price) {
//   return /^[1-9][0-9]{0,7}(\.[0-9]{2})?$/.test(price);
// };

// const isValidQuantity = function (quantity) {
//   return !Number.isNaN(quantity) && quantity > 0;
// };

module.exports = {
  isValid,
  isValidObjectId,
  isValidRequestBody,
  // isValidPrice,
  // isValidQuantity,
};
