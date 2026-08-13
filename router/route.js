import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/products", async (req, res) => {

    const dbPath = path.join(process.cwd(), "database", "data.json");
    try {
        const data = await fs.promises.readFile(dbPath, "utf-8");
        const products = await JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error("Error reading database:", error);
        res.status(500).send("Error reading database");
    }
});

export default router;