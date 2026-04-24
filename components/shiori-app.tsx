"use client";

import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { BooksProvider } from "@/contexts/books-context";
import { AuthForms } from "./auth-forms";
import { Dashboard } from "./dashboard";
import { Spinner } from "@/components/ui/spinner";

function AppContent() {
  const { isAuthenticated, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Spinner className="w-8 h-8 text-primary mx-auto" />
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForms />;
  }

  return (
    <BooksProvider>
      <Dashboard />
    </BooksProvider>
  );
}

export function ShioriApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
