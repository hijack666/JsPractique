import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'); // лучше очищать ВСЕ инпуты
        // phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => { // async говорит о том, что внутри есть асинхронные операции -> await на асинхронные операции
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {  // асинхронная функция, js не ждет окончания запроса, await заставляет ждать
            method: "POST",
            body: data
        });

        return await res.text(); //если ф-ция асинхр
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();  // чтобы страница не перезагружалась после отправки

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage); // помещаем блок в форму

            const formData = new FormData(item);
            if ( item.getAttribute('data-calc') === 'end' ) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(err => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); //в любом случае удалаяем сообщение
                    }, 5000);
                });

        });
    });
};

export default forms;