export interface Shareholder {
  id: string;
  name: string;
  email: string;
  totalShares: number;
  percentage: number;
}

export interface Issuance {
  id: string;
  shareholderId: string;
  numberOfShares: number;
  date: string;
  price: number;
  certificateUrl?: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "shareholder";
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CapTableData {
  totalShares: number;
  shareholders: Shareholder[];
  issuances: Issuance[];
}
