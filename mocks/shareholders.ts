import { Shareholder } from "@/types";

export const mockShareholders: Shareholder[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    totalShares: 10000,
    percentage: 25.0,
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    totalShares: 8000,
    percentage: 20.0,
  },
  {
    id: "3",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    totalShares: 6000,
    percentage: 15.0,
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    totalShares: 5000,
    percentage: 12.5,
  },
  {
    id: "5",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    totalShares: 4000,
    percentage: 10.0,
  },
  {
    id: "6",
    name: "Emma Roux",
    email: "emma.roux@example.com",
    totalShares: 3000,
    percentage: 7.5,
  },
  {
    id: "7",
    name: "Thomas Moreau",
    email: "thomas.moreau@example.com",
    totalShares: 2000,
    percentage: 5.0,
  },
  {
    id: "8",
    name: "Julie Simon",
    email: "julie.simon@example.com",
    totalShares: 1000,
    percentage: 2.5,
  },
];

export const getTotalShares = () => {
  return mockShareholders.reduce(
    (total, shareholder) => total + shareholder.totalShares,
    0
  );
};

export const addShareholder = (
  shareholder: Omit<Shareholder, "id" | "percentage">
) => {
  const totalShares = getTotalShares();
  const newShareholder: Shareholder = {
    ...shareholder,
    id: Date.now().toString(),
    percentage:
      (shareholder.totalShares / (totalShares + shareholder.totalShares)) * 100,
  };

  // Mettre à jour les pourcentages de tous les actionnaires
  const updatedShareholders = mockShareholders.map((sh) => ({
    ...sh,
    percentage:
      (sh.totalShares / (totalShares + shareholder.totalShares)) * 100,
  }));

  return [...updatedShareholders, newShareholder];
};
