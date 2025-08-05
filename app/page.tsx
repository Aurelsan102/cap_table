"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      console.log("HomePage → isAuthenticated:", isAuthenticated);
      console.log("HomePage → user:", user);

      if (isAuthenticated && user) {
        if (user.role === "admin") {
          console.log("HomePage → Redirection vers le dashboard admin");
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/shareholder");
        }
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return null;
}
