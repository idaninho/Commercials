import mongoose from "mongoose";

//create commercial schema and model
const commercialSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "must provide image source url"],
    },
    description: {
      type: String,
      default: "",
    },
    seconds: {
      type: Number,
      required: [true, "supply seconds for viewing the commercial"],
    },
    screensForDisplay: {
      type: [],
      required: [true, "supplys screens for display"],
    },
  },
  {
    timestamps: true,
  }
);

const Commercial = mongoose.model("Commercial", commercialSchema);
export default Commercial;
