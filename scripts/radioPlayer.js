export const radioPlayerInit = () => {

   const radio = document.querySelector('.radio');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioHeaderBig = document.querySelector('.radio-header__big');
   const radioItem = document.querySelectorAll('.radio-item');
   const radioStop = document.querySelector('.radio-stop');
   const radioVolume = document.querySelector('.radio-volume');

   const audio = new Audio();
   audio.type = 'audio/aac';

   radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused){
            radio.classList.remove('play');  // остановка анимации
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        }else{
            radio.classList.add('play');    // запуск анимации барабана
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }
 
    // функция выделения выбранного элемента 
   const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
   }

   radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent; // переменная хранящая выбранное радио
        radioHeaderBig.textContent = title;  // замена заголовка на название выбранного радио

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion; // получаем ссылку на радио
        audio.play();
        changeIconPlay();
   });

   radioStop.addEventListener('click', () => {
       if (audio.paused) {
           audio.play();
       }else {
           audio.pause();
       }
       changeIconPlay();
   })

   radioVolume.addEventListener('change', () => {
        const value = radioVolume.value;
        audio.volume = value / 10;
   });

}

