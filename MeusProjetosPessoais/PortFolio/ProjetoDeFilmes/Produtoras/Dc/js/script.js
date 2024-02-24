document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '500d008d084d3903b3cb4305c1adbe9b';
    const baseUrl = 'https://api.themoviedb.org/3';
    const dcMovies = [
        { title: 'Man of Steel', releaseDate: '2013-06-14' },
        { title: 'Batman v Superman: Dawn of Justice', releaseDate: '2016-03-25' },
        { title: 'Suicide Squad', releaseDate: '2016-08-05' },
        { title: 'Wonder Woman', releaseDate: '2017-06-02' },
        { title: 'Justice League', releaseDate: '2017-11-17' },
        { title: 'Aquaman', releaseDate: '2018-12-21' },
        { title: 'Shazam!', releaseDate: '2019-04-05' },
        { title: 'Birds of Prey', releaseDate: '2020-02-07' },
        { title: 'Wonder Woman 1984', releaseDate: '2020-12-25' },
        { title: 'Zack Snyder\'s Justice League', releaseDate: '2021-03-18' },
        { title: 'The Suicide Squad', releaseDate: '2021-08-05' },
        { title: 'Black Adam', releaseDate: '2022-10-21' },
        { title: 'The Flash', releaseDate: '2023-06-23' },
        { title: 'Shazam! Fury of the Gods', releaseDate: '2023-11-02' },
        { title: 'Aquaman and the Lost Kingdom', releaseDate: '2023-12-22' },
        { title: 'Wonder Woman 3', releaseDate: '2024-12-13' },
        { title: 'Green Lantern Corps', releaseDate: '2025-06-24' },
        { title: 'The Batman', releaseDate: '2022-03-04' },
        { title: 'Black Canary', releaseDate: '2023-08-04' },
        { title: 'Blue Beetle', releaseDate: '2023-11-16' },
        { title: 'Batgirl', releaseDate: '2024-05-16' },
        { title: 'Supergirl', releaseDate: '2025-02-14' },
        { title: 'New Gods', releaseDate: '2025-07-10' },
        { title: 'Gotham City Sirens', releaseDate: '2026-03-27' },
        { title: 'Justice League Dark', releaseDate: '2026-08-06' },
        { title: 'Booster Gold', releaseDate: '2026-11-20' },
        { title: 'The Trench', releaseDate: '2023-12-22' },
        { title: 'Justice League 2', releaseDate: '2027-06-25' },
        { title: 'The New Gods', releaseDate: '2027-11-19' },
        // Adicione mais filmes conforme necessário
    ];

    dcMovies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    displayMovies(dcMovies, apiKey, baseUrl);
});

// Função para exibir filmes na página
async function displayMovies(movies, apiKey, baseUrl) {
    const moviesContainer = document.getElementById('moviesContainer');

    for (const movie of movies) {
        try {
            const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.title)}`);
            const data = await response.json();

            // Pegando o primeiro resultado da busca
            const firstResult = data.results[0];

            if (firstResult) {
                const movieCard = createMovieCard(firstResult, movie, apiKey, baseUrl);
                moviesContainer.appendChild(movieCard);
            } else {
                console.error(`Filme não encontrado: ${movie.title}`);
            }
        } catch (error) {
            console.error(`Erro ao buscar detalhes do filme ${movie.title}:`, error);
        }
    }
}

// Função para criar um card de filme
function createMovieCard(result, movie, apiKey, baseUrl) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movieCard');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
    img.alt = `${movie.title} Poster`;

    const title = document.createElement('h3');
    title.textContent = `${movie.title} (${movie.releaseDate})`;

    movieCard.appendChild(img);
    movieCard.appendChild(title);

    // Adicionando evento de clique para exibir a sinopse
    movieCard.addEventListener('click', async () => {
        // Carregar detalhes do filme para obter a sinopse
        const detailsResponse = await fetch(`${baseUrl}/movie/${result.id}?api_key=${apiKey}`);
        const detailsData = await detailsResponse.json();

        // Exibir a sinopse
        showMovieDetails(movie, detailsData);
    });

    return movieCard;
}

// Função para exibir detalhes do filme (sinopse)
function showMovieDetails(movie, detailsData) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`;
    img.alt = `${movie.title} Poster`;

    const title = document.createElement('h2');
    title.textContent = `${movie.title} (${movie.releaseDate})`;

    const overview = document.createElement('p');
    overview.textContent = detailsData.overview;

    modalContent.appendChild(img);
    modalContent.appendChild(title);
    modalContent.appendChild(overview);

    modal.appendChild(modalContent);

    // Adicionando evento de clique fora do modal para fechar
    modal.addEventListener('click', () => {
        modal.remove();
    });

    document.body.appendChild(modal);
}
