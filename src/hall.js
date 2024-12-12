// Функция для получения параметров из URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
  
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  }
  
  // Получаем параметры из URL
  const params = getQueryParams();
  
  // Отображаем название фильма и время сеанса
  const filmTitle = params.film || 'Неизвестный фильм';
  const sessionTime = params.time || 'Неизвестное время';
  
  // Находим элементы на странице для отображения информации
  const filmElement = document.getElementById('film-title');
  const timeElement = document.getElementById('session-time');
  
  // Устанавливаем текст в элементы
  timeElement.textContent = `Начало сеанса: ${sessionTime}`;
  
  const urlParams = new URLSearchParams(window.location.search);
  const film = urlParams.get('film');
  const filmTitles = {
    'star-wars': 'Звёздные войны XXIII: Атака клонированных клонов',
    'alpha': 'Альфа',
    'predator': 'Хищник'
  };
  document.getElementById('film-title').innerHTML = filmTitles[film];
  
  let selectedSeats = {
    ordinary: [],
    vip: []
  };
  let movieTitle = filmTitles[film]; // Пример значения
  let hallNumber = 1; // Пример значения
  let showtime = sessionTime; // Используем время сеанса из URL-параметра
  let totalPrice = 0; // Пример значения
  
  // Функция для обновления стиля места
  function updateChairStyle(chair) {
    const status = chair.dataset.status;
  
    switch (status) {
      case 'available':
        chair.style.backgroundColor = '#FFFFFF';
        break;
      case 'booked':
        chair.style.backgroundColor = '#525252';
        break;
      case 'vip':
        chair.style.backgroundColor = '#F9953A';
        break;
      case 'selected':
        chair.style.backgroundColor = '#25C4CE';
        break;
      default:
        chair.style.backgroundColor = '';
    }
  }
  
  // Функция для расчета общей стоимости
  function calculateTotalPrice() {
    let totalPrice = 0;
    selectedSeats.ordinary.forEach(seat => {
      totalPrice += seat.price;
    });
    selectedSeats.vip.forEach(seat => {
      totalPrice += seat.price;
    });
    return totalPrice;
  }
  
  // Находим все места на странице
  const chairs = document.querySelectorAll('.buying-scheme__chair');
  
  // Добавляем обработчики кликов на места
  chairs.forEach(chair => {
    updateChairStyle(chair);
  
    chair.addEventListener('click', function() {
      if (this.dataset.status !== 'booked') {
        if (this.dataset.status === 'selected') {
          // Убираем место из выбранных
          this.dataset.status = 'available';
          if (this.dataset.price === '250') {
            selectedSeats.ordinary = selectedSeats.ordinary.filter(seat => seat.seatNumber !== this.dataset.chairId);
          } else if (this.dataset.price === '350') {
            selectedSeats.vip = selectedSeats.vip.filter(seat => seat.seatNumber !== this.dataset.chairId);
          }
        } else {
          // Добавляем место в выбранные
          this.dataset.status = 'selected';
          if (this.dataset.price === '250') {
            selectedSeats.ordinary.push({ seatNumber: this.dataset.chairId, price: this.dataset.price });
          } else if (this.dataset.price === '350') {
            selectedSeats.vip.push({ seatNumber: this.dataset.chairId, price: this.dataset.price });
          }
        }
        updateChairStyle(this);
        totalPrice = calculateTotalPrice();
      }
    });
  });
  
  // Добавляем обработчик клика на кнопку
  document.querySelector('button').addEventListener('click', function() {
    if (selectedSeats.ordinary.length > 0 || selectedSeats.vip.length > 0 || Object.keys(selectedSeats).length > 0) {
      // Сохраняем данные в localStorage
      localStorage.setItem('movieTitle', movieTitle);
      localStorage.setItem('hallNumber', hallNumber);
      localStorage.setItem('showtime', showtime);
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      localStorage.setItem('ticketPrice', totalPrice);
  
      // Переход на страницу бронирования
      window.location.href = 'booking.html';
    } else {
      alert('Пожалуйста, выберите хотя бы одно место.');
    }
  });