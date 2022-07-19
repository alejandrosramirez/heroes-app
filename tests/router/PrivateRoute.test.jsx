import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context";
import { PrivateRoute } from "../../src/router";

describe("Pruebas en <PrivateRoute />", () => {
	test("Debe de mostrar el children si no esta autenticado", () => {
		Storage.prototype.setItem = jest.fn();
		const value = {
			logged: true,
			user: {
				id: "ABC",
				name: "Alex Salgado",
			},
		};
		render(
			<AuthContext.Provider value={value}>
				<MemoryRouter initialEntries={["/search?a=batman"]}>
					<PrivateRoute>
						<h1>Ruta privada</h1>
					</PrivateRoute>
				</MemoryRouter>
			</AuthContext.Provider>
		);
		expect(screen.getByText("Ruta privada")).toBeTruthy();
		expect(localStorage.setItem).toHaveBeenCalledWith(
			"lastPath",
			"/search?a=batman"
		);
	});
});
