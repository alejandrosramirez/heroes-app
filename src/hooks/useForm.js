import { useState } from "react";

export const useForm = (value = {}) => {
	const [formState, setFormState] = useState(value);

	const onChange = ({ target }) => {
		const { name, value } = target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onReset = () => {
		setFormState(value);
	};

	return {
		...formState,
		formState,
		onChange,
		onReset,
	};
};
