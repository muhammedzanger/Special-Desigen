/** @format */
// check if localstorage has color
let mainColor = localStorage.getItem("color-option")
console.log(mainColor)

if (mainColor !== null) {
  console.log("Color From LocalStorage")
  document.documentElement.style.setProperty("--main-color", mainColor)

  // remove active class from localStorage
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active")
    // add class active
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active")
    }
  })
}

// setings spin
document.querySelector(".toggle-setting .icon").onclick = function () {
  this.classList.toggle("fa-spin")
  // open main setting-box
  document.querySelector(".setting-box").classList.toggle("open")
}

// switch colors
const colorLi = document.querySelectorAll(".colors-list li")
// loop for items
colorLi.forEach((li) => {
  // click on the target
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);

    // set color to Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    )
    // set color to LocalStorage
    localStorage.setItem("color-option", e.target.dataset.color)

    handleActive(e)
  })
})
// background option
let backgroundOption = true
// variable to control intreval
let backgroundInterval

// check if local storage has item
let backgroundLocalItem = localStorage.getItem("background_option")

// check if local storge not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true
  } else {
    backgroundOption = false
  }
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active")
  })
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active")
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active")
  }
}

// switch backgrounds
const backGroundEle = document.querySelectorAll(".random-backgrounds span")
// loop for items
backGroundEle.forEach((span) => {
  // click on the target
  span.addEventListener("click", (e) => {
    handleActive(e)

    if (e.target.dataset.background === "yes") {
      backgroundOption = true
      randomizeImage()
      localStorage.setItem("background_option", true)
    } else {
      backgroundOption = false
      clearInterval(backgroundInterval)
      localStorage.setItem("background_option", false)
    }
  })
})

// get Landing Page
let landingPage = document.querySelector(".landing-page")
// get Image Array
let arrayImage = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

// function to randomize image
function randomizeImage() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get Random Number
      let randomNumber = Math.floor(Math.random() * arrayImage.length)
      // change background Image
      landingPage.style.backgroundImage =
        "url('image/" + arrayImage[randomNumber] + "')"
    }, 5000)
  }
}
randomizeImage()

// select skills selector

let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
  // skills offSetTop
  let skillsOffSetTop = ourSkills.offsetTop

  // skills outerHeight
  let skillsOuterHeight = ourSkills.offsetHeight

  // window height
  let windowHeight = this.innerHeight

  // window scrollTop
  let windowScrollTop = this.pageYOffset
  // console.log(windowScrollTop)

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress
    })
  }
}
// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overLay = document.createElement("div")

    // add class to overlay
    overLay.className = "overlay-popup"

    // append overlay to body
    document.body.appendChild(overLay)

    // create popup
    let popUp = document.createElement("div")
    // add class to popBox
    popUp.className = "popup-box"

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3")
      // create text for heading
      let headingText = document.createTextNode(img.alt)
      // append text to the heading
      imgHeading.appendChild(headingText)
      // append the heading to the popup-box
      popUp.appendChild(imgHeading)
    }

    // create the image
    let imagePopup = document.createElement("img")

    // set image source
    imagePopup.src = img.src

    // add image to popup box
    popUp.appendChild(imagePopup)

    // append popup to body
    document.body.appendChild(popUp)

    // create the close span
    let closeButton = document.createElement("span")
    // create the closeSpan text
    let closeButtonText = document.createTextNode("X")
    // append
    closeButton.appendChild(closeButtonText)
    // add class to closeButton
    closeButton.className = "close-button"
    // add closeButton to the popup-box
    popUp.appendChild(closeButton)
  })
})
// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove()
    // remove overlay
    document.querySelector(".overlay-popup").remove()
  }
})

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document
//       .querySelector(e.target.dataset.section)
//       .scrollIntoView({ behavior: "smooth", block: "start" })
//   })
// })
// select all links
const allLinks = document.querySelectorAll(".links a")

function scrollToLink(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  })
}
scrollToLink(allBullets)
scrollToLink(allLinks)

// handle active state
function handleActive(ev) {
  // remove active class for all spans
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active")
  })

  // add active class
  ev.target.classList.add("active")
}

// chose all bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletsLocalItem = localStorage.getItem("bullets-option")

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active")
  })
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block"
    document.querySelector(".bullets-option .yes").classList.add("active")
  } else {
    bulletsContainer.style.display = "none"
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block"
      localStorage.setItem("bullets-option", "block")
    } else {
      bulletsContainer.style.display = "none"
      localStorage.setItem("bullets-option", "none")
    }
    handleActive(e)
  })
})

// button reset all option's
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear()
  // localStorage.removeItem("background-option")
  // localStorage.removeItem("color-option")
  // localStorage.removeItem("bullets-option")
  window.location.reload()
}

// toggle menu
let menuBtn = document.querySelector(".toogle-menu")
let theLinks = document.querySelector(".links")

menuBtn.onclick = function (e) {
  // stop propagation
  e.stopPropagation()
  // open the arrow
  this.classList.toggle("menu-active")
  // open the menu
  theLinks.classList.toggle("open")
}

// click anywhere outside toggle menu and close it

document.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== theLinks)
    if (theLinks.classList.contains("open")) {
      // check menu is open
      menuBtn.classList.toggle("menu-active")
      theLinks.classList.toggle("open")
    }
})

// stop propagation on menu
theLinks.onclick = function (e) {
  e.stopPropagation()
}
