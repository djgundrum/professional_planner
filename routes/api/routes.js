let routes = {
  api: {
    account: {
      get: {
        // Check to see if the user is signed in
        //p: no parameters needed (will return the user if signed in)
        validate: "/api/account/validate",
      },
      post: {
        // Returns user information if successful
        // p: email, password
        signin: "/api/account/signin",

        // Create a new customer, returns if successful
        //p: name, email, password
        signup: "/api/account/signup",

        // Update the user account, returns if successful
        //p: name, email, password, phone, address, role
        update: "/api/account/update",
      },
    },
    cart: {
      post: {
        // Add item to your cart
        //p: product_id, quantity
        add_to_your_cart: "/api/cart/add",
        // Deletes an item from the cart
        //p: id (id of the product)
        delete_item_from_cart: "/api/cart/delete",
      },
      get: {
        // Returns all items in customer's cart (need to have signed in)
        //p: No parameters needed
        get_all_cart: "/api/cart/all",
      },
    },
    order: {
      post: {
        // Create a new order, returns if successful
        //p: time, products, price (products are id of products separated by commas)
        create_new_order: "/api/order/new_order",

        // Set an existing order to completed
        //p: id (id of the completed order)
        complete_order: "/api/order/done",

        // Set the priority of an order
        //p: id, priority (id of the order and the new priority that it will have)
        set_order_priority: "/api/order/set_priority",
      },
      get: {
        // Returns array of order objects, all are not completed
        //p: no parameters
        get_current_unfinished_orders: "/api/order/all",

        // Returns all of the orders from one user
        //p: No parameters needed
        get_all_user_orders: "/api/order/order_history",
      },
    },
    menu: {
      post: {},
      get: {
        // Get all the products in the database
        //p: No parameters needed
        get_all_products: "/api/menu/all",
      },
    },
    product: {
      post: {
        // Create a new product in the database
        //p: name, description, photo_url, section, price
        new_product: "/api/product/new",

        // Update an existing product
        //p: id, name, description, photo_url, section, price, available
        update_product: "/api/product/update",
      },
      get: {
        //This will return the specified product given in the url
        //p: product_id (id of the product you are tring to search)
        get_product: "/api/product/get_product/:product_id",
      },
    },
    messages: {
      post: {
        // Send a message
        //p: id, message (id is always the id of the customer, never send admin user_id)
        send_message: "/api/messages/new",
      },
      get: {
        // Get all the messages tied to a user (if admin all the messages are returned)
        //p: no parameters needed
        get_messages: "/api/messages/all",
      },
    },
  },
};

/* 

Database Schema

cart: {
    id: int (unique)
    user_id: int (id of the user that is ordering it)
    product_id: int (id of the food item)
    quantity: int (amount of that item)
}

orders: {
    id: int (unique)
    time: varchar(255) (time that the order was placed)
    completed: int (0 if not done, 1 if completed)
    products: varchar(500) (A list of the products in that order, each product it separated by a comma)
    price: varchar(255) (Total price of the order)
    priority: int (Where the order is in the queue)
    car_description: varchar(500) (Description of the customer's car)
    additional_instructions: varchar(500) (If the customer has any more notes)
    user_id: int (The id of the user that placed the order)
}

user: {
    id: int (unique)
    name: varchar(255) (Name of the user)
    email: varchar(255) (Email of the user)
    password: varchar(255) (Password of the user)
    phone: varchar(255) (Phone number of the user)
    address: varchar(255) (Address of the user)
    role: varchar(255) (Role of the user)
}

products {
    id: int (unique)
    name: varchar(255) (Name of the product)
    description: varchar(500) (Description of the product)
    photo_url: varchar(500) (Online url to the image)
    section: varchar(255) (Entre or dessert etc.)
    price: varchar(255) (Price of the product)
    available: int (Whether or not product can be purchased)
}

messages: {
  id: int (unique)
  user_id: int (id of the user sending the message)
  message: varchar(500) (self-explanatory)
}

*/
