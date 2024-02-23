document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '500d008d084d3903b3cb4305c1adbe9b';
    const baseUrl = 'https://api.themoviedb.org/3';
    const marvelMovies = [
        { title: 'Captain America: The First Avenger', releaseDate: '1942-03-13' },
        { title: 'Captain Marvel', releaseDate: '1995-03-08' },
        { title: 'Iron Man', releaseDate: '2010-05-02' },
        { title: 'Iron Man 2', releaseDate: '2011-05-07' },
        { title: 'The Incredible Hulk', releaseDate: '2011-05-07' },
        { title: 'Thor', releaseDate: '2011-05-06' },
        { title: 'The Avengers', releaseDate: '2012-05-04' },
        { title: 'Iron Man 3', releaseDate: '2012-12-25' },
        { title: 'Thor: The Dark World', releaseDate: '2013-11-08' },
        { title: 'Captain America: The Winter Soldier', releaseDate: '2014-04-04' },
        { title: 'Guardians of the Galaxy', releaseDate: '2014-08-01' },
        { title: 'Avengers: Age of Ultron', releaseDate: '2015-05-01' },
        { title: 'Ant-Man', releaseDate: '2015-07-17' },
        { title: 'Captain America: Civil War', releaseDate: '2016-05-06' },
        { title: 'Doctor Strange', releaseDate: '2016-11-04' },
        { title: 'Guardians of the Galaxy Vol. 2', releaseDate: '2017-05-05' },
        { title: 'Spider-Man: Homecoming', releaseDate: '2017-07-07' },
        { title: 'Thor: Ragnarok', releaseDate: '2017-11-03' },
        { title: 'Black Panther', releaseDate: '2018-02-16' },
        { title: 'Avengers: Infinity War', releaseDate: '2018-04-27' },
        { title: 'Ant-Man and the Wasp', releaseDate: '2018-07-06' },
        { title: 'Captain Marvel', releaseDate: '2019-03-08' },
        { title: 'Avengers: Endgame', releaseDate: '2019-04-26' },
        { title: 'Spider-Man: Far From Home', releaseDate: '2019-07-02' },
        { title: 'Black Widow', releaseDate: '2021-07-09' },
        { title: 'Shang-Chi and the Legend of the Ten Rings', releaseDate: '2023-09-03' },
        { title: 'Eternals', releaseDate: '2023-11-05' },
        { title: 'Spider-Man: No Way Home', releaseDate: '2023-12-17' },
        { title: 'Doctor Strange in the Multiverse of Madness', releaseDate: '2024-05-06' },
        { title: 'Thor: Love and Thunder', releaseDate: '2024-07-08' },
        { title: 'Black Panther: Wakanda Forever', releaseDate: '2024-11-11' },
        { title: 'Ant-Man and the Wasp: Quantumania', releaseDate: '2025-02-17' },
        { title: 'Guardians of the Galaxy Vol. 3', releaseDate: '2025-05-05' },
        { title: 'The Marvels', releaseDate: '2025-11-10' },
        { title: 'Deadpool & Wolverine', releaseDate: '2024-07-26' },
        { title: 'Captain America: Brave New World', releaseDate: '2025-02-14' },
        { title: 'Thunderbolts', releaseDate: '2025-05-02' },
        { title: 'The Fantastic Four', releaseDate: '2025-07-25' },
        { title: 'Blade', releaseDate: '2025-11-07' },
        { title: 'Avengers 5', releaseDate: '2026-05-01' },
        { title: 'Avengers: Secret Wars', releaseDate: '2027-05-07' },
        // Adicione mais filmes conforme necessário
    ];

    // Ordenar os filmes por data de lançamento
    marvelMovies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    // Chamando função para exibir filmes na página
    displayMovies(marvelMovies, apiKey, baseUrl);
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
                const movieCard = document.createElement('div');
                movieCard.classList.add('movieCard');

                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`;
                img.alt = `${movie.title} Poster`;

                const title = document.createElement('h3');
                title.textContent = `${movie.title} (${movie.releaseDate})`;

                movieCard.appendChild(img);
                movieCard.appendChild(title);
                moviesContainer.appendChild(movieCard);
            } else {
                console.error(`Filme não encontrado: ${movie.title}`);
            }
        } catch (error) {
            console.error(`Erro ao buscar detalhes do filme ${movie.title}:`, error);
        }
    }
}
