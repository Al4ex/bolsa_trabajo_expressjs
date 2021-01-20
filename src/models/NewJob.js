const { Schema, model } = require("mongoose");


const JobSchema = new Schema(
  {
    name: { type: String },
    nivel: {type: String},
    ubi:{type: String},
    telf:{ type: String},
    image:{type: String},
    title: {
      type: String,
      required: true},
    jobduration: {type: String},
    exper: {type: String},
    description: {type: String},
    sueldo: {type: String},
    times: {type: String},
    user: {type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = model("Works", JobSchema);
