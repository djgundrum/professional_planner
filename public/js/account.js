
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
    let loginEmail = document.getElementById("emailInput").value
    let loginPassword = document.getElementById("passwordInput").value
    let data = {
        email: loginEmail,
        password: loginPassword
    }
    let url = "/api/account/signin"
    $.post(url, data, (response) => { 
        if (response.valid) {
            document.getElementById("loggedInInfo").style.display = "block"
            document.getElementById("loginBox").style.display = "none"
            document.getElementById("yNameInput").value = response.body.user.name
            document.getElementById("yEmailInput").value = response.body.user.email
            document.getElementById("yPasswordInput").value = response.body.user.password
            document.getElementById("yPhoneInput").value = response.body.user.phone
            document.getElementById("yAddressInput").value = response.body.user.address
            userRole = response.body.user.role

            document.getElementById("emailInput").value = ""
            document.getElementById("passwordInput").value = ""
        }
    })
}
document.getElementById("createAccountButton").onclick = function(){
    document.getElementById("loginBox").style.display = "none"
    document.getElementById("signupBox").style.display = "block"
}
document.getElementById("signupCreateAccountButton").onclick = function(){
    let url = "/api/account/signup";
    let signupName = document.getElementById("signupNameInput").value
    let signupEmail = document.getElementById("signupEmailInput").value
    let signupPassword = document.getElementById("signupPasswordInput").value
    let confirmPassword = document.getElementById("confirmPasswordInput").value
    let data = {
        name: signupName,
        email: signupEmail,
        password: signupPassword
    }
    let data2 = {
        email: signupEmail,
        password: signupPassword
    }
    if (confirmPassword == signupPassword) {
        $.post(url, data, (response) => {
            if (response.valid) {
                let url2 = "/api/account/signin"
                $.post(url2, data2, (response2) => { 
                    if (response2.valid) {
                        userRole = response2.body.user.role
                        document.getElementById("loggedInInfo").style.display = "block"
                        document.getElementById("signupBox").style.display = "none"
                        document.getElementById("yNameInput").value = response2.body.user.name
                        document.getElementById("yEmailInput").value = response2.body.user.email
                        document.getElementById("yPasswordInput").value = response2.body.user.password
                        document.getElementById("yPhoneInput").value = response2.body.user.phone
                        document.getElementById("yAddressInput").value = response2.body.user.address

                        document.getElementById("signupNameInput").value = ""
                        document.getElementById("signupEmailInput").value = ""
                        document.getElementById("signupPasswordInput").value = ""
                        document.getElementById("confirmPasswordInput").value = ""
                    }
                })
            }
            else {
                alert("Email is already taken")
            }
        })
    }
    else {
        alert("Passwords Don't match")
    }
    
}
document.getElementById("logoutButton").onclick = function(){
    let url = "/api/account/logout"
    $.post(url, (response) => {
        if (response.valid) {
            document.getElementById("loggedInInfo").style.display = "none"
            document.getElementById("loginBox").style.display = "block"
        }
    })
}

document.getElementById("yEdit").onclick = function(){
    document.getElementById("yNameInput").classList.remove("yInput")
    document.getElementById("yNameInput").classList.add("yInputEdit")
    document.getElementById("yNameInput").disabled = false

    document.getElementById("yEmailInput").classList.remove("yInput")
    document.getElementById("yEmailInput").classList.add("yInputEdit")
    document.getElementById("yEmailInput").disabled = false

    document.getElementById("yPasswordInput").classList.remove("yInput")
    document.getElementById("yPasswordInput").classList.add("yInputEdit")
    document.getElementById("yPasswordInput").disabled = false

    document.getElementById("yPhoneInput").classList.remove("yInput")
    document.getElementById("yPhoneInput").classList.add("yInputEdit")
    document.getElementById("yPhoneInput").disabled = false

    document.getElementById("yAddressInput").classList.remove("yInput")
    document.getElementById("yAddressInput").classList.add("yInputEdit")
    document.getElementById("yAddressInput").disabled = false

    document.getElementById("logoutButton").style.display = "none"
    document.getElementById("saveEditButton").style.display = "block"
}

document.getElementById("saveEditButton").onclick = function(){
    let url = "/api/account/update"
    data = {
        name: document.getElementById("yNameInput").value,
        email: document.getElementById("yEmailInput").value,
        password: document.getElementById("yPasswordInput").value,
        phone: document.getElementById("yPhoneInput").value,
        address: document.getElementById("yAddressInput").value,
        role: userRole
    }
    $.post(url, data, (response) => {
        if (response.valid) {
            document.getElementById("yNameInput").classList.remove("yInputEdit")
            document.getElementById("yNameInput").classList.add("yInput")
            document.getElementById("yNameInput").disable = true

            document.getElementById("yEmailInput").classList.remove("yInputEdit")
            document.getElementById("yEmailInput").classList.add("yInput")
            document.getElementById("yEmailInput").disable = true

            document.getElementById("yPasswordInput").classList.remove("yInputEdit")
            document.getElementById("yPasswordInput").classList.add("yInput")
            document.getElementById("yPasswordInput").disable = true

            document.getElementById("yPhoneInput").classList.remove("yInputEdit")
            document.getElementById("yPhoneInput").classList.add("yInput")
            document.getElementById("yPhoneInput").disable = true

            document.getElementById("yAddressInput").classList.remove("yInputEdit")
            document.getElementById("yAddressInput").classList.add("yInput")
            document.getElementById("yAddressInput").disable = true

            document.getElementById("logoutButton").style.display = "block"
            document.getElementById("saveEditButton").style.display = "none"
        }
    })


    


}
