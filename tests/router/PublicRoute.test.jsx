import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router";

describe("Pruebas en <PublicRoute />", () => {
	test("Debe de mostrar el children si no esta autenticado", () => {
		const value = {
			logged: false,
		};
		render(
			<AuthContext.Provider value={{ value }}>
				<PublicRoute>
					<h1>Ruta pública</h1>
				</PublicRoute>
			</AuthContext.Provider>
		);
		expect(screen.getByText("Ruta pública")).toBeTruthy();
	});

	test("Debe de navegar si esta autenticado", () => {
		const value = {
			logged: true,
			user: {
				id: "ABC",
				name: "Alex Salgado",
			},
		};
		render(
			<AuthContext.Provider value={{ value }}>
				<MemoryRouter>
					<PublicRoute>
						<h1>Ruta pública</h1>
					</PublicRoute>
				</MemoryRouter>
			</AuthContext.Provider>
		);

	});
});
