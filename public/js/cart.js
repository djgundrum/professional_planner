//get menu data
//getCart();

function getCart() {
  let url = "/api/order/all";
  $.get(url, (response) => {
    for (i = 0; i < response.body.data.length; i++) {
      addCartItem(
        response.body.data[i].id,
        response.body.data[i].user_id,
        response.body.data[i].product_id,
        response.body.data[i].quantity
      );
    }
    
    function addCartItem(pProductId, pQuantity) {
        let cartTable = document.getElementById("cartTable")

        let tempTR = document.createElement("tr")

        let td1 = document.createElement("td")
        td1.style.width = "auto"
        td1.style.minWidth = "100px"
        td1.innerHTML = "getNAME"

        let td2 = document.createElement("td")
        td2.style.width = "100px"
        td2.innerHTML = pQuantity

        let td3 = document.createElement("td")
        td3.style.width = "100px"
        td3.innerHTML = "getPRICE"

        let td4 = document.createElement("td")
        td4.style.width = "100px"
        td4.style.color = "#b40000"
        td4.innerHTML = "remove"
        td4.classList.add("hoverClass")

        tempTR.appendChild(td1)
        tempTR.appendChild(td2)
        tempTR.appendChild(td3)
        tempTR.appendChild(td4)
        cartTable.appendChild(tempTR)
    }
    console.log(response);
  });
}