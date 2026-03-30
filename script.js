let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Адаптация цвета кнопки
if (tg.themeParams.button_color) {
    document.documentElement.style.setProperty('--primary', tg.themeParams.button_color);
}

// ========== РАБОТА ВКЛАДОК ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        // Скрыть все вкладки
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        // Показать выбранную
        const activeTab = document.getElementById(tabId);
        if (activeTab) activeTab.classList.add('active');
        // Переключить активный класс кнопок
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
    });
});

// ========== КАЛЬКУЛЯТОР ЭКОНОМИИ ==========
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const areaInput = document.getElementById('area');
        const heatingInput = document.getElementById('heating');
        const area = parseFloat(areaInput ? areaInput.value : NaN);
        const heating = parseFloat(heatingInput ? heatingInput.value : NaN);
        
        let resultText = '';
        if (isNaN(area) && isNaN(heating)) {
            resultText = 'Введите хотя бы один параметр.';
        } else {
            let savings = 0;
            if (!isNaN(heating)) savings = heating * 0.3;
            if (!isNaN(area)) savings = Math.max(savings, area * 15);
            resultText = `💰 Примерная экономия в месяц: ${Math.round(savings)} ₽<br>📅 За год: ${Math.round(savings * 12)} ₽`;
        }
        const resultDiv = document.getElementById('result');
        if (resultDiv) resultDiv.innerHTML = resultText;
    });
}

// ========== ЗАЯВКА ==========
const form = document.getElementById('orderForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const school = document.getElementById('school').value.trim();
        const version = document.getElementById('version').value;
        if (!name || !phone || !school) {
            const msgDiv = document.getElementById('formMessage');
            if (msgDiv) msgDiv.innerHTML = '⚠️ Заполните все поля.';
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
        const msgDiv = document.getElementById('formMessage');
        if (msgDiv) msgDiv.innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
        form.reset();
        setTimeout(() => tg.close(), 2000);
    });
}
