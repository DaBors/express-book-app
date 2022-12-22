import express, { Router } from "express";
import { getAllBooks, getBookDetail } from "../controller/booksController";

export const booksRouter: Router = express.Router()

booksRouter.get("/", getAllBooks);
booksRouter.get("/:book_id", getBookDetail);
