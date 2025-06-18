import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../features/books/bookSlice';
import { AppDispatch } from '../../app/store';

interface BookData {
  title: string;
  author: string;
  coverImage: File | undefined;
}

interface BookFormEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    name: keyof BookData;
    value: string;
    files?: FileList | null;
  };
}

interface BookFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

export function useBookForm() {
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    coverImage: undefined
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: BookFormEvent) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: BookFormEvent) => {
    if (e.target.files) {
      setBookData({ ...bookData, coverImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: BookFormSubmitEvent) => {
    e.preventDefault();
    try {
      await dispatch(addBook({
        title: bookData.title,
        author: bookData.author,
        coverImage: bookData.coverImage
      })).unwrap();
      setBookData({
        title: "",
        author: "",
        coverImage: undefined,
      });
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return {
    bookData,
    handleChange,
    handleFileChange,
    handleSubmit
  };
}