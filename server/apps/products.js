import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const result = await collection.find().toArray();

  res.status(200).json({
    data: result,
  });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const collection = db.collection("products");
    const result = await collection.insertOne({
      name,
      price,
      image,
      description,
      category,
    });
    res.status(201).json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const { id } = req.params;
    const { name, price, image, description, category } = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, image, description, category } }
    );

    res.status(200).json({ message: "Product has been updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: "Product has been deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default productRouter;
