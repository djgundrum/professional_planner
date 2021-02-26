//get menu data
getProducts();

function getProducts() {
  let url = "/api/menu/all";
  $.get(url, (response) => {

    for (i = 0; i < response.body.data.length; i++) {
      addMenuItem(
        response.body.data[i].name,
        response.body.data[i].section,
        response.body.data[i].price,
        response.body.data[i].photo_url,
        response.body.data[i].description
      );
    }
    
    function addMenuItem(pName, pSection, pPrice, pPhoto, pDescription) {
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
    
      menuImgDiv.appendChild(menuImg);
      sectionDiv.appendChild(menuImgDiv);
      sectionDiv.appendChild(menuName);
      sectionDiv.appendChild(menuPrice);
      if (pSection == "Entree") {
        document.getElementById("entreesDiv").appendChild(sectionDiv);
      } else if (pSection == "Side") {
        document.getElementById("sidesDiv").appendChild(sectionDiv);
      } else if (pSection == "Dessert") {
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
        descriptionDiv1.style.display = "block";
        descriptionDiv2.style.display = "block";
      };
    }
    
    console.log(response);
  });
}