"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash2 } from "lucide-react";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  isSelected?: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function BookCard({
  book,
  isSelected,
  onSelect,
  onDelete,
}: BookCardProps) {
  const progressPercent = Math.round((book.currentPage / book.totalPages) * 100);
  const isCompleted = book.currentPage >= book.totalPages;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary shadow-lg",
        isCompleted && "bg-secondary/20"
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight line-clamp-2">
            {book.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">削除</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>
            {book.currentPage} / {book.totalPages} ページ
          </span>
          {isCompleted && (
            <span className="ml-auto text-xs font-bold text-primary">
              読了！
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Progress value={progressPercent} className="h-2" />
          <p className="text-right text-xs text-muted-foreground">
            {progressPercent}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
