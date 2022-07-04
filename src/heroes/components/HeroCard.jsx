import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => {
	if (alter_ego === characters) {
		return <></>;
	}

	return <p>{characters}</p>;
};

export const HeroCard = ({
	id,
	superhero,
	publisher,
	alter_ego,
	first_appearance,
	characters,
}) => {
	const heroImageUrl = `/assets/heroes/${id}.jpg`;

	return (
		<div className="col animate__animated animate__fadeIn">
			<div className="card">
				<div className="row no-gutters">
					<div className="col-4">
						<img
							className="card-img"
							src={heroImageUrl}
							alt={superhero}
						/>
					</div>

					<div className="col-8">
						<div className="card-body">
							<h5 className="card-title">{superhero}</h5>
							<p className="card-text">{alter_ego}</p>

							<CharactersByHero
								alter_ego={alter_ego}
								characters={characters}
							/>

							<p className="card-text">
								<small className="text-muted">
									{first_appearance}
								</small>
							</p>

							<p className="card-text">
								<small className="text-muted">
									{publisher}
								</small>
							</p>

							<Link to={`/hero/${id}`}>Más...</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

HeroCard.propTypes = {
	id: PropTypes.string.isRequired,
	superhero: PropTypes.string.isRequired,
	publisher: PropTypes.string.isRequired,
	alter_ego: PropTypes.string.isRequired,
	first_appearance: PropTypes.string.isRequired,
	characters: PropTypes.string.isRequired,
};
