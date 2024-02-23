document.addEventListener('DOMContentLoaded', () => {
    const producersList = document.getElementById('producers-list');
    const moviesContainer = document.getElementById('movies-container');

    // Lista estática de filmes
    const movies = [
        { title: 'Homem de Ferro', producer: 'Marvel', poster_path: 'path/to/homem-de-ferro.jpg' },
        { title: 'Capitão América: O Primeiro Vingador', producer: 'Marvel', poster_path: 'path/to/capitao-america.jpg' },
        { title: 'Batman Begins', producer: 'DC', poster_path: 'path/to/batman-begins.jpg' },
        { title: 'Mulher-Maravilha', producer: 'DC', poster_path: 'path/to/mulher-maravilha.jpg' },
        // Adicione mais filmes conforme necessário
    ];

    // Obtém a lista de produtoras únicas
    const uniqueProducers = [...new Set(movies.map(movie => movie.producer))];

    // Cria links para as produtoras
    uniqueProducers.forEach(producer => {
        const producerLink = document.createElement('a');
        producerLink.href = `${producer.toLowerCase()}.html`;
        producerLink.textContent = producer;

        const producerItem = document.createElement('li');
        producerItem.appendChild(producerLink);
        producersList.appendChild(producerItem);
    });

    // Inicialmente, mostra todos os filmes
    showMoviesByProducer(null, movies);
});

function showMoviesByProducer(producer, movies) {
    const filteredMovies = producer ? movies.filter(movie => movie.producer === producer) : movies;

    // Atualiza o nome da produtora na página
    const produtoraName = document.getElementById('produtora-name');
    produtoraName.textContent = producer ? `Filmes da ${producer}` : 'Filmes por Produtora';

    // Limpa o conteúdo atual
    moviesContainer.innerHTML = '';

    // Cria cartões de filme para cada produtora
    filteredMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const posterPath = movie.poster_path; // Adicione o caminho correto para suas imagens
    const moviePoster = document.createElement('img');
    moviePoster.src = posterPath;
    moviePoster.alt = movie.title;
    moviePoster.classList.add('movie-poster');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add('movie-title');

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieTitle);

    return movieCard;
}
