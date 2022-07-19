import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router";

describe("Pruebas en <AppRouter />", () => {
	test("Debe de mostrar el login si no está autenticado", () => {
		const value = {
			logged: false,
		};
		render(
			<MemoryRouter initialEntries={["/marvel"]}>
				<AuthContext.Provider value={value}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);
		expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
	});

	test("Debe de mostrar el componente de marvel si esta autenticado", () => {
		const value = {
			logged: true,
			user: {
				id: "ABC",
				name: "Alex Salgado",
			},
		};
		render(
			<MemoryRouter initialEntries={["/marvel"]}>
				<AuthContext.Provider value={value}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		expect(screen.getAllByText("Marvel Comics").length).toBeGreaterThanOrEqual(1);
	});
});
