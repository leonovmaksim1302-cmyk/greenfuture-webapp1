// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Управление вкладками
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Калькулятор экономии
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const area = parseFloat(document.getElementById('area').value);
        const heating = parseFloat(document.getElementById('heating').value);
        let resultText = '';
        if (isNaN(area) && isNaN(heating)) {
            resultText = '❌ Введите хотя бы один параметр.';
        } else {
            let savings = 0;
            if (!isNaN(heating)) savings = heating * 0.3;
            if (!isNaN(area)) savings = Math.max(savings, area * 15);
            resultText = `💰 Примерная экономия в месяц: ${Math.round(savings)} ₽<br>📅 За год: ${Math.round(savings * 12)} ₽`;
        }
        document.getElementById('result').innerHTML = resultText;
    });
}

// Отправка заявки
const form = document.getElementById('orderForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const school = document.getElementById('school').value.trim();
        const version = document.getElementById('version').value;
        if (!name || !phone || !school) {
            document.getElementById('formMessage').innerHTML = '⚠️ Заполните все поля.';
            return;
        }
        const data = {
            type: 'order',
            name: name,
            phone: phone,
            school: school,
            version: version
        };
        tg.sendData(JSON.stringify(data));
        document.getElementById('formMessage').innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
        form.reset();
        setTimeout(() => tg.close(), 2000);
    });
}
