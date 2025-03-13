import Book from "../models/bookmodels.js";

export const getBooks = async(req,res) => {
    try {
        const books = await Book.find()
        res.status(201)
        res.json(books)
    } catch (error) {
        console.log("Error in fetching Data", error)
        res.status(500).json({message:"Error occurred"})
    }
}

export const addBook = async(req,res) => {
    console.log(req)
    const {title,author} = req.body
    const coverImage = req.file? `/uploads/${req.file.filename}`:null;
    try {
        const newBook = new Book({title,author,coverImage});
        await newBook.save()
        res.status(201).json(newBook)
    }catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
}