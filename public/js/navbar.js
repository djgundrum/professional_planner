var userRole = "customer"
window.onload = function(){
    resize()
}

var navbar = document.createElement("div")
navbar.id = "navbar"
document.body.appendChild(navbar)

var navHamburger = document.createElement("img")
navHamburger.id = "navHamburger"
navHamburger.src = "../images/hamburger.png"

var isUp = true
navHamburger.onclick = function(){
    if (isUp == true) {
        document.getElementById("navDropdown").style.display = "block"
        isUp = false
    }
    else {
        document.getElementById("navDropdown").style.display = "none"
        isUp = true
    }
}
navbar.appendChild(navHamburger)

var navDropdown = document.createElement("div")
navDropdown.id = "navDropdown"
navbar.appendChild(navDropdown)


var navbarItems = []
if (userRole == "admin" || userRole == "staff"){
    navbarItems = ["HOME", "ACCOUNT"]
}
else /* customers */ {
    navbarItems = ["MENU", "CART", "ACCOUNT"]
}

var navUL = document.createElement("ul")
var navUL2 = document.createElement("ul")
navUL.id = "navUL"
navUL2.id = "navUL2"
for (i=0; i<navbarItems.length; i++){
    let tempA = document.createElement("a")
    tempA.id = "navbarA"+i
    tempA.href = ""
    tempA.innerHTML = navbarItems[i]

    let tempLI = document.createElement("li")
    tempLI.id = "navbarLI"+i
    tempLI.appendChild(tempA)
    navUL.appendChild(tempLI)

    let tempA2 = document.createElement("a")
    tempA2.id = "navbarA"+i+"2"
    tempA2.href = ""
    tempA2.innerHTML = navbarItems[i]

    let tempLI2 = document.createElement("li")
    tempLI2.id = "navbarLI"+i+"2"
    tempLI2.appendChild(tempA2)
    navUL2.appendChild(tempLI2)
}
document.getElementById("navbar").appendChild(navUL)
document.getElementById("navDropdown").appendChild(navUL2)

window.onresize = function(){
    resize()
}

function resize() {
    if (window.innerWidth < 800) {
        document.getElementById("navUL").style.display = "none"
        document.getElementById("navHamburger").style.display = "block"
    }
    if (window.innerWidth >= 800) {
        document.getElementById("navUL").style.display = "block"
        document.getElementById("navHamburger").style.display = "none"
    }
}