var loggedin = false

if (loggedin == true) {
    document.getElementById("loggedInInfo").style.display = "block"
    document.getElementById("loginBox").style.display = "none"
}
else {
    document.getElementById("loggedInInfo").style.display = "none"
    document.getElementById("loginBox").style.display = "block"
}

document.getElementById("signInButton").onclick = function(){
    document.getElementById("loggedInInfo").style.display = "block"
    document.getElementById("loginBox").style.display = "none"
}
document.getElementById("createAccountButton").onclick = function(){
    document.getElementById("loginBox").style.display = "none"
    document.getElementById("signupBox").style.display = "block"
}
document.getElementById("signupCreateAccountButton").onclick = function(){
    document.getElementById("loggedInInfo").style.display = "block"
    document.getElementById("signupBox").style.display = "none"
}
document.getElementById("logoutButton").onclick = function(){
    document.getElementById("loggedInInfo").style.display = "none"
    document.getElementById("loginBox").style.display = "block"
}