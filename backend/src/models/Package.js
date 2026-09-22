import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
    // Frontend display fields (existing UI)
    date: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: Number,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["Domestic", "International", "Pilgrimage"],
      default: "Domestic",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
