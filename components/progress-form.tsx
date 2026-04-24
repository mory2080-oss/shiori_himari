"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Book } from "@/lib/types";

interface ProgressFormProps {
  book: Book;
  onSubmit: (currentPage: number) => void;
}

export function ProgressForm({ book, onSubmit }: ProgressFormProps) {
  const [pageInput, setPageInput] = useState(book.currentPage.toString());
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);

    if (isNaN(page) || page < 0) {
      setError("有効なページ数を入力してください");
      return;
    }

    if (page > book.totalPages) {
      setError(`総ページ数（${book.totalPages}ページ）を超えています`);
      return;
    }

    setError("");
    onSubmit(page);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-page" className="text-base font-bold">
          今日は何ページまで読んだ？
        </Label>
        <div className="flex gap-2">
          <Input
            id="current-page"
            type="number"
            min={0}
            max={book.totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            className="text-lg"
            placeholder={`0 〜 ${book.totalPages}`}
          />
          <Button type="submit" className="px-6 font-bold">
            報告！
          </Button>
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    </form>
  );
}
