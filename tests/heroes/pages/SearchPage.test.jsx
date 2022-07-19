import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en <SearchPage />", () => {
	beforeEach(() => jest.clearAllMocks());

	test("Debe de mostrarse correctamte con valores por defecto", () => {
		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);
		expect(container).toMatchSnapshot();
	});

	test("Debe de mostrar a Batman y el input con el valor del query string", () => {
		render(
			<MemoryRouter initialEntries={["/search?q=batman"]}>
				<SearchPage />
			</MemoryRouter>
		);
		const input = screen.getByRole("textbox");
		expect(input.value).toBe("batman");
		const img = screen.getByRole("img");
		expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
		const searchHeroAlert = screen.getByLabelText("not-found-hero-alert");
		expect(searchHeroAlert.style.display).toBe("none");
	});

	test("Debe de mostrar un error si no se encuentra un héroe (batman123).", () => {
		render(
			<MemoryRouter initialEntries={["/search?q=batman123"]}>
				<SearchPage />
			</MemoryRouter>
		);
		const notFoundHeroAlert = screen.getByLabelText("not-found-hero-alert");
		expect(notFoundHeroAlert.style.display).toBe("");
	});

	test("Debe llamar el navigate a la pantalla nueva", () => {
		const value = "superman";
		render(
			<MemoryRouter initialEntries={["/search"]}>
				<SearchPage />
			</MemoryRouter>
		);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { name: "search", value } });
		const form = screen.getByRole("form");
		fireEvent.submit(form);
		expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${value}`);
	});
});
