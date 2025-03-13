import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{type: String, require:true},
    author:{type: String,require:true},
    coverImage: {type: String},
    file: {type: String}
})

export default mongoose.model('books',bookSchema);