//get menu data
getProducts();
var currentSection = ""
var currentSectionID = ""
function getProducts() {
  let url = "/api/menu/all";
  $.get(url, (response) => {
    if (userRole.toLowerCase() == "admin") {
      console.log(response)
      let addItemDiv = document.createElement("div")
      addItemDiv.classList.add("addItemDiv")
      let addP = document.createElement("p")
      addP.innerHTML = "+"
      addItemDiv.appendChild(addP)
      document.getElementById("entreesDiv").appendChild(addItemDiv)
      addItemDiv.onclick = function(){
        openAddScreen("entree")
      }

      let addItemDiv2 = document.createElement("div")
      addItemDiv2.classList.add("addItemDiv")
      let addP2 = document.createElement("p")
      addP2.innerHTML = "+"
      addItemDiv2.appendChild(addP2)
      document.getElementById("sidesDiv").appendChild(addItemDiv2)
      addItemDiv2.onclick = function(){
        openAddScreen("side")
      }

      let addItemDiv3 = document.createElement("div")
      addItemDiv3.classList.add("addItemDiv")
      let addP3 = document.createElement("p")
      addP3.innerHTML = "+"
      addItemDiv3.appendChild(addP3)
      document.getElementById("dessertsDiv").appendChild(addItemDiv3)
      addItemDiv3.onclick = function(){
        openAddScreen("dessert")
      }
      function openAddScreen(pSection){
        document.getElementById("addDiv1").style.display = "block"
        document.getElementById("addDiv2").style.display = "block"
        document.getElementById("addMenuItemButton").innerHTML = "Add Menu Item"
        currentSection = pSection
      }
    }
    for (i = 0; i < response.body.data.length; i++) {
      if (document.getElementById("menuSearch").value == "" || response.body.data[i].name.toLowerCase().includes(document.getElementById("menuSearch").value.toLowerCase())) {
        if (response.body.data[i].available || userRole.toLowerCase() != "customer")
        addMenuItem(
          response.body.data[i].id,
          response.body.data[i].name,
          response.body.data[i].section,
          response.body.data[i].price,
          response.body.data[i].photo_url,
          response.body.data[i].description,
          response.body.data[i].available
        );
      }
    }
    
    function addMenuItem(pId, pName, pSection, pPrice, pPhoto, pDescription, pAvailable) {
      

      let sectionDiv = document.createElement("div");
      sectionDiv.classList.add("sectionDiv");
    
      let menuImgDiv = document.createElement("div");
      menuImgDiv.classList.add("menuImgDiv");
    
      let menuImg = document.createElement("img");
      menuImg.classList.add("menuImg");
      menuImg.src = pPhoto;
    
      let menuName = document.createElement("p");
      menuName.classList.add("menuName");
      menuName.innerHTML = pName;
    
      let menuPrice = document.createElement("p");
      menuPrice.classList.add("menuPrice");
      menuPrice.innerHTML = pPrice;
    
      let idp = document.createElement("p")
      idp.innerHTML = pId
      idp.style.display = "none"

      sectionDiv.appendChild(idp)
      menuImgDiv.appendChild(menuImg);
      sectionDiv.appendChild(menuImgDiv);
      sectionDiv.appendChild(menuName);
      sectionDiv.appendChild(menuPrice);
      if (pSection.toLowerCase() == "entree") {
        document.getElementById("entreesDiv").appendChild(sectionDiv);
      } else if (pSection.toLowerCase() == "side") {
        document.getElementById("sidesDiv").appendChild(sectionDiv);
      } else if (pSection.toLowerCase() == "dessert") {
        document.getElementById("dessertsDiv").appendChild(sectionDiv);
      }
    
      let descriptionDiv1 = document.createElement("div");
      descriptionDiv1.classList.add("descriptionDiv1");
      document.getElementById("menuDiv").appendChild(descriptionDiv1);
    
      let descriptionDiv2 = document.createElement("div");
      descriptionDiv2.classList.add("descriptionDiv2");
    
      let descriptionX = document.createElement("p");
      descriptionX.classList.add("descriptionX");
      descriptionX.innerHTML = "x";
      descriptionX.onclick = function () {
        descriptionDiv1.style.display = "none";
        descriptionDiv2.style.display = "none";
      };
    
      let descriptionImg = document.createElement("img");
      descriptionImg.classList.add("descriptionImg");
      descriptionImg.src = pPhoto;
    
      let descriptionName = document.createElement("div");
      descriptionName.classList.add("descriptionName");
      descriptionName.innerHTML = pName;
    
      let descriptionPrice = document.createElement("div");
      descriptionPrice.classList.add("descriptionPrice");
      descriptionPrice.innerHTML = pPrice;
    
      let description = document.createElement("div");
      description.classList.add("description");
      description.innerHTML = pDescription;
    
      let descriptionQty = document.createElement("div");
      descriptionQty.classList.add("descriptionQty");
      descriptionQty.innerHTML = "Qty";
    
      let descriptionQtyInput = document.createElement("input");
      descriptionQtyInput.classList.add("descriptionQtyInput");
    
      let descriptionAddToCart = document.createElement("div");
      descriptionAddToCart.classList.add("descriptionAddToCart");
      descriptionAddToCart.innerHTML = "Add To Cart";
      descriptionAddToCart.onclick = function(){
        //ADD ITEM TO CART
        let url = "/api/account/validate"
        $.get(url, response => {
          if (response.valid) {
            response.body.user
          }
        })

        descriptionDiv1.style.display="none"
        descriptionDiv2.style.display="none"
      }
    
      descriptionDiv2.appendChild(descriptionX);
      descriptionDiv2.appendChild(descriptionImg);
      descriptionDiv2.appendChild(descriptionName);
      descriptionDiv2.appendChild(descriptionPrice);
      descriptionDiv2.appendChild(description);
      descriptionDiv2.appendChild(descriptionQty);
      descriptionDiv2.appendChild(descriptionQtyInput);
      descriptionDiv2.appendChild(descriptionAddToCart);
      document.getElementById("menuDiv").appendChild(descriptionDiv2);
    
      sectionDiv.onclick = function () {
        if (userRole.toLowerCase() == "staff") {
          document.getElementById("addUrlInput").disabled = true
          document.getElementById("addNameInput").disabled = true
          document.getElementById("addDescriptionInput").disabled = true
          document.getElementById("addPriceInput").disabled = true
          document.getElementById("addUrlInput").value = pPhoto
          document.getElementById("addNameInput").value = pName
          document.getElementById("addDescriptionInput").value = pDescription
          document.getElementById("addPriceInput").value = pPrice
          document.getElementById("addDiv1").style.display = "block"
          document.getElementById("addDiv2").style.display = "block"
          document.getElementById("addMenuItemButton").innerHTML = "Update"
          currentSectionID = sectionDiv.children[0].innerHTML
        }
        else if (userRole.toLowerCase() == "admin") {
          document.getElementById("addUrlInput").disabled = false
          document.getElementById("addNameInput").disabled = false
          document.getElementById("addDescriptionInput").disabled = false
          document.getElementById("addPriceInput").disabled = false
          document.getElementById("addUrlInput").value = pPhoto
          document.getElementById("addNameInput").value = pName
          document.getElementById("addDescriptionInput").value = pDescription
          document.getElementById("addPriceInput").value = pPrice
          document.getElementById("addDiv1").style.display = "block"
          document.getElementById("addDiv2").style.display = "block"
          document.getElementById("addMenuItemButton").innerHTML = "Update"
          currentSectionID = sectionDiv.children[0].innerHTML
        }
        else {
          descriptionDiv1.style.display = "block";
          descriptionDiv2.style.display = "block";
        }
      };
    }
  });
}

