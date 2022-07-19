import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en <Navbar />", () => {
	const value = {
		logged: true,
		user: {
			id: "ABC",
			name: "Alex Salgado",
		},
		logout: jest.fn(),
	};

	beforeEach(() => jest.clearAllMocks());

	test("Debe de mostrar el nombre de la persona", () => {
		render(
			<AuthContext.Provider value={value}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>
		);
		expect(screen.getByText(value.user.name)).toBeTruthy();
	});

	test("Debe de llamar el logout y navigate cuando se haga click en el botón", () => {
		render(
			<AuthContext.Provider value={value}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>
		);
		const logoutButton = screen.getByRole("button", { name: "Logout" });
		fireEvent.click(logoutButton);
		expect(value.logout).toHaveBeenCalled();
		expect(mockUseNavigate).toHaveBeenCalledWith("/login", { "replace": true });
	});
});
