// fe9be6004096bb1f82a6015a9e14be8c
// https://api.themoviedb.org/3/person/popular
let imageURL =  'https://image.tmdb.org/t/p/original'

let token = 'eyJhbGciOiJIUzI1NiJ9.// https://api.themoviedb.org/3/person/popular.amnc8FjVlbX949GLcoTmuaC1NZ7HbhEvn8dRm0V-c34'
let headers = {
    'Authorization': `Bearer ${token}`        
}
async function getPopularMovies() {
    let response = await fetch(
    'https://api.themoviedb.org/3/person/popular',
        {
            headers,
        }
    )
    let data = await response.json();
    console.log(data);
    data.results.forEach((movieData) => {
        renderMovieCard(movieData);
    })
}
getPopularMovies();
let movieCardTemplate = document.querySelector('#movie_card')
let list = document.querySelector('.list')

function renderMovieCard(movieData){
    let newCard = movieCardTemplate.cloneNode(true);
    newCard.content.querySelector('.poster > img').src = imageURL + movieData.profile_path;
    list.appendChild(newCard.content);

}
