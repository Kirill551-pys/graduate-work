const movieTitle = localStorage.getItem('movieTitle');
const hallNumber = localStorage.getItem('hallNumber');
const showtime = localStorage.getItem('showtime');
const selectedSeats = localStorage.getItem('selectedSeats');
const ticketPrice = localStorage.getItem('ticketPrice');

const filmTitleElement = document.getElementById('film-title');
const hallNumberElement = document.getElementById('hall-number');
const seatsElement = document.querySelector('.ticket__info_2 span');
const showtimeElement = document.querySelector('.ticket__info_4 span');
const priceElement = document.querySelector('.ticket__info_5 span');

filmTitleElement.textContent = movieTitle;
hallNumberElement.textContent = hallNumber;
seatsElement.textContent = selectedSeats;
showtimeElement.textContent = showtime;
priceElement.textContent = `${ticketPrice} рублей`;