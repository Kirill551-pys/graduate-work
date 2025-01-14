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
  
  const params = getQueryParams();

  const filmTitle = params.film || 'Неизвестный фильм';
  const sessionTime = params.time || 'Неизвестное время';

  const filmElement = document.getElementById('film-title');
  const timeElement = document.getElementById('session-time');

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
  
  const chairs = document.querySelectorAll('.buying-scheme__chair');
  
  chairs.forEach(chair => {
    updateChairStyle(chair);
  
    chair.addEventListener('click', function() {
      if (this.dataset.status !== 'booked') {
        if (this.dataset.status === 'selected') {
          this.dataset.status = 'available';
          if (this.dataset.price === '250') {
            selectedSeats.ordinary = selectedSeats.ordinary.filter(seat => seat.seatNumber !== this.dataset.chairId);
          } else if (this.dataset.price === '350') {
            selectedSeats.vip = selectedSeats.vip.filter(seat => seat.seatNumber !== this.dataset.chairId);
          }
        } else {
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
  
  document.querySelector('button').addEventListener('click', function() {
    if (selectedSeats.ordinary.length > 0 || selectedSeats.vip.length > 0 || Object.keys(selectedSeats).length > 0) {
      localStorage.setItem('movieTitle', movieTitle);
      localStorage.setItem('hallNumber', hallNumber);
      localStorage.setItem('showtime', showtime);
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      localStorage.setItem('ticketPrice', totalPrice);
  
      window.location.href = 'booking.html';
    } else {
      alert('Пожалуйста, выберите хотя бы одно место.');
    }
  });