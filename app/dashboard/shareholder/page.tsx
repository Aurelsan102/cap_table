"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, TrendingUp, FileText, Download } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { mockShareholders } from "@/mocks/shareholders";
import { getIssuancesByShareholder } from "@/mocks/issuances";
import { Shareholder, Issuance } from "@/types";

import { Button } from "@/components/ui/button";

export default function ShareholderDashboard() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  const [shareholder, setShareholder] = useState<Shareholder | null>(null);
  const [issuances, setIssuances] = useState<Issuance[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== "shareholder") {
      router.push("/login");
      return;
    }

    // Une fois l'utilisateur validé
    const found = mockShareholders.find((s) => s.email === user.email);
    if (found) {
      setShareholder(found);
      setIssuances(getIssuancesByShareholder(found.id));
    }

    setLoadingData(false);
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDownloadCertificate = (issuance: Issuance) => {
    if (!issuance.certificateUrl) return;

    const link = document.createElement("a");
    link.href = issuance.certificateUrl;
    link.download = `certificat-${issuance.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chargement global
  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || !shareholder) return null;

  const totalValue = issuances.reduce(
    (sum, issuance) => sum + issuance.numberOfShares * issuance.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mon Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Connecté en tant que {user.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Infos utilisateur */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Mes Informations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Nom" value={shareholder.name} />
            <Info label="Email" value={shareholder.email} />
            <Info
              label="Actions possédées"
              value={`${shareholder.totalShares.toLocaleString()} actions`}
            />
            <Info
              label="Pourcentage de participation"
              value={`${shareholder.percentage.toFixed(1)}%`}
            />
          </div>
        </section>

        {/* Statistiques */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<TrendingUp className="h-8 w-8 text-green-600" />}
            label="Actions Totales"
            value={shareholder.totalShares.toLocaleString()}
          />
          <StatCard
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            label="Émissions"
            value={issuances.length}
          />
          <StatCard
            icon={<Download className="h-8 w-8 text-purple-600" />}
            label="Valeur Totale"
            value={`${totalValue.toLocaleString()} €`}
          />
        </section>

        {/* Historique */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Historique de mes Émissions
            </h2>
          </div>

          {issuances.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              Aucune émission trouvée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Actions", "Prix", "Total", "Certificat"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issuances
                    .slice()
                    .reverse()
                    .map((issuance) => (
                      <tr key={issuance.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(issuance.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {issuance.numberOfShares.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {issuance.price.toFixed(2)} €
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(
                            issuance.numberOfShares * issuance.price
                          ).toLocaleString()}{" "}
                          €
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadCertificate(issuance)}
                            disabled={!issuance.certificateUrl}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Composant d'info utilisateur
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

// Composant de statistique
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center">
      {icon}
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
