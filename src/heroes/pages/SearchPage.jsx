import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks";
import { HeroCard } from "../components";

export const SearchPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { onChange, search } = useForm({
		search: "",
	});

	const { q = "" } = queryString.parse(location.search);

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		if (search.trim().length <= 1) {
			return;
		}

		navigate(`?q=${search.toLowerCase().trim()}`)
	};

	return (
		<>
			<h1>Search Page</h1>

			<hr />

			<div className="row">
				<div className="col-5">
					<h4>Searching</h4>

					<hr />

					<form onSubmit={handleSearchSubmit}>
						<input
							className="form-control"
							type="text"
							placeholder="Search a hero..."
							name="search"
							autoComplete="off"
							value={search}
							onChange={onChange}
						/>

						<button className="btn btn-outline-primary mt-1">
							Search
						</button>
					</form>
				</div>

				<div className="col-7">
					<h4>Results</h4>

					<hr />

					<div className="alert alert-primary">
						Searching a hero...
					</div>

					<div className="alert alert-danger">
						There's no hero with <b>{q}</b>
					</div>

					{/* <HeroCard /> */}
				</div>
			</div>
		</>
	);
};
