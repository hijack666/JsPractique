import { bind } from "core-js/fn/function";

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { //привязка окна к определенному триггеру
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e)=> {
                if (e.target) { // всегда проверять
                    e.preventDefault(); // чтобы ссылка-кнопка не релоадила страницу
                }

                windows.forEach(item => {   // закрываем на крестик ВСЕ модалки
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // когда модальное окно открыто - замораживаем страницу
                // document.body.classList.add('modal-open'); // бутстрап класс

                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', ()=> {
            windows.forEach(item => {   // закрываем на крестик ВСЕ модалки
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            document.body.style.overflowY = 'scroll';
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e)=> {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {   // закрываем на крестик ВСЕ модалки
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                document.body.style.overflowY = 'scroll';
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); // модалка после модалки
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false); //false не дает закрыть модалку при клике вне ее


    showModalByTime('.popup.timed-popup', 10000);
};

export default modals;