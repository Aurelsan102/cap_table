import { mockLogin } from "@/mocks/users";
import { User } from "@/types";
import { storage } from "@/utils/storage";

export const auth = {
  login: async (
    email: string,
    role: "admin" | "shareholder"
  ): Promise<User | null> => {
    console.log("auth.login: Tentative de connexion", { email, role });

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler délai

    const user = mockLogin(email, role);
    console.log("auth.login: Résultat de mockLogin", user);

    if (user) {
      storage.setUser(user);
      return user;
    }

    return null;
  },

  logout: (): void => {
    console.log("auth.logout: Déconnexion");
    storage.removeUser();
  },

  getCurrentUser: async (): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simuler délai
    const user = storage.getUser();
    console.log("auth.getCurrentUser (async):", user);
    return user;
  },

  isAuthenticated: (): boolean => {
    const isAuth = storage.isAuthenticated();
    console.log("auth.isAuthenticated:", isAuth);
    return isAuth;
  },

  hasRole: (role: "admin" | "shareholder"): boolean => {
    const user = storage.getUser();
    const hasRole = user?.role === role;
    console.log("auth.hasRole:", { role, hasRole, user });
    return hasRole;
  },
};
