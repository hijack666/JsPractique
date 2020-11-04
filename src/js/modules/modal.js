const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) { //привязка окна к определенному триггеру
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e)=> {
                if (e.target) { // всегда проверять
                    e.preventDefault(); // чтобы ссылка-кнопка не релоадила страницу
                }
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // когда модальное окно открыто - замораживаем страницу
                // document.body.classList.add('modal-open'); // бутстрап класс
            });
        });

        close.addEventListener('click', ()=> {
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e)=> {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "";
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
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    
    showModalByTime('.popup', 60000);
};

export default modals;