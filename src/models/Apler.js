const { Schema, model } = require("mongoose");

const ApleSchema = new Schema(
  {
    name: { type: String },
    apds: { type: String },
    email: { type: String, required: true, unique: true },
    nacimiento: { type: String },
    genero: { type: String },
    telf: { type: String },
    nivel: { type: String },
    user: { type: String },
    apliid: { type: String },
    userid:{type: String},
    image: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Aplicants", ApleSchema);
