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
import { addShareholder } from "@/mocks/shareholders";
import { Shareholder } from "@/types";
import React, { useState } from "react";

interface AddShareholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (shareholder: Shareholder) => void;
}

export const AddShareholderModal: React.FC<AddShareholderModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalShares: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const shares = parseInt(formData.totalShares);

      if (!formData.name.trim()) {
        setError("Le nom est requis");
        return;
      }

      if (!formData.email.trim()) {
        setError("L'email est requis");
        return;
      }

      if (isNaN(shares) || shares <= 0) {
        setError("Le nombre d'actions doit être un nombre positif");
        return;
      }

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newShareholder = addShareholder({
        name: formData.name.trim(),
        email: formData.email.trim(),
        totalShares: shares,
      });

      onSuccess(newShareholder[newShareholder.length - 1]);
      handleClose();
    } catch (error) {
      setError("Erreur lors de l'ajout de l'actionnaire");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", totalShares: "" });
    setError("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un actionnaire</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Jean Dupont"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="jean.dupont@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shares">Nombre d'actions</Label>
            <Input
              id="shares"
              type="number"
              value={formData.totalShares}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  totalShares: e.target.value,
                }))
              }
              placeholder="1000"
              min="1"
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
              {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
