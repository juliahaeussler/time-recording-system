const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    date: {
      type: Date,
    },
    hours: {
      type: Number,
    },
    mins: {
      type: Number,
    },
  },
  { collection: "invoices" }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
