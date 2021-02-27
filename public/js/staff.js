function getOrders() {
  let url = "/api/order/all";

  $.get(url, (response) => {
    console.log(response);
    if (response.valid === false) return;
    else {
      let rows = (orders = response.body.orders);

      for (let i = 0; i < rows.length; ++i) {
        let row = rows[i];
        let tr = document.createElement("tr");
        tr.classList.add("table_row");
        tr.style.borderTop = "1px solid #717171;";

        let up_arrow = document.createElement("div");
        let down_arrow = document.createElement("div");
        up_arrow.classList.add("arrow");
        down_arrow.classList.add("arrow");
        up_arrow.classList.add("up");
        down_arrow.classList.add("down");
        down_arrow.onclick = () => {
          if (i + 1 < rows.length) set_priority(row, rows[i + 1]);
          else return;
        };
        up_arrow.onclick = () => {
          if (i - 1 >= 0) set_priority(row, rows[i - 1]);
          else return;
        };

        let priority = document.createElement("td");
        priority.appendChild(up_arrow);
        priority.appendChild(down_arrow);

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
          complete_order(row.id, tr);
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

function set_priority(first, second) {
  let first_data = { id: first.id, priority: second.priority };
  let second_data = { id: second.id, priority: first.priority };
  let url = "/api/order/set_priority";

  $.post(url, first_data, (result) => {
    console.log(result);
    $.post(url, second_data, (result) => {
      console.log(result);
      document.getElementById("order_table").innerHTML =
        '<tr id="cartHeader"><th style="width: auto; min-width: 100px"></th><th style="width: 200px">Order #</th><th style="width: 200px">Time</th><th style="width: 200px"></th><th style="width: 200px"></th></tr>';

      getOrders();
    });
  });
}

function make_receipt(order_number, price, products, time) {
  get_products(products).then(
    (result) => {
      console.log("This is the make_receipt");
      console.log(result);
      console.log(order_number);
      console.log(price);
      console.log(products);
      console.log(time);
      let doc = new jsPDF();
      doc.setFontType("bold");
      doc.text(20, 20, "Order Number:");

      doc.setFontType("normal");
      doc.text(20, 30, "" + order_number);

      doc.setFontType("bold");
      doc.text(20, 50, "Time Ordered:");

      doc.setFontType("normal");
      doc.text(20, 60, "" + time);

      doc.setFontType("bold");
      doc.text(20, 80, "Your items:");

      doc.setFontType("normal");
      let offset = 90;
      for (let i = 0; i < result.length; ++i) {
        let text = `Item: ${result[i].name}, Price: ${result[i].price}`;
        doc.text(20, offset, text);
        offset += 10;
      }

      offset += 20;
      doc.setFontType("bold");
      doc.text(20, offset, "Total Price:");

      offset += 10;
      doc.setFontType("normal");
      doc.text(20, offset, "" + price);

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
          console.log(result);
          data.push({
            name: result.body.product.name,
            price: result.body.product.price,
          });

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
      div.parentNode.removeChild(div);
    }
  });
}

document.getElementById("viewOrders").onclick = () => {
  document.getElementById("order").style.display = "block";
  document.getElementById("staffDiv").style.display = "none";
  getOrders();
};
