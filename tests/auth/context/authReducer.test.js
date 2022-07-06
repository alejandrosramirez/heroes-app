import { authReducer } from "../../../src/auth/context";
import { types } from "../../../src/auth";

describe("Pruebas en authReducer", () => {
	test("Debe de retornar el estado por defecto", () => {
		const newState = authReducer({ logged: false }, {});
		expect(newState).toEqual({ logged: false });
	});

	test("Debe de llamar al login y establecer el usuario", () => {
		const action = {
			type: types.login,
			payload: {
				id: "ABC",
				name: "Alex Salgado",
			},
		};
		const newState = authReducer({ logged: false }, action);
		expect(newState).toEqual({
			logged: true,
			user: action.payload,
		});
	});

	test("Debe de borrar en nombre del usuario y logged en false", () => {
		const state = {
			logged: true,
			user: {
				id: "ABC",
				name: "Alex Salgado",
			},
		};
		const action = {
			type: types.logout,
		};
		const newState = authReducer(state, action);
		expect(newState).toEqual({ logged: false });
	});
});
