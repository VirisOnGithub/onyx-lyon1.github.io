function scrollToDownload() {
    setTimeout(function () {
      var element = document.getElementById("download");
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

let darktoggled = false;

const darkMode = document.querySelector('.dark-mode');

darkMode.addEventListener('click', toggleDarkMode, false);

function toggleDarkMode(e){
    e.preventDefault();
    let root = document.documentElement;
    let darkMode = document.querySelector('.dark-mode');
    let srcmp4 = document.querySelector('.sourcemp4');
    let srcwebm = document.querySelector('.sourcewebm');
    let video = document.querySelector('.video');
    let overlay = document.querySelector('.overlay');
    if(!darktoggled){ 
      root.style.setProperty('--color-primary', '#e6ebf1'); //light
      root.style.setProperty('--color-secondary', '#d9dde9');
      root.style.setProperty('--font-color','black');
      root.style.setProperty('--highlight-color', 'rgba(0,0,0,0.5)');

      video.pause();
      srcmp4.src = "assets/onyx_light.mp4";
      srcwebm.src = "assets/onyx_light.webm";
      let time = video.currentTime;
      video.load();
      video.play();
      video.currentTime = time;

      overlay.style.background = "rgba(255,255,255,0)";
      
      darkMode.innerHTML = "<img src='assets/light-mode.svg' />";

      darktoggled = true;
    }else{
      root.style.setProperty('--color-primary', '#434b5e'); //dark
      root.style.setProperty('--color-secondary', '#4b566a');
      root.style.setProperty('--font-color','white');
      root.style.setProperty('--highlight-color','transparent');

      video.pause();
      srcmp4.src = "assets/onyx_dark.mp4";
      srcwebm.src = "assets/onyx_dark.webm";
      let time = video.currentTime;
      video.load();
      video.play();
      video.currentTime = time;

      overlay.style.background = "rgba(0,0,0,0.5)";

      darkMode.innerHTML = "<img src='assets/dark-mode.svg' />";

      darktoggled = false;
    }
}

const texts = document.querySelectorAll('.anim');

    texts.forEach(text => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            text.classList.add('visible');
          }
        });
      });

      observer.observe(text);   
});

const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    spaceBetween: 0,
    grabCursor: true,
    slidesPerView: 1,
    effect: 'slide',
});

swiper.params.speed = 1000; //1 seconde de défilement

/* SLIDE AUTO*/

swiper.autoplay.start();

swiper.params.autoplay.delay = 5000;

//Language switcher

document.querySelector('.lang').addEventListener('click', function() {
    console.log("hey")
    if(this.getAttribute('language')==="FR"){
        this.setAttribute('language', 'EN');
        document.querySelector('.lang-img').src = "assets/fr-flag.png";
        switchToEnglish();
    }
    else{
        this.setAttribute('language', 'FR');
        document.querySelector('.lang-img').src = "assets/uk-flag.png";
        switchToFrench();
    }
});
let data;
fetch('./languages.json').then(response => response.json()).then(fetchedData => { data = fetchedData; });

function switchToEnglish(){
  data.forEach(element => {
    console.log(element.id);
    document.getElementById(element.id).innerHTML = element.en;
  });
}

function switchToFrench(){
    data.forEach(element => {
        document.getElementById(element.id).innerHTML = element.fr;
    });
}