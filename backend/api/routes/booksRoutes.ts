import express from "express";
import { getAllBooks, getBookDetail } from "../controller/booksController";

export const booksRouter = express.Router()

booksRouter.get("/", getAllBooks);
booksRouter.get("/:book_id", getBookDetail);
