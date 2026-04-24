"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAuth } from "./auth-context";
import type { Book } from "@/lib/types";

interface BooksContextType {
  books: Book[];
  currentBook: Book | null;
  addBook: (title: string, totalPages: number) => void;
  updateProgress: (bookId: string, currentPage: number) => number;
  deleteBook: (bookId: string) => void;
  setCurrentBook: (book: Book | null) => void;
  isLoaded: boolean;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [allBooks, setAllBooks, isLoaded] = useLocalStorage<Book[]>(
    "shiori-books",
    []
  );
  const [currentBook, setCurrentBook] = useLocalStorage<Book | null>(
    "shiori-current-book",
    null
  );

  const userBooks = user
    ? allBooks.filter((book) => book.userId === user.id)
    : [];

  const addBook = (title: string, totalPages: number) => {
    if (!user) return;

    const newBook: Book = {
      id: crypto.randomUUID(),
      userId: user.id,
      title,
      totalPages,
      currentPage: 0,
      previousPage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAllBooks([...allBooks, newBook]);
    setCurrentBook(newBook);
  };

  const updateProgress = (bookId: string, currentPage: number): number => {
    const bookIndex = allBooks.findIndex((b) => b.id === bookId);
    if (bookIndex === -1) return 0;

    const book = allBooks[bookIndex];
    const previousPage = book.currentPage;
    const progress = currentPage - previousPage;

    const updatedBook: Book = {
      ...book,
      previousPage,
      currentPage: Math.min(currentPage, book.totalPages),
      updatedAt: new Date().toISOString(),
    };

    const newBooks = [...allBooks];
    newBooks[bookIndex] = updatedBook;
    setAllBooks(newBooks);

    if (currentBook?.id === bookId) {
      setCurrentBook(updatedBook);
    }

    return progress;
  };

  const deleteBook = (bookId: string) => {
    setAllBooks(allBooks.filter((b) => b.id !== bookId));
    if (currentBook?.id === bookId) {
      setCurrentBook(null);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books: userBooks,
        currentBook,
        addBook,
        updateProgress,
        deleteBook,
        setCurrentBook,
        isLoaded,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}
