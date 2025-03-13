import Header from './Header';
import { useHome } from '../../hooks/Home/useHome';
import AddBook from '../../components/AddBook';

const Home = () => {
  const { isOpen, setIsOpen, closeModal, books } = useHome();
  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600" onClick={() => setIsOpen(true)}>
            Add Book
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books && books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {/* Cover Image */}
              <img
                src={`http://localhost:5000${book.coverImage}`}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
              {/* Book Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
              </div>
            </div>
          ))}
        </div>
        {isOpen && (
          <AddBook closeModal={closeModal} />
        )}
      </main>
    </div>
  )
}

export default Home