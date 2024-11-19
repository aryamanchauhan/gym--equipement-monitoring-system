const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    eqp_id: { type: Number, required: true },

    user_id: { type: Number, required: true },

    startedAt: { type: Date, default: null },

    time: { type: Number, required: true },

    status: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);

/* ------- Postman - JSON-Format: -------
  {
      "title": "",
      "description": "",
      "price": ,
      "quantity": ,
  }
-----------------------------------------*/
