import { useBookForm } from "../../hooks/AddBooks/useBookForm"

const AddBook = ({ closeModal }) => {

  const {
    bookData,
    handleChange,
    handleFileChange,
    handleSubmit } = useBookForm()
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add a New Book</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={bookData.title}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={bookData.author}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="coverImage"
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBook