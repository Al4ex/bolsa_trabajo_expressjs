const { Schema, model } = require("mongoose");

const apliSchema = new Schema(
  {
    name: { type: String },
    nivel: {type: String},
    ubi:{type: String},
    telf:{ type: String},
    image:{type: String},
    title: {
      type: String,
      required: true,
    },
    jobduration: {
      type: String,
      required: true,
    },
    exper: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    sueldo: {
      type: String,
    },
    times: {},
    user: {
      type: String,
      required: true,
    },
    idapli:{
        type:String
    },
    userid:{
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Aplis", apliSchema);
