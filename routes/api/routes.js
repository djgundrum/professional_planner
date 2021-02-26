let routes = {
  api: {
    account: {
      post: {
        // Returns user information if successful
        // p: email, password
        signin: "/api/account/signin",

        // Create a new customer, returns if successful
        //p: name, email, password
        signup: "/api/account/sginup",
      },
    },
    cart: {
      post: {
        // Create a new order, returns if successful
        //p: time, products, price (products are id of products separated by commas)
        create_new_order: "/api/order/new_order",
      },
      get: {
        // Returns array of order objects, all are not completed
        //p: no parameters
        get_current_unfinished_orders: "/api/order/all",
      },
    },
  },
};
