import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { q = "" } = queryString.parse(location.search);

	const heroes = getHeroesByName(q);

	const showSearch = q.length === 0;
	const showError = q.length > 0 && heroes.length === 0;

	const { onChange, search } = useForm({
		search: q,
	});

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		navigate(`?q=${search.toLowerCase().trim()}`);
	};

	return (
		<>
			<h1>Search Page</h1>

			<hr />

			<div className="row">
				<div className="col-5">
					<h4>Searching</h4>

					<hr />

					<form onSubmit={handleSearchSubmit} aria-label="form">
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

					{/* {
						q === ""
							?
							<div className="alert alert-primary">
								Search a hero...
							</div>
							: (heroes.length === 0) && (
								<div className="alert alert-danger">
									There's no hero with <b>{q}</b>
								</div>
							)
					} */}

					<div
						className="alert alert-primary animate__animated animate__fadeInLeft"
						style={{ display: showSearch ? "" : "none" }}
					>
						Search a hero...
					</div>

					<div
						className="alert alert-danger animate__animated animate__fadeInLeft"
						style={{ display: showError ? "" : "none" }}
						aria-label="not-found-hero-alert"
					>
						There's no hero with <b>{q}</b>
					</div>

					{heroes.map((hero) => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</>
	);
};
