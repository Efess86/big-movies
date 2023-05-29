import React, { useEffect, useState } from 'react'
import MainCss from './Main.module.css';

function Movies() {
	const [movies, setMovies] = useState([]);
	console.log(movies);
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODRhOWQ1NmViNTA1YzMzMmY4ZDA4Y2E0MWY5MmFlYiIsInN1YiI6IjY0NzIwYTU0ODgxM2U0MDE0NTJjZTZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUreRaXYpoEvyQKZVraJS9orKWLcL5vqbFfnAU8PcXQ'
		}
	};

	const imageURL = 'https://image.tmdb.org/t/p/w500/';

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
			.then(response => response.json())
			.then(data => setMovies(data))
			.catch(err => console.error(err));
	}, [])


	return (
		<div className={MainCss.movies}>
			{movies.results
				? (movies.results.map(({
					id,
					title,
					poster_path,
					popularity,
					release_date,
					vote_average,
				}, i) => (
					<div key={id} className={MainCss.movieCard}>
						<img src={imageURL + poster_path} alt={title} className={MainCss.image} />
						<h2>{i + 1} : {title}</h2>
						<div className={MainCss.movieInfo}>
							<p>Votes: {popularity}</p>
							<p>Stars: {vote_average}</p>
							<p>Release date: {release_date}</p>
						</div>
					</div>
				)))
				: (<div>loading...</div>)
			}
		</div>
	)
}

export default Movies