function getOrders() {
  let url = "/api/order/all";

  $.get(url, (response) => {
    console.log(response);
    if (response.valid === false) return;
    else {
      let rows = (orders = response.body.orders);

      for (let row of rows) {
        let tr = document.createElement("tr");
        tr.classList.add("table_row");

        let priority = document.createElement("td");

        let id = document.createElement("td");
        id.innerHTML = row.id;

        let time = document.createElement("td");
        time.innerHTML = row.time;

        let receipt = document.createElement("td");
        receipt.innerHTML = "generate receipt";
        receipt.classList.add("order_table_button");
        receipt.onclick = () => {
          make_receipt(row.id, row.price, row.products, row.time);
        };

        let done = document.createElement("td");
        done.innerHTML = "mark as complete";
        done.classList.add("order_table_button");
        done.onclick = () => {
          complete_order(row.id, done);
        };

        tr.appendChild(priority);
        tr.appendChild(id);
        tr.appendChild(time);
        tr.appendChild(receipt);
        tr.appendChild(done);
        document.getElementById("order_table").appendChild(tr);
      }
    }
  });
}

function make_receipt(order_number, price, products, time) {
  get_products(products).then(
    (result) => {
      let doc = new jsPDF();
      doc.setFontType("bold");
      doc.text(20, 20, "Order Number:");

      doc.setFontType("normal");
      doc.text(20, 20, "" + order_number);

      doc.setFontType("bold");
      doc.text(20, 20, "\n\nTime Ordered:");

      doc.setFontType("normal");
      doc.text(20, 20, "" + time);

      doc.setFontType("bold");
      doc.text(20, 20, "\n\nYour items:");

      doc.setFontType("normal");
      for (let current in result) {
        let text = `Item: ${current.name}, Price: ${current.price}`;
        doc.text(20, 20, text);
      }

      doc.setFontType("bold");
      doc.text(20, 20, "\n\nTotal Price:");

      doc.setFontType("normal");
      doc.text(20, 20, "" + price);

      doc.save("receipt.pdf");
    },
    (err) => {}
  );
}

function get_products(products) {
  return new Promise((resolve, reject) => {
    try {
      let list = products.split(",");
      let data = [];
      for (let i = 0; i < list.length; ++i) {
        let url = `/api/product/get_product/${list[i]}`;
        $.get(url, (result) => {
          data.push({ name: result.body.name, price: result.body.price });

          if (i === list.length - 1) resolve(data);
        });
      }
    } catch (err) {
      console.log("Error in getting the products for receipt");
      console.log(err.message);
      reject(err);
    }
  });
}

function complete_order(id, div) {
  let url = "/api/order/done";
  let data = { id: id };

  $.post(url, data, (result) => {
    console.log(result);
    if (result.valid === true) {
      div = null;
    }
  });
}

document.getElementById("viewOrders").onclick = () => {
  document.getElementById("order").style.display = "block";
  document.getElementById("staffDiv").style.display = "none";
  getOrders();
};
