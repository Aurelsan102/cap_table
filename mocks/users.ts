import { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@captable.com",
    role: "admin",
    name: "Administrateur",
  },
  {
    id: "2",
    email: "jean.dupont@example.com",
    role: "shareholder",
    name: "Jean Dupont",
  },
  {
    id: "3",
    email: "marie.martin@example.com",
    role: "shareholder",
    name: "Marie Martin",
  },
  {
    id: "4",
    email: "pierre.durand@example.com",
    role: "shareholder",
    name: "Pierre Durand",
  },
  {
    id: "5",
    email: "sophie.bernard@example.com",
    role: "shareholder",
    name: "Sophie Bernard",
  },
];

export const mockLogin = (
  email: string,
  role: "admin" | "shareholder"
): User | null => {
  const user = mockUsers.find((u) => u.email === email && u.role === role);
  return user || null;
};
