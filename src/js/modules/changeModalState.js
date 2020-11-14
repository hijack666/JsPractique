import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'), // получаем ширину окна, высоту и тд (не браузреного окна хД)
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                // if (elem.length > 1) { // если кол-во найденных элементов >1
                //     state[prop] = i; // передаем индекс элемента, на который кликнули
                // } else {
                //     state[prop] = item.value;
                // }
                // console.log(state);
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox' ) {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if ( i == j ) {
                                    box.checked = true;
                                } 
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value; // у селектов уже есть вэлью
                        break;
                }

                console.log(state);
            });
        });
    }

    // windowForm.forEach((item, i) => {
    //     item.addEventListener('click', () => {
    //         state.form = i; // передаем индекс элемента, на который кликнули
    //         // console.log()
    //     });
    // });

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;