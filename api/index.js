import express from 'express';
import mongoose from "mongoose";
const app = express();

mongoose.connect("")
app.listen(3000, () => {
    console.log('server is running on port 3000!');
}
)