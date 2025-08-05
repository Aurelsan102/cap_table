import { Issuance } from "@/types";

export const mockIssuances: Issuance[] = [
  {
    id: "1",
    shareholderId: "1",
    numberOfShares: 5000,
    date: "2024-01-15",
    price: 10.0,
    certificateUrl: "/certificates/cert-001.pdf",
  },
  {
    id: "2",
    shareholderId: "2",
    numberOfShares: 3000,
    date: "2024-02-20",
    price: 12.5,
    certificateUrl: "/certificates/cert-002.pdf",
  },
  {
    id: "3",
    shareholderId: "1",
    numberOfShares: 2000,
    date: "2024-03-10",
    price: 15.0,
    certificateUrl: "/certificates/cert-003.pdf",
  },
  {
    id: "4",
    shareholderId: "3",
    numberOfShares: 4000,
    date: "2024-04-05",
    price: 18.0,
    certificateUrl: "/certificates/cert-004.pdf",
  },
  {
    id: "5",
    shareholderId: "4",
    numberOfShares: 2500,
    date: "2024-05-12",
    price: 20.0,
    certificateUrl: "/certificates/cert-005.pdf",
  },
  {
    id: "6",
    shareholderId: "5",
    numberOfShares: 2000,
    date: "2024-06-08",
    price: 22.5,
    certificateUrl: "/certificates/cert-006.pdf",
  },
  {
    id: "7",
    shareholderId: "6",
    numberOfShares: 1500,
    date: "2024-07-15",
    price: 25.0,
    certificateUrl: "/certificates/cert-007.pdf",
  },
  {
    id: "8",
    shareholderId: "7",
    numberOfShares: 1000,
    date: "2024-08-22",
    price: 28.0,
    certificateUrl: "/certificates/cert-008.pdf",
  },
  {
    id: "9",
    shareholderId: "8",
    numberOfShares: 500,
    date: "2024-09-30",
    price: 30.0,
    certificateUrl: "/certificates/cert-009.pdf",
  },
];

export const getIssuancesByShareholder = (shareholderId: string) => {
  return mockIssuances.filter(
    (issuance) => issuance.shareholderId === shareholderId
  );
};

export const addIssuance = (issuance: Omit<Issuance, "id">) => {
  const newIssuance: Issuance = {
    ...issuance,
    id: Date.now().toString(),
    certificateUrl: `/certificates/cert-${Date.now()}.pdf`,
  };

  return [...mockIssuances, newIssuance];
};
