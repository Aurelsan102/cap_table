"use client";

import { AddShareholderModal } from "@/components/AddShareholderModal";
import { IssueSharesModal } from "@/components/IssueSharesModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { mockIssuances } from "@/mocks/issuances";
import { getTotalShares, mockShareholders } from "@/mocks/shareholders";
import { Issuance, Shareholder } from "@/types";
import { Download, LogOut, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, login, logout, isLoading } = useAuth();
  const [shareholders, setShareholders] =
    useState<Shareholder[]>(mockShareholders);
  const [issuances, setIssuances] = useState<Issuance[]>(mockIssuances);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, router, isLoading]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleAddShareholder = (newShareholder: Shareholder) => {
    setShareholders((prev) => [...prev, newShareholder]);
  };

  const handleIssueShares = (newIssuance: Issuance) => {
    setIssuances((prev) => [...prev, newIssuance]);

    // Mettre à jour le nombre d'actions de l'actionnaire
    setShareholders((prev) =>
      prev.map((sh) => {
        if (sh.id === newIssuance.shareholderId) {
          return {
            ...sh,
            totalShares: sh.totalShares + newIssuance.numberOfShares,
          };
        }
        return sh;
      })
    );
  };

  const totalShares = getTotalShares();

  const chartData = shareholders.map((sh, index) => ({
    name: sh.name,
    value: sh.totalShares,
    percentage: sh.percentage,
    color: COLORS[index % COLORS.length],
  }));

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-4 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  // Rediriger si pas d'utilisateur ou mauvais rôle
  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Administrateur
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Connecté en tant que {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Actionnaires
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {shareholders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Actions Totales
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalShares.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Émissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issuances.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Users className="h-4 w-4 mr-2" />
            Ajouter un actionnaire
          </Button>
          <Button variant="outline" onClick={() => setIsIssueModalOpen(true)}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Émettre des actions
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition des Actions
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) =>
                      `${name} (${percentage.toFixed(1)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Liste des actionnaires */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Liste des Actionnaires
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {shareholders.map((shareholder) => (
                <div
                  key={shareholder.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {shareholder.name}
                    </p>
                    <p className="text-sm text-gray-600">{shareholder.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {shareholder.totalShares.toLocaleString()} actions
                    </p>
                    <p className="text-sm text-gray-600">
                      {shareholder.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Historique des émissions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Historique des Émissions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actionnaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issuances
                  .slice()
                  .reverse()
                  .map((issuance) => {
                    const shareholder = shareholders.find(
                      (sh) => sh.id === issuance.shareholderId
                    );
                    return (
                      <tr key={issuance.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(issuance.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {shareholder?.name || "Inconnu"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {issuance.numberOfShares.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {issuance.price.toFixed(2)} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(
                            issuance.numberOfShares * issuance.price
                          ).toLocaleString()}{" "}
                          €
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddShareholderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddShareholder}
      />

      <IssueSharesModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        onSuccess={handleIssueShares}
      />
    </div>
  );
}
