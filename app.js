const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 3000

require('dotenv').config()

app.use(cors({
  origin: 'http://localhost:8081'
}))


/* IMAGES Endpoints */
app.get('/images/random.dog', (req, res) => {
	axios.get('https://random.dog/woof.json')
		.then(response => {
			res.json(response.data)
		})
		.catch(error => {
			res.send(error.message)
		});
});


app.get('/images/random.cat', (req, res) => {
	axios.get('https://aws.random.cat/meow')
		.then(response => {
			res.json(response.data)
		})
		.catch(error => {
			res.send(error.message)
		});
});

// NOT USED
app.get('/images/picsum.photos/:width/:height/', (req, res) => {
	let width = req.params.width;
	let height = req.params.height;
	let grayscale = req.query.grayscale;
	let blur = req.query.blur;

	axios.get(requestUrl)
		.then(response => {
			res.json(response.data)
		})
		.catch(error => {
			res.send(error.message)
		});
});


/* TV-MOVIES Endpoints */
app.get('/tv-movies/omdb', (req, res) => {
	let movie_title = req.query.s;
	let media_type = req.query.type;
	let release_year = req.query.y;
	let page_number = req.query.page;

	let finalUrl = `http://www.omdbapi.com/?apiKey=${process.env.API_KEY_OMDB}&s=${movie_title}`;
	if (media_type) {
		finalUrl += `&type=${media_type}`;
	}
	if (release_year) {
		finalUrl += `&y=${release_year}`;
	}
	if (page_number) {
		finalUrl += `&page=${page_number}`;
	}

	axios.get(finalUrl)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});


app.get('/tv-movies/tmdb/movie', (req, res) => {
	let movie_title = req.query.query;
	let release_year = req.query.primary_release_year;
	let page_number = req.query.page;

	let finalUrl = `https://api.themoviedb.org/3/search/movie?query=${movie_title}&api_key=${process.env.API_KEY_TMDB}`;
	if (release_year) {
		finalUrl += `&primary_release_year=${release_year}`;
	}
	if (page_number) {
		finalUrl += `&page=${page_number}`;
	}

	axios.get(finalUrl)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});


app.get('/tv-movies/tmdb/tv', (req, res) => {
	let tv_title = req.query.query;
	let year = req.query.first_air_date_year;
	let page_number = req.query.page;

	let finalUrl = `https://api.themoviedb.org/3/search/tv?query=${tv_title}&api_key=${process.env.API_KEY_TMDB}`;
	if (year) {
		finalUrl += `&first_air_date_year=${year}`;
	}
	if (page_number) {
		finalUrl += `&page=${page_number}`;
	}

	axios.get(finalUrl)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});


app.get('/tv-movies/tmdb/people', (req, res) => {
	let person_name = req.query.query;
	let page_number = req.query.page;

	let finalUrl = `https://api.themoviedb.org/3/search/person?query=${person_name}&api_key=${process.env.API_KEY_TMDB}`;
	if (page_number) {
		finalUrl += `&page=${page_number}`;
	}
	
	axios.get(finalUrl)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});


/* DICTIONARIES Endpoints */
app.get('/dictionaries/owlbot', (req, res) => {
	let word = req.query.word;
	axios.get(`https://owlbot.info/api/v4/dictionary/${word}`, {
		headers: {
			'Authorization': `Token ${process.env.API_KEY_OWLBOT}`
		}
		})
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});


app.get('/dictionaries/merriam-webster', (req, res) => {
	let word = req.query.word;
	
	axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.API_KEY_MERRIAM_WEBSTER}`)
		.then(response => {
			res.json(response.data);
		})
		.catch(error => {
			res.send(error.message);
		});
});




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))