import { config } from "dotenv";
import express from "express"
import app from "./config/server-config.js";

config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});