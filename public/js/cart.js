//get menu data
getCart();

function getCart() {
  let url = "/api/cart/all";
  $.get(url, (response) => {
    for (i = 0; i < response.body.cart.length; i++) {
      addCartItem(
        response.body.cart[i].product_id,
        response.body.cart[i].quantity
      );
    }
    
    function addCartItem(pProductId, pQuantity) {

      let url2 = "/api/product/get_product/"+pProductId;
      $.get(url2, (response2) => {
        
        
        let cartTable = document.getElementById("cartTable")

        let tempTR = document.createElement("tr")

        let td1 = document.createElement("td")
        td1.style.width = "auto"
        td1.style.minWidth = "100px"
        td1.innerHTML = response2.body.product.name

        let td2 = document.createElement("td")
        td2.style.width = "100px"
        td2.innerHTML = pQuantity

        let td3 = document.createElement("td")
        td3.style.width = "100px"
        td3.innerHTML = response2.body.product.price

        let td4 = document.createElement("td")
        td4.style.width = "100px"
        td4.style.color = "#b40000"
        td4.innerHTML = "remove"
        td4.classList.add("hoverClass")

        td4.onclick = function() {
          let url3 = "/api/cart/delete"

          let data3 = {
            product_id: pProductId
          }
          $.post(url3, data3, response3 => {
            if (response3.valid) {
              cartTable.innerHTML = '<tr id="cartHeader"><th style="width: auto; min-width: 100px">Item</th><th style="width: 100px">Qty</th><th style="width: 100px">Price</th><th style="width: 100px"></th></tr>'
              getCart()
            }
          })
        }

        tempTR.appendChild(td1)
        tempTR.appendChild(td2)
        tempTR.appendChild(td3)
        tempTR.appendChild(td4)
        cartTable.appendChild(tempTR)
      })
    }
  });
}

document.getElementById("checkOutButton").onclick = function(){
  document.getElementById("checkoutOverlay").style.display = "block"
  document.getElementById("pickupDiv").style.display = "block"
}
document.getElementById("instructionsContinue").onclick = function(){
  document.getElementById("paymentDiv").style.display = "block"
}

document.getElementById("paymentDiv11").onclick = function(){

  openThanks()
}
document.getElementById("paymentDiv12").onclick = function(){
  openThanks()
}
document.getElementById("paymentDiv13").onclick = function(){
  openThanks()
}
document.getElementById("paymentDiv14").onclick = function(){
  openThanks()
}

function openThanks(){
  document.getElementById("thanksDiv").style.display = "block"
}
document.getElementById("backToMenu").onclick = function(){
  exitPaymentScreens()
  //Take to Menu
}
document.getElementById("exitPickup").onclick = function(){
  exitPaymentScreens()
}
document.getElementById("exitPayment").onclick = function(){
  exitPaymentScreens()
}
document.getElementById("exitThanks").onclick = function(){
  exitPaymentScreens()
}

function exitPaymentScreens() {
  document.getElementById("checkoutOverlay").style.display = "none"
  document.getElementById("pickupDiv").style.display = "none"
  document.getElementById("paymentDiv").style.display = "none"
  document.getElementById("thanksDiv").style.display = "none"
}
