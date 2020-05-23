/*global console*/

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    //console.log("local storage is not empty ypu can set it now");
    //console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty('--main--color', localStorage.getItem("color_option"));

    document.querySelectorAll(".colors-list-li").forEach(element => {
        element.classList.remove("active");
    });
}



//random background optuin
let backgroundOption = true;
//variable back interval
let backgroundInterval;
//check if there is local storage background item
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;

    } else {
        backgroundOption = false;
    }
    //removeactive
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");

    }
}


document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};


//switch color
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);

    });
});
//switch background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {

        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);


        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});




//select landing page 
let landingPage = document.querySelector(".landing-page");
//get arr of images
let imgArray = ["7.jpg", "3.jpg", "1.jpg", "4.jpg", "6.jpg"];



//func to randomize images
function randomizeImgs() {
    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            //random
            let randomNum = Math.floor(Math.random() * imgArray.length);

            //change bground image
            landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNum] + '")';

        }, 3000);
    }

}
randomizeImgs();



//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });

    });

});
//select all Links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });

        });

    });


}
scrollToSomewhere(allLinks);
scrollToSomewhere(allBullets);
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option")
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

    })
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        localStorage.setItem("bullets_option", 'none');
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');

        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');

        }
        handleActive(e);
    });
});



//handle active state
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");

}
document.querySelector(".reset-options").onclick = function() {
    localStorage.removeItem("color_option");
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("background_option");
    window.location.reload();


};