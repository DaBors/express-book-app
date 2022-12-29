import express, { Router } from "express";
import { getBookList, getBookDetail } from "../controller/booksController";

export const booksRouter: Router = express.Router()

booksRouter.get("/", getBookList);
booksRouter.get("/:book_id", getBookDetail);
