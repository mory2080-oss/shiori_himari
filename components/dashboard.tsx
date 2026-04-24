"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useBooks } from "@/contexts/books-context";
import { CharacterDisplay } from "./character-display";
import { ProgressForm } from "./progress-form";
import { BookCard } from "./book-card";
import { AddBookForm } from "./add-book-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LogOut, BookOpen } from "lucide-react";
import { getCharacterFeedback, getDefaultCharacterImage } from "@/lib/character-feedback";
import type { CharacterFeedback } from "@/lib/types";

export function Dashboard() {
  const { user, logout } = useAuth();
  const { books, currentBook, addBook, updateProgress, deleteBook, setCurrentBook } =
    useBooks();
  const [feedback, setFeedback] = useState<CharacterFeedback | null>(null);

  const handleProgressSubmit = (currentPage: number) => {
    if (!currentBook) return;

    const progress = updateProgress(currentBook.id, currentPage);
    const isCompleted = currentPage >= currentBook.totalPages;
    const newFeedback = getCharacterFeedback(progress, isCompleted);
    setFeedback(newFeedback);
  };

  const handleAddBook = (title: string, totalPages: number) => {
    addBook(title, totalPages);
    setFeedback(null);
  };

  const handleSelectBook = (book: typeof currentBook) => {
    setCurrentBook(book);
    setFeedback(null);
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm("この本を削除しますか？")) {
      deleteBook(bookId);
      if (currentBook?.id === bookId) {
        setFeedback(null);
      }
    }
  };

  const progressPercent = currentBook
    ? Math.round((currentBook.currentPage / currentBook.totalPages) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-black text-primary">栞アバター ひまり</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.name}さん
            </span>
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">ログアウト</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Character & Current Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Character Display */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <CharacterDisplay feedback={feedback} />
              </CardContent>
            </Card>

            {/* Current Book Progress */}
            {currentBook ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    現在読んでいる本
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {currentBook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentBook.currentPage} / {currentBook.totalPages} ページ
                      {currentBook.currentPage >= currentBook.totalPages && (
                        <span className="ml-2 text-primary font-bold">
                          🎉 読了！
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>進捗率</span>
                      <span className="font-bold text-primary">
                        {progressPercent}%
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                  </div>

                  <ProgressForm
                    book={currentBook}
                    onSubmit={handleProgressSubmit}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">
                    本が選択されていません
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    右のリストから本を選択するか、新しい本を登録してください
                  </p>
                  <AddBookForm onAdd={handleAddBook} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Book List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">本棚</h2>
              <AddBookForm onAdd={handleAddBook} />
            </div>

            {books.length > 0 ? (
              <div className="space-y-3">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isSelected={currentBook?.id === book.id}
                    onSelect={() => handleSelectBook(book)}
                    onDelete={() => handleDeleteBook(book.id)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>まだ本が登録されていません</p>
                  <p className="text-sm mt-1">
                    「新しい本を登録」ボタンから始めよう！
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
