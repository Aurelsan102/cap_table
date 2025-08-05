import { User } from "@/types";

const AUTH_KEY = "captable_auth_user";

export const storage = {
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;

    try {
      const userStr = localStorage.getItem(AUTH_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Erreur lors du stockage de l'utilisateur:", error);
    }
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  },

  isAuthenticated: (): boolean => {
    return storage.getUser() !== null;
  },
};
