import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import PremiumLoginPage from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import Layout from "../components/Layout"
import Dashboard from "../pages/Dashboard"
import BooksList from "../pages/books/BooksList"
import AddBook from "../pages/books/AddBook"
import MembersList from "../pages/members/MembersList"
import AddMember from "../pages/members/AddMember"
import BorrowingsList from "../pages/borrowings/BorrowingsList"
import IssueBook from "../pages/borrowings/IssueBook"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<PremiumLoginPage />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/books" element={
                <ProtectedRoute>
                    <Layout>
                        <BooksList />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/books/add" element={
                <ProtectedRoute>
                    <Layout>
                        <AddBook />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/members" element={
                <ProtectedRoute>
                    <Layout>
                        <MembersList />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/members/add" element={
                <ProtectedRoute>
                    <Layout>
                        <AddMember />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/borrowings" element={
                <ProtectedRoute>
                    <Layout>
                        <BorrowingsList />
                    </Layout>
                </ProtectedRoute>
            } />
            <Route path="/borrowings/issue" element={
                <ProtectedRoute>
                    <Layout>
                        <IssueBook />
                    </Layout>
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default AppRoutes;
