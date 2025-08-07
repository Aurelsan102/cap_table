"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIssuance } from "@/mocks/issuances";
import { mockShareholders } from "@/mocks/shareholders";
import { Issuance } from "@/types";
import React, { useState } from "react";

interface IssueSharesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (issuance: Issuance) => void;
}

export const IssueSharesModal: React.FC<IssueSharesModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    shareholderId: "",
    numberOfShares: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const shares = parseInt(formData.numberOfShares);
      const price = parseFloat(formData.price);

      if (!formData.shareholderId) {
        setError("Veuillez sélectionner un actionnaire");
        return;
      }

      if (isNaN(shares) || shares <= 0) {
        setError("Le nombre d'actions doit être un nombre positif");
        return;
      }

      if (isNaN(price) || price <= 0) {
        setError("Le prix doit être un nombre positif");
        return;
      }

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newIssuance = addIssuance({
        shareholderId: formData.shareholderId,
        numberOfShares: shares,
        price: price,
        date: new Date().toISOString().split("T")[0],
      });

      onSuccess(newIssuance[newIssuance.length - 1]);
      handleClose();
    } catch (error) {
      setError(
        "Erreur lors de l'émission d'actions" +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ shareholderId: "", numberOfShares: "", price: "" });
    setError("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Émettre des actions</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shareholder">Actionnaire</Label>
            <Select
              value={formData.shareholderId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, shareholderId: value }))
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un actionnaire" />
              </SelectTrigger>
              <SelectContent>
                {mockShareholders.map((shareholder) => (
                  <SelectItem key={shareholder.id} value={shareholder.id}>
                    {shareholder.name} ({shareholder.totalShares} actions)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shares">Nombre d&apos;actions à émettre</Label>
            <Input
              id="shares"
              type="number"
              value={formData.numberOfShares}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  numberOfShares: e.target.value,
                }))
              }
              placeholder="1000"
              min="1"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix par action (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="25.00"
              min="0.01"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Émission en cours..." : "Émettre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
