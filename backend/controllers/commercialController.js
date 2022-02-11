import asyncHandler from "express-async-handler";
import Commercial from "../models/commercialModel.js";

// Fetch all commercials
//@route GET /api/commercials
//@access public
export const getCommercials = asyncHandler(async (req, res) => {
  const commercials = await Commercial.find({});
  res.json(commercials);
});

// Fetch single product
//@route GET /api/products/:id
//@access public
export const getCommercialById = asyncHandler(async (req, res) => {
  const commercial = await Commercial.findById(req.params.id);
  if (commercial) {
    res.json(commercial);
  } else {
    res.status(404);
    throw new Error("Commercial not found");
  }
});

// DELETE a single commercial
//@route DELETE /api/commercial/:id
//@access Private/Admin
export const deleteCommercial = asyncHandler(async (req, res) => {
  const commercial = await Commercial.findById(req.params.id);
  if (commercial) {
    await commercial.remove();
    res.json({ message: "Commercial Removed" });
  } else {
    res.status(404);
    throw new Error("Commercial not found");
  }
});

// CREATE a single commercial
//@route POST /api/commercials
//@access Private/Admin
export const createCommercial = asyncHandler(async (req, res) => {
  const commercial = await Commercial.create(req.body);
  res.status(201).json(commercial);
});

// UPDATE a single commercial
//@route PUT /api/commercials/:id
//@access Private/Admin
export const updateCommercial = asyncHandler(async (req, res) => {
  const { description, imageUrl, seconds, screensForDisplay } = req.body;
  console.log(req.body);
  if (screensForDisplay) {
    const temp = screensForDisplay.split(",");
    console.log(temp);
  }
  const commercial = await Commercial.findById(req.params.id);
  if (commercial) {
    commercial.imageUrl = imageUrl;
    commercial.description = description;
    commercial.seconds = seconds;
    commercial.screensForDisplay = screensForDisplay;

    const updatededCommercial = await commercial.save();
    res.json(updatededCommercial);
  } else {
    res.status(404);
    throw new Error("Commercial not created");
  }
});
