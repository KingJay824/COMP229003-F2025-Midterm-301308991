let BookModel = require('../models/books');

module.exports.getAll = async function (req, res, next) {
  try {
    let books = await BookModel.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports.getBook = async function (req, res, next) {
  try {
    // support both :id and :bookId param names
    const id = req.params.id || req.params.bookId;
    if (!id) {
      return res.status(400).json({ success:false, message: "Book id is required." });
    }

    let book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ success:false, message: "Book not found." });
    }

    res.json(book);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    let newBook = new BookModel(req.body);
    let result = await newBook.save();
    res.status(201).json({ success:true, message: "Book created successfully.", book: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    const id = req.params.bookId || req.params.id;
    if (!id) {
      return res.status(400).json({ success:false, message: "Book id is required." });
    }

    let updated = await BookModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success:false, message: "Book not found or not updated." });
    }

    res.json({ success:true, message: "Book updated successfully.", book: updated });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.remove = async function (req, res, next) {
  try {
    const id = req.params.bookId || req.params.id;
    if (!id) {
      return res.status(400).json({ success:false, message: "Book id is required." });
    }

    let result = await BookModel.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true, message: "Book deleted successfully." });
    } else {
      return res.status(404).json({ success:false, message: "Book not found. Nothing deleted." });
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
