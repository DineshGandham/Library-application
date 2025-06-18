import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BooksList from './pages/books/BooksList';
import AddBook from './pages/books/AddBook';
import MembersList from './pages/members/MembersList';
import AddMember from './pages/members/AddMember';
import BorrowingsList from './pages/borrowings/BorrowingsList';
import IssueBook from './pages/borrowings/IssueBook';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<BooksList />} />
      <Route path="/books/add" element={<AddBook />} />
      <Route path="/members" element={<MembersList />} />
      <Route path="/members/add" element={<AddMember />} />
      <Route path="/borrowings" element={<BorrowingsList />} />
      <Route path="/borrowings/issue" element={<IssueBook />} />
    </Routes>
  );
};

export default AppRoutes; 