import { IssueSharesModal } from "@/components/IssueSharesModal";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock des dépendances
jest.mock("@/mocks/shareholders", () => ({
  mockShareholders: [
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean@example.com",
      totalShares: 1000,
      percentage: 25,
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie@example.com",
      totalShares: 800,
      percentage: 20,
    },
  ],
}));

jest.mock("@/mocks/issuances", () => ({
  addIssuance: jest.fn((issuance) => ({
    ...issuance,
    id: "test-id",
    certificateUrl: "/test-cert.pdf",
  })),
}));

describe("IssueSharesModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText("Émettre des actions")).toBeInTheDocument();
    expect(screen.getByLabelText("Actionnaire")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Nombre d'actions à émettre")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Prix par action (€)")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <IssueSharesModal
        isOpen={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByText("Émettre des actions")).not.toBeInTheDocument();
  });

  it("shows error when submitting without required fields", async () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const submitButton = screen.getByText("Émettre");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Veuillez sélectionner un actionnaire")
      ).toBeInTheDocument();
    });
  });

  it("shows error for invalid number of shares", async () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Sélectionner un actionnaire
    const shareholderSelect = screen.getByLabelText("Actionnaire");
    fireEvent.click(shareholderSelect);

    // Attendre que les options apparaissent et cliquer sur la première
    await waitFor(() => {
      const option = screen.getByText("Jean Dupont (1000 actions)");
      fireEvent.click(option);
    });

    // Entrer un nombre d'actions invalide
    const sharesInput = screen.getByLabelText("Nombre d'actions à émettre");
    fireEvent.change(sharesInput, { target: { value: "-100" } });

    const submitButton = screen.getByText("Émettre");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Le nombre d'actions doit être un nombre positif")
      ).toBeInTheDocument();
    });
  });

  it("shows error for invalid price", async () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Sélectionner un actionnaire
    const shareholderSelect = screen.getByLabelText("Actionnaire");
    fireEvent.click(shareholderSelect);

    await waitFor(() => {
      const option = screen.getByText("Jean Dupont (1000 actions)");
      fireEvent.click(option);
    });

    // Entrer des données valides pour les actions
    const sharesInput = screen.getByLabelText("Nombre d'actions à émettre");
    fireEvent.change(sharesInput, { target: { value: "100" } });

    // Entrer un prix invalide
    const priceInput = screen.getByLabelText("Prix par action (€)");
    fireEvent.change(priceInput, { target: { value: "-10" } });

    const submitButton = screen.getByText("Émettre");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Le prix doit être un nombre positif")
      ).toBeInTheDocument();
    });
  });

  it("submits successfully with valid data", async () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Sélectionner un actionnaire
    const shareholderSelect = screen.getByLabelText("Actionnaire");
    fireEvent.click(shareholderSelect);

    await waitFor(() => {
      const option = screen.getByText("Jean Dupont (1000 actions)");
      fireEvent.click(option);
    });

    // Entrer des données valides
    const sharesInput = screen.getByLabelText("Nombre d'actions à émettre");
    fireEvent.change(sharesInput, { target: { value: "100" } });

    const priceInput = screen.getByLabelText("Prix par action (€)");
    fireEvent.change(priceInput, { target: { value: "25.50" } });

    const submitButton = screen.getByText("Émettre");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Émission en cours...")).toBeInTheDocument();
    });

    // Attendre que l'émission soit terminée
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          shareholderId: "1",
          numberOfShares: 100,
          price: 25.5,
        })
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const cancelButton = screen.getByText("Annuler");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("disables form inputs during submission", async () => {
    render(
      <IssueSharesModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Sélectionner un actionnaire et entrer des données
    const shareholderSelect = screen.getByLabelText("Actionnaire");
    fireEvent.click(shareholderSelect);

    await waitFor(() => {
      const option = screen.getByText("Jean Dupont (1000 actions)");
      fireEvent.click(option);
    });

    const sharesInput = screen.getByLabelText("Nombre d'actions à émettre");
    const priceInput = screen.getByLabelText("Prix par action (€)");

    fireEvent.change(sharesInput, { target: { value: "100" } });
    fireEvent.change(priceInput, { target: { value: "25.50" } });

    const submitButton = screen.getByText("Émettre");
    fireEvent.click(submitButton);

    // Vérifier que les champs sont désactivés pendant la soumission
    await waitFor(() => {
      expect(sharesInput).toBeDisabled();
      expect(priceInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });
});
