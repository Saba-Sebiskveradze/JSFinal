// fe9be6004096bb1f82a6015a9e14be8c
// https://api.themoviedb.org/3/person/popular
// search https://api.themoviedb.org/3/search/movie

let imageURL =  'https://image.tmdb.org/t/p/original'

let token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTliZTYwMDQwOTZiYjFmODJhNjAxNWE5ZTE0YmU4YyIsInN1YiI6IjY1YWJkOWIwMWYzZTYwMDBhNWZlYjAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.amnc8FjVlbX949GLcoTmuaC1NZ7HbhEvn8dRm0V-c34'
let headers = {
    'Authorization': `Bearer ${token}` ,   
    'accept': 'application/json'    
}
async function getPopularMovies() {
    let response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
            headers,
        }
    )
    let data = await response.json();
    console.log(data);
    list.textContent = ""
    data.results.forEach((movieData) => {
        renderMovieCard(movieData);
    })
}
async function searchMovie(name = ''){
    let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${name}`,
            {
                headers,
            }
        )
        let data = await response.json();
        list.textContent = "";

        data.results.forEach(movieData => {
            renderMovieCard(movieData)
        })
}
getPopularMovies();


getPopularMovies();
let movieCardTemplate = document.querySelector('#movie_card')
let list = document.querySelector('.list');
let movieSearchForm = document.querySelector('#search')

movieSearchForm.search.addEventListener('input', debaunce(1000, () =>{
    let movieName = movieSearchForm.search.value;
    if(movieName !== ""){
        searchMovie(movieName);

    }else{
        getPopularMovies()
    }
}))

function renderMovieCard(movieData){
    let newCard = movieCardTemplate.cloneNode(true);
    newCard.content.querySelector('.poster > img').src = imageURL + movieData.poster_path;
    newCard.content.querySelector('.about > .title').textContent = movieData.title
    newCard.content.querySelector('.about > .rating').textContent = `${movieData.vote_average.toFixed(1)}/10`
    list.appendChild(newCard.content);


}
function debaunce(delay, callback){
    let timeoutId;
    return () => {
        clearInterval(timeoutId)
        timeoutId = setTimeout(() => {
            callback();
        }, delay)
    }
}
