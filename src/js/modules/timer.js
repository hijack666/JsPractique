const timer = (id, deadline) => {

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()); // в мс исчисляем разницу между дедлайном и текущей датой

        const seconds = Math.floor((t/1000) % 60); //  остаток - секунды 
        const minutes = Math.floor(t/1000/60 % 60); // кол-во минут
        const hours = Math.floor(t/(1000*60*60) % 24); // кол-во часов
        const days = Math.floor(t/(1000*60*60*24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const addZero = function(num) {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock(); // вызываем сначала вручную, чтобы при загрузке страницы сразу отобразилось нужное время

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) { // останавливаем таймер
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }

    };

    setClock(id, deadline);

};

export default timer;