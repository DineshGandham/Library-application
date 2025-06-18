import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { ReactNode } from "react"
import { RootState } from "../app/store"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute