async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}


window.onload = renderCards;
const maxCards = 50; // Максимальное количество карточек, которые вы хотите создать
let cardCount = 0; // Переменная для отслеживания количества созданных карточек

async function renderCards() {
    const cardsContainer = document.getElementById('cards-container');
    const data = await fetchData();

    data.forEach(() => {
        if (cardCount >= maxCards) {
            return; // Прерываем цикл, если достигнут лимит карточек
        }

        const card = document.createElement('div');
        card.classList.add('card');



        cardsContainer.appendChild(card);

        cardCount++;
    });
}

window.onload = renderCards;

async function renderCards() {
    const cardsContainer = document.getElementById('cards-container');
    const data = await fetchData();



    data.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.body;

        const image = document.createElement('img');
        image.src = '/images/one.jpg';
        image.alt = 'news';

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);

        cardsContainer.appendChild(card);
    });
}
