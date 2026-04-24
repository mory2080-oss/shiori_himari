"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddBookFormProps {
  onAdd: (title: string, totalPages: number) => void;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("作品名を入力してください");
      return;
    }

    const pages = parseInt(totalPages, 10);
    if (isNaN(pages) || pages <= 0) {
      setError("有効なページ数を入力してください");
      return;
    }

    onAdd(title.trim(), pages);
    setTitle("");
    setTotalPages("");
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold gap-2">
          <Plus className="h-4 w-4" />
          新しい本を登録
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            新しい本を登録
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="book-title">作品名</Label>
            <Input
              id="book-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 吾輩は猫である"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-pages">総ページ数</Label>
            <Input
              id="total-pages"
              type="number"
              min={1}
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
              placeholder="例: 300"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" className="font-bold">
              登録する
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
