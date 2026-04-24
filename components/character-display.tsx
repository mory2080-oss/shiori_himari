"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { CharacterFeedback } from "@/lib/types";
import { getDefaultCharacterImage } from "@/lib/character-feedback";
import { cn } from "@/lib/utils";

interface CharacterDisplayProps {
  feedback?: CharacterFeedback | null;
  showMessage?: boolean;
  className?: string;
}

export function CharacterDisplay({
  feedback,
  showMessage = true,
  className,
}: CharacterDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (feedback) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const imageUrl = feedback?.imageUrl || getDefaultCharacterImage();

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative w-48 h-64 md:w-56 md:h-72 transition-transform duration-300",
          isAnimating && "scale-110"
        )}
      >
        <Image
          src={imageUrl}
          alt="ひまり"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>

      {showMessage && feedback && (
        <div
          className={cn(
            "relative bg-card border-2 border-primary rounded-2xl p-4 max-w-sm",
            "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full",
            "before:border-8 before:border-transparent before:border-b-primary"
          )}
        >
          <p className="text-card-foreground font-bold text-center text-sm md:text-base leading-relaxed">
            {feedback.message}
          </p>
        </div>
      )}
    </div>
  );
}
