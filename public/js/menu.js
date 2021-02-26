//get menu data

let response = {
    "product":[{
        "id": 1,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 2,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 3,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 4,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 5,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 6,
        "name": "Salmon",
        "description": "fishy",
        "section": "entree",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },{
        "id": 1,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 2,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 3,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 4,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 5,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 6,
        "name": "Salmon",
        "description": "fishy",
        "section": "side",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 1,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 2,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 3,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 4,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 5,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    },
    {
        "id": 6,
        "name": "Salmon",
        "description": "fishy",
        "section": "dessert",
        "price": "$19.99",
        "photo_url": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F04%2FGettyImages-1068685376-2000.jpg",
        "available": 1
    }]
}

for (i=0; i<response.product.length; i++) {
    addMenuItem(response.product[i].name,
        response.product[i].section,
        response.product[i].price,
        response.product[i].photo_url)
}

function addMenuItem(pName, pSection, pPrice, pPhoto) {
    let sectionDiv = document.createElement("div")
    sectionDiv.classList.add("sectionDiv")

    let menuImgDiv = document.createElement("div")
    menuImgDiv.classList.add("menuImgDiv")

    let menuImg = document.createElement("img")
    menuImg.classList.add("menuImg")
    menuImg.src = pPhoto

    let menuName = document.createElement("p")
    menuName.classList.add("menuName")
    menuName.innerHTML = pName

    let menuPrice = document.createElement("p")
    menuPrice.classList.add("menuPrice")
    menuPrice.innerHTML = pPrice

    menuImgDiv.appendChild(menuImg)
    sectionDiv.appendChild(menuImgDiv)
    sectionDiv.appendChild(menuName)
    sectionDiv.appendChild(menuPrice)
    if (pSection == "entree") {
        document.getElementById("entreesDiv").appendChild(sectionDiv)
    }
    else if (pSection == "side") {
        document.getElementById("sidesDiv").appendChild(sectionDiv)
    }
    else if (pSection == "dessert") {
        document.getElementById("dessertsDiv").appendChild(sectionDiv)
    }




    let descriptionDiv1 = document.createElement("div")
    descriptionDiv1.classList.add("descriptionDiv1")
    document.getElementById("menuDiv").appendChild(descriptionDiv1)

    let descriptionDiv2 = document.createElement("div")
    descriptionDiv2.classList.add("descriptionDiv2")

    let descriptionImg = document.createElement("div")
    descriptionImg.classList.add("descriptionImg")
    descriptionImg.src = pPhoto

    let descriptionName = document.createElement("div")
    descriptionName.classList.add("descriptionName")
    descriptionName.innerHTML = pName

    let descriptionPrice = document.createElement("div")
    descriptionPrice.classList.add("descriptionPrice")
    descriptionPrice.innerHTML = pPrice

    let description = document.createElement("div")
    description.classList.add("description")

    let descriptionQty = document.createElement("div")
    descriptionQty.classList.add("descriptionQty")

    let descriptionQtyInput = document.createElement("div")
    descriptionQtyInput.classList.add("descriptionQtyInput")

    let descriptionAddToCart = document.createElement("div")
    descriptionAddToCart.classList.add("descriptionAddToCart")

    descriptionDiv2.appendChild(descriptionImg)
    descriptionDiv2.appendChild(descriptionName)
    descriptionDiv2.appendChild(descriptionPrice)
    descriptionDiv2.appendChild(description)
    descriptionDiv2.appendChild(descriptionQty)
    descriptionDiv2.appendChild(descriptionQtyInput)
    descriptionDiv2.appendChild(descriptionAddToCart)
    document.getElementById("menuDiv").appendChild(descriptionDiv2)











    sectionDiv.onclick = function() {
        document.getElementById(pName + "DescriptionDiv").display = "block"
    }
}