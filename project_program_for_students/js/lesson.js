// PHONE VALIDATOR
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER
const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

let currentSlide = 0;
const interval = 5000;

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none';
    });
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tab_content_item_active');
};

const changeSlide = () => {
    hideTabContent();
    showTabContent(currentSlide);
    currentSlide++;

    if (currentSlide === tabs.length) {
        currentSlide = 0;
    }
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(i);
                currentSlide = i;
            }
        });
    }
};

setInterval(changeSlide, interval);

// CONVERTER

// DRY - don`t repeat yourself
// KISS - keep it short and simple

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const euro = document.querySelector('#euro');

const updateCurrencyRates = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://api.exchangerate-api.com/v4/latest/USD");
    request.send();

    request.onload = () => {
        const response = JSON.parse(request.response);
        const usdRate = response.rates.USD;
        const euroRate = response.rates.EUR;
        const inputAmountSOM = parseFloat(som.value);
        const inputAmountUSD = parseFloat(usd.value);
        const inputAmountEUR = parseFloat(euro.value);

        if (!isNaN(inputAmountSOM)) {
            usd.value = (inputAmountSOM / usdRate).toFixed(2);
            euro.value = (inputAmountSOM / euroRate).toFixed(2);
        } else if (!isNaN(inputAmountUSD)) {
            som.value = (inputAmountUSD * usdRate).toFixed(2);
            euro.value = (inputAmountUSD * usdRate / euroRate).toFixed(2);
        } else if (!isNaN(inputAmountEUR)) {
            som.value = (inputAmountEUR * euroRate).toFixed(2);
            usd.value = (inputAmountEUR * euroRate / usdRate).toFixed(2);
        } else {
            som.value = '';
            usd.value = '';
            euro.value = '';
        }
    };
};

som.addEventListener('input', updateCurrencyRates);
usd.addEventListener('input', updateCurrencyRates);
euro.addEventListener('input', updateCurrencyRates);

window.addEventListener('load', updateCurrencyRates);
// CARD SWITCHER

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
let count = 1;

const updateCard = (data) => {
    card.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
    `;
};

const fetchData = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => updateCard(data))
        .catch(error => console.error('Error fetching data:', error));
};

const handlePrevClick = () => {
    count = count === 1 ? 200 : count - 1;
    fetchData(count);
};

const handleNextClick = () => {
    count = count === 200 ? 1 : count + 1;
    fetchData(count);
};

btnPrev.onclick = handlePrevClick;
btnNext.onclick = handleNextClick;

fetchData(count);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching data:', error));


//weather
const cityNameInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

//API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Протокол должен быть HTTPS, не HTTP
const apiKey = 'e417df62e04d3b1b111abeab19cea714';

cityNameInput.addEventListener('input', (event) => {
    fetch(`${baseUrl}?q=${event.target.value}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            citySpan.innerHTML = data?.name ? data.name : 'Город не найден...';
            tempSpan.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...';
        })
        .catch(error => {
            console.error('Произошла ошибка при запросе данных:', error);
        });
});

