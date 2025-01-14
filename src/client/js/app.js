const moviesContainer = document.getElementById('movies-container');
const hallsContainer = document.getElementById('halls-container');

// Функция для загрузки данных
function fetchData() {
    fetch('https://shfe-diplom.neto-server.ru/alldata')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Логируем все данные
        console.log(data.result); // Логируем только результат
        if (data.success) {
            const films = data.result.films || [];
            const halls = data.result.halls || [];
            const seances = data.result.seances || [];

            displayMovies(films); // Получаем фильмы
            displayHalls(halls);   // Получаем залы
            displaySeances(seances, films, halls); // Получаем сеансы
        } else {
            console.error('Ошибка:', data.error);
        }
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
}

// Функция для отображения фильмов
function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых фильмов

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';

        const img = document.createElement('img');
        img.src = movie.film_poster; // URL постера фильма
        img.alt = movie.film_name; // Альтернативный текст для изображения

        const title = document.createElement('h2');
        title.textContent = movie.film_name; // Название фильма

        const description = document.createElement('p');
        description.textContent = movie.film_description; // Описание фильма

        const duration = document.createElement('p');
        duration.textContent = `Продолжительность: ${movie.film_duration} минут`; // Продолжительность фильма

        const origin = document.createElement('p');
        origin.textContent = `Страна: ${movie.film_origin}`; // Страна производства фильма

        // Добавление всех элементов в контейнер фильма
        movieDiv.appendChild(img);
        movieDiv.appendChild(title);
        movieDiv.appendChild(description);
        movieDiv.appendChild(duration);
        movieDiv.appendChild(origin);
        moviesContainer.appendChild(movieDiv); // Добавление фильма в контейнер
    });
}

function displayHalls(halls) {
    hallsContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых залов

    halls.forEach(hall => {
        const hallDiv = document.createElement('div');
        hallDiv.className = 'hall';

        const title = document.createElement('h2');
        title.textContent = hall.hall_name || 'Неизвестный зал'; // Название зала

        const capacity = document.createElement('p');
        capacity.textContent = `Ряды: ${hall.hall_rows}, Места: ${hall.hall_places}`; // Вместимость зала

        hallDiv.appendChild(title);
        hallDiv.appendChild(capacity);
        hallsContainer.appendChild(hallDiv); // Добавление зала в контейнер
    });
}


function displaySeances(seances, films, halls) {
    const seancesContainer = document.getElementById('seances-container');
    if (!seancesContainer) {
        console.error('Контейнер для сеансов не найден!');
        return;
    }
    seancesContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых сеансов

    if (!Array.isArray(seances) || seances.length === 0) {
        const noSeancesItem = document.createElement('p');
        noSeancesItem.textContent = 'Сеансы не указаны';
        seancesContainer.appendChild(noSeancesItem);
        return;
    }

    seances.forEach(seance => {
        const seanceDiv = document.createElement('div');
        seanceDiv.className = 'seance';

        // Проверка на наличие массива films и halls
        if (!Array.isArray(films) || !Array.isArray(halls)) {
            console.error('Массивы films или halls не определены');
            return;
        }

        // Получаем название фильма по ID
        const film = films.find(f => f.id === seance.seance_filmid);
        const hall = halls.find(h => h.id === seance.seance_hallid);

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = film ? film.film_name : 'Неизвестный фильм'; // Название фильма

        const hallName = document.createElement('p');
        hallName.textContent = `Зал: ${hall ? hall.hall_name : 'Неизвестный зал'}`; // Название зала

        const time = document.createElement('p');
        time.textContent = `Время: ${seance.seance_time || 'Не указано'}`; // Время сеанса

        seanceDiv.appendChild(movieTitle);
        seanceDiv.appendChild(hallName);
        seanceDiv.appendChild(time);
        seancesContainer.appendChild(seanceDiv); // Добавление сеанса в контейнер
    });
}

// Вызов функции для загрузки данных
fetchData();