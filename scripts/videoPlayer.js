export const videoPlayerInit = () => {
// video-player
// video-button__play
// video-button__stop
// video-time__passed
// video-progress
// video-time__total

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoSound = document.querySelector('.video-sound');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoSound.addEventListener('click', () => {
        videoPlayer.volume = 0;
        videoVolume.value = 0;
        videoSound.classList.replace('fa-volume-up','fa-volume-off');
    })


    // Функция замены кнопок:play,pause
    const toogleIcon = () => {
        if (videoPlayer.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        }else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    // Функция запуска и остановки паузы видеоплеера
    const tooglePlay = () => {
        if (videoPlayer.paused){
            videoPlayer.play();
        }else {
            videoPlayer.pause();
        }

        /*toogleIcon(); - Какой из вызовов сработает быстрей и меньше займет памяти этот или при срабатывании события. Просьба ответить в комментарий*/
    };

    //Функция остановки видеоплеера со сбросом времени просмотра к 0 
    const stopPlay = any => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    //Функция добавления нуля в отоброжаемое время если число меньше 10 
    const addZero = n => n < 10 ? '0' + n : n;

    //События для запуска и остановки на паузу видеоплеера по клику
    videoPlayer.addEventListener('click', tooglePlay);
    videoButtonPlay.addEventListener('click', tooglePlay);

    //События для вызова функции замены кнопок play, pause
    videoPlayer.addEventListener('play', toogleIcon);
    videoPlayer.addEventListener('pause', toogleIcon);

    //Событие остановки видеоплеера
    videoButtonStop.addEventListener('click', stopPlay);

    //Событие для правильного изменения отображения времени и полоски прогресса
    const onTimeChange = () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        videoProgress.value = (currentTime / duration) * 100;
        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    }
    videoPlayer.addEventListener('timeupdate', onTimeChange);

    //Событие для переключения полоски прогресса в установленную точку
    videoProgress.oninput = () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = (value * duration) / 100;
    };

    //Событие для регулировки громкости
    videoVolume.addEventListener('input', () => {
        const value = videoVolume.value;
        videoPlayer.volume = value / 10;   
        if (value > 0){
            videoSound.classList.replace('fa-volume-off','fa-volume-up');
        }else{
            videoSound.classList.replace('fa-volume-up','fa-volume-off');
        }
    });
}             