document.getElementById("menuSearchButton").onclick = function() {
  reloadItems()
}
function reloadItems() {
  let children = document.getElementsByClassName("sectionDiv")
  let addChildren = document.getElementsByClassName("addItemDiv")
  while (children[0]) {
    children[0].parentNode.removeChild(children[0])
  }
  while (addChildren[0]) {
    addChildren[0].parentNode.removeChild(addChildren[0])
  }
  getProducts()
}

document.getElementById("addMenuItemButton").onclick = function(){
  let aNameInput = document.getElementById("addNameInput").value
  let aDescriptionInput = document.getElementById("addDescriptionInput").value
  let aUrlInput = document.getElementById("addUrlInput").value
  let aPriceInput = document.getElementById("addPriceInput").value
  if (aNameInput == "" || aDescriptionInput == "" || aUrlInput == "" || aPriceInput == "") {
    alert("All fields must be filled out")
  }
  else {
    if (document.getElementById("addMenuItemButton").innerHTML == "Add Menu Item"){
      //alert("new")
      let url = "/api/product/new";
      let a = 1
      if (document.getElementById("isAvailable").checked){
        a = 0
      }
      let data = {
        name: aNameInput,
        description: aDescriptionInput,
        photo_url: aUrlInput,
        section: currentSection,
        price: aPriceInput,
        available: a
      }
      
      $.post(url, data, (response) => {
        console.log(response)
        if (response.valid) {
          document.getElementById("addDiv1").style.display = "none"
          document.getElementById("addDiv2").style.display = "none"
          document.getElementById("addUrlInput").innerHTML = ""
          document.getElementById("addNameInput").innerHTML = ""
          document.getElementById("addPriceInput").innerHTML = ""
          document.getElementById("addDescriptionInput").innerHTML = ""
          reloadItems()
        }
      })
    }
    else {
      //alert("update")
      let url2 = `/api/product/get_product/${currentSectionID}`
      $.get(url2, (response2) => {
        let url = "/api/product/update";
        let a = 1
        if (document.getElementById("isAvailable").checked){
          a = 0
        }
        let data = {
          id: currentSectionID,
          name: aNameInput,
          description: aDescriptionInput,
          photo_url: aUrlInput,
          section: response2.body.product.section,
          price: aPriceInput,
          available: a
        }
        console.log(data)
        $.post(url, data, (response) => {
          console.log(response)
          if (response.valid) {
            document.getElementById("addDiv1").style.display = "none"
            document.getElementById("addDiv2").style.display = "none"
            document.getElementById("addUrlInput").innerHTML = ""
            document.getElementById("addNameInput").innerHTML = ""
            document.getElementById("addPriceInput").innerHTML = ""
            document.getElementById("addDescriptionInput").innerHTML = ""
            reloadItems()
          }
        })
      })
    }
  }
}