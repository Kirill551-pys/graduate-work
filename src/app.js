// Получаем все элементы с классом .day
const days = document.querySelectorAll('.day');
const arrow = document.getElementById('scroll-arrow');

let currentIndex = 0; // Индекс текущего дня

// Инициализация: выделяем первый день
days[currentIndex].classList.add('selected');

// Добавляем обработчик событий на каждый элемент дня
days.forEach(day => {
    day.addEventListener('click', function() {
        // Убираем выделение у всех дней
        days.forEach(d => d.classList.remove('selected'));
        
        // Добавляем выделение к выбранному дню
        this.classList.add('selected');

        // Получаем дату из data-атрибута
        const selectedDate = this.getAttribute('data-date');
        
        // Запрашиваем сеансы для выбранной даты
        fetchSessionsForDate(selectedDate);
    });
});

// Обработчик клика на стрелке
arrow.addEventListener('click', function() {
    // Увеличиваем индекс, если он меньше количества дней
    if (currentIndex < days.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Возвращаемся к первому дню
    }

    // Убираем выделение у всех дней и добавляем выделение к текущему
    days.forEach(day => day.classList.remove('selected'));
    days[currentIndex].classList.add('selected');

    // Получаем дату из data-атрибута и запрашиваем сеансы
    const selectedDate = days[currentIndex].getAttribute('data-date');
    fetchSessionsForDate(selectedDate);
});

// Функция для получения сеансов по выбранной дате
function fetchSessionsForDate(date) {
    // Формируем URL для запроса
    const url = `https://shfe-diplom.neto-server.ru/alldata?date=${date}`;

    // Выполняем запрос к API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Обработка успешного ответа
                console.log("Данные сеансов:", data.result);
                updateSessionsDisplay(data.result); // Обновляем отображение сеансов
            } else {
                // Обработка ошибки
                console.error("Ошибка:", data.error);
                alert("Произошла ошибка: " + data.error);
            }
        })
        .catch(error => {
            // Обработка сетевой ошибки
            console.error("Сетевая ошибка:", error);
            alert("Произошла сетевая ошибка. Пожалуйста, попробуйте позже.");
        });
}

// Функция для обновления отображения сеансов на странице
function updateSessionsDisplay(sessions) {
    // Предполагаем, что у вас есть элемент на странице, где нужно отобразить сеансы
    const sessionsContainer = document.getElementById('sessions');
    
    // Очищаем контейнер перед обновлением
    sessionsContainer.innerHTML = '';

    // Если сеансы есть, добавляем их на страницу
    if (sessions && sessions.length > 0) {
        sessions.forEach(session => {
            const sessionElement = document.createElement('div');
            sessionElement.classList.add('session'); // Добавляем класс для стилей
            sessionElement.textContent = `Сеанс: ${session.time} - ${session.title}`; // Пример информации о сеансе
            sessionsContainer.appendChild(sessionElement);
        });
    } else {
        // Если сеансов нет, отображаем сообщение
        sessionsContainer.textContent = 'Нет доступных сеансов на выбранную дату.';
    }
}

// Получаем все элементы с классом .item
const links = document.querySelectorAll('.item a');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const film = this.dataset.film;
        const time = this.dataset.time;
        const url = `hall.html?film=${film}&time=${time}`;
        window.location.href = url;
    });
});