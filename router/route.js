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

router.get("/comments", async (req, res) => {
    const dbPath = path.join(process.cwd(), "database", "comments.json");
    try {
        const data = await fs.promises.readFile(dbPath, "utf-8");
        const comments = await JSON.parse(data);
        res.json(comments);
    } catch (error) {
        console.error("Error reading database:", error);
        res.status(500).send("Error reading database");
    }
});


router.post("/post/review", async (req, res) => {
    const dbPath = path.join(process.cwd(), "database", "comments.json");
    try {
        const data = {
            id: Date.now(),
            name: req.body.name,
            comment: req.body.comment,
            rating: req.body.rating,
            date: new Date().toString(),
        }
        await fs.promises.writeFile(dbPath, JSON.stringify(data));
        res.status(201).send("Review posted successfully");
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).send("Error posting review");
    }

});

export default router;