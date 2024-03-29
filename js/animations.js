const INCREASE_NUMBER_ANIMATION_SPEED = 60;
let animationInited = false;

/*Функции*/
function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i;
        }

        i += 100;
    }
    setTimeout(() => { increaseNumberAnimationStep(i, element, endNumber) }, INCREASE_NUMBER_ANIMATION_SPEED)
}

function initIncreaseNumberAnimation() {
    let element = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000);
}

document.querySelector("#budget").addEventListener('change', function handleSelectChange(event) {
    const otherInput = document.querySelector(".form__other-input")

    if(event.target.value === 'other') {
        const formContainer = document.createElement("div")
        formContainer.classList.add("form__group", "form__other-input")

        const input = document.createElement("input")
        input.setAttribute("placeholder", "Введите ваш вариант")
        input.type = "text"

        formContainer.appendChild(input)

        document.querySelector("#form form").insertBefore(formContainer, document.querySelector(".form__submit"))
    }
    if(event.target.value !== 'other' && Boolean(otherInput)) {
        document.querySelector("#form form").removeChild(otherInput)
    }
})

function updateScroll() {
    const headerClass = document.querySelector("header").classList
    window.scrollY > 0 ? headerClass.add("header__scrolled") : headerClass.remove("header__scrolled")

    const countElementPosition = document.querySelector(".features__clients-count").offsetTop
    let windowBottomPosition = window.scrollY + window.innerHeight;
    if(windowBottomPosition >= countElementPosition && !animationInited) {
        animationInited = true
        initIncreaseNumberAnimation()
    }
}

function addSmoothScroll(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault()
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })    
}

/*Выполнение программы*/
window.addEventListener('scroll', updateScroll)

document.querySelectorAll('a[href^="#"]').forEach(link => {
    addSmoothScroll(link)
})

document.querySelectorAll('.more-button').forEach(link => {
    addSmoothScroll(link);
})
