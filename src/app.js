const days = document.querySelectorAll('.day');
const arrow = document.getElementById('scroll-arrow');

let currentIndex = 0; 

days[currentIndex].classList.add('selected');

days.forEach(day => {
    day.addEventListener('click', function() {
        days.forEach(d => d.classList.remove('selected'));
        this.classList.add('selected');
        const selectedDate = this.getAttribute('data-date');
        fetchSessionsForDate(selectedDate);
    });
});

arrow.addEventListener('click', function() {
    if (currentIndex < days.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }

    days.forEach(day => day.classList.remove('selected'));
    days[currentIndex].classList.add('selected');

    const selectedDate = days[currentIndex].getAttribute('data-date');
    fetchSessionsForDate(selectedDate);
});

function fetchSessionsForDate(date) {
    const url = `https://shfe-diplom.neto-server.ru/alldata?date=${date}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Данные сеансов:", data.result);
                updateSessionsDisplay(data.result); 
            } else {
                console.error("Ошибка:", data.error);
                alert("Произошла ошибка: " + data.error);
            }
        })
        .catch(error => {
            console.error("Сетевая ошибка:", error);
            alert("Произошла сетевая ошибка. Пожалуйста, попробуйте позже.");
        });
}

function updateSessionsDisplay(sessions) {
    const sessionsContainer = document.getElementById('sessions');
    sessionsContainer.innerHTML = '';
    if (sessions && sessions.length > 0) {
        sessions.forEach(session => {
            const sessionElement = document.createElement('div');
            sessionElement.classList.add('session'); 
            sessionElement.textContent = `Сеанс: ${session.time} - ${session.title}`; 
            sessionsContainer.appendChild(sessionElement);
        });
    } else {
        sessionsContainer.textContent = 'Нет доступных сеансов на выбранную дату.';
    }
}
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