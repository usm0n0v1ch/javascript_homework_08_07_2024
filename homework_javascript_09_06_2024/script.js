let films = [];
let currentPage = 1;


function getFilmsFromPage(page) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '7ba953f9-6fb0-47d4-b793-e8f12c0d4441',
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        films = data.films;
        displayFilms(films); 
    });
}


function displayFilms(films) {
    const filmsContainer = document.getElementById('filmsContainer');
    filmsContainer.innerHTML = '';

    films.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.classList.add('main_block');
        filmElement.innerHTML = `
            <div class="poster">
                <img src="${film.posterUrl}" alt="${film.nameRu}">
            </div>
            <div class="name">Название: ${film.nameRu}</div>
            <div class="genre">Жанр: ${film.genres.map(g => g.genre).join(', ')}</div>
            <div class="published">Год выпуска: ${film.year}</div>
            <button onclick="openModal('${film.nameRu}', '${film.posterUrl}', '${film.genres.map(g => g.genre).join(', ')}', '${film.year}', '${film.rating}')">Подробнее</button>
        `;
        filmsContainer.appendChild(filmElement);
    });
}

function loadNextPage() {
    currentPage++;
    getFilmsFromPage(currentPage);
}


function loadPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        getFilmsFromPage(currentPage);
    }
}

function openModal(name, posterUrl, genres, year, rating) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="poster">
            <img src="${posterUrl}" alt="${name}">
        </div>
        <div>Название: ${name}</div>
        <div>Жанр: ${genres}</div>
        <div>Год выпуска: ${year}</div>
        <div>Рейтинг: ${rating}</div>
    `;

    const modal = document.getElementById('filmModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('filmModal');
    modal.style.display = 'none';
}


getFilmsFromPage(currentPage);
