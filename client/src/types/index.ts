// Book related types
export interface Book {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookData {
    title: string;
    author: string;
    coverImage: File | null;
}

export interface BookFormEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
        name: string;
        value: string;
        files?: FileList;
    };
}

export interface BookFormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
}

// User related types
export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface UserData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

// Auth related types
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    isLoading: boolean;
    isError: boolean;
    message: string | null;
}

// Book state types
export interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
    selectedBook: Book | null;
}

// Component Props types
export interface AddBookProps {
    closeModal: () => void;
}

export interface BookListProps {
    books: Book[];
    onEdit?: (book: Book) => void;
    onDelete?: (bookId: string) => void;
}

export interface BookCardProps {
    book: Book;
    onEdit?: (book: Book) => void;
    onDelete?: (bookId: string) => void;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Redux Action types
export interface Action<T = any> {
    type: string;
    payload?: T;
} 