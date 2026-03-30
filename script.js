let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Вкладки
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Калькулятор
document.getElementById('calcBtn').addEventListener('click', () => {
    const area = parseFloat(document.getElementById('area').value);
    const heating = parseFloat(document.getElementById('heating').value);
    if (isNaN(area) && isNaN(heating)) {
        document.getElementById('result').innerHTML = '❌ Введите хотя бы один параметр.';
        return;
    }
    let savings = 0;
    if (!isNaN(heating)) savings = heating * 0.3;
    if (!isNaN(area)) savings = Math.max(savings, area * 15);
    document.getElementById('result').innerHTML = `💰 Экономия в месяц: ${Math.round(savings)} ₽<br>📅 За год: ${Math.round(savings * 12)} ₽`;
});

// Заявка
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const school = document.getElementById('school').value.trim();
    const version = document.getElementById('version').value;
    if (!name || !phone || !school) {
        document.getElementById('formMessage').innerHTML = '⚠️ Заполните все поля.';
        return;
    }
    const data = { type: 'order', name, phone, school, version };
    tg.sendData(JSON.stringify(data));
    document.getElementById('formMessage').innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
    document.getElementById('orderForm').reset();
    setTimeout(() => tg.close(), 2000);
});