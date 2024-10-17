let count = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;
let passiveIncome = 0;
let upgrades = localStorage.getItem('upgrades') ? parseInt(localStorage.getItem('upgrades')) : 0;
let incomeInterval;

// Инициализация отображения данных
updateCounterDisplay();
updateUpgradeDisplay();

// Обновление счетчика кликов
document.getElementById('coin').addEventListener('click', () => {
    count++;
    localStorage.setItem('clickCount', count); // Сохраняем количество кликов в localStorage
    updateCounterDisplay();
});

// Отправка сообщения в Telegram только по нажатию кнопки
document.getElementById('sendButton').addEventListener('click', () => {
    sendToTelegram(count);
});

// Улучшение для пассивного дохода
document.getElementById('upgradeButton').addEventListener('click', () => {
    if (count >= 100) {
        count -= 100; // Снижаем количество кликов на 100
        upgrades++; // Увеличиваем количество улучшений
        localStorage.setItem('upgrades', upgrades); // Сохраняем улучшения в localStorage
        localStorage.setItem('clickCount', count); // Обновляем количество кликов
        updateUpgradeDisplay();
        updatePassiveIncome();
    } else {
        alert('Недостаточно кликов для улучшения!');
    }
});

// Функция для обновления отображения счетчика кликов
function updateCounterDisplay() {
    document.getElementById('counter').innerText = Количество кликов: ${count};
}

// Функция для обновления отображения улучшений
function updateUpgradeDisplay() {
    document.getElementById('upgradeStatus').innerText = Улучшений: ${upgrades};
}

// Функция для обновления пассивного дохода
function updatePassiveIncome() {
    passiveIncome += upgrades; // Каждый апгрейд дает +1 к пассивному доходу
    document.getElementById('income').innerText = Пассивный доход: ${passiveIncome};

    // Запускаем таймер для пассивного дохода, только если он еще не запущен
    if (!incomeInterval) {
        incomeInterval = setInterval(() => {
            count += passiveIncome; // Добавляем пассивный доход к кликам
            localStorage.setItem('clickCount', count); // Сохраняем обновленное количество кликов
            updateCounterDisplay();
        }, 1000); // Каждую секунду
    }
}

// Функция отправки сообщения в Telegram
function sendToTelegram(count) {
    const token = 'ВАШ_ТОКЕН_БОТА'; // Замените на токен вашего бота
    const chatId = 'ВАШ_CHAT_ID'; // Замените на ваш chat_id
    const message = Количество кликов: ${count};

    fetch(https://api.telegram.org/bot${token}/sendMessage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Сообщение отправлено в Telegram!');
        } else {
            alert(Ошибка при отправке сообщения: ${data.description});
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке сообщения.');
    });
}
