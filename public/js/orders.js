makeTable();

function makeTable() {
    let url = "/api/order/all";
    $.get(url, (response) => {

        for (i = 0; i < response.body.data.length; i++) {
            addOrder(
              response.body.data[i].id,
              response.body.data[i].time,
              response.body.data[i].completed,
              response.body.data[i].products,
              response.body.data[i].price
            );
          } s


    


}