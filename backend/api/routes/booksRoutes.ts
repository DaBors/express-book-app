import express from "express";
import { getAllBooks } from "../controller/booksController";

export const booksRouter = express.Router()

booksRouter.get("/books", getAllBooks);