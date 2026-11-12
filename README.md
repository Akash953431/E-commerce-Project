# ShopEase - E-commerce Project

A beginner-friendly, responsive e-commerce storefront built using **HTML, CSS, and vanilla JavaScript**.

## Features

- Responsive homepage and product grid
- Product search by name
- Category filtering
- Add products to the shopping cart
- Increase and decrease product quantities
- Remove products from the cart
- Automatic cart count and total price calculation
- Demo checkout that creates an Order ID
- Shipment tracking page with order details and a delivery timeline

## Project structure

```
E-commerce-Project/
├── index.html
├── login.html
├── login.js
├── script.js
├── shipment.html
├── shipment.js
├── style.css
└── README.md
```

## Run the project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Add one or more products to the cart.
5. Select **Place demo order**. The page creates an Order ID and opens the tracking page.
6. You can also open **Track Order** from the navigation and enter a saved Order ID.

## Shipment module

The shipment module saves demo orders in the browser's localStorage and displays the order items, total, placed date, and a delivery-status timeline. Use the same browser and device where the demo order was placed.

## Technologies

- HTML5 - page structure
- CSS3 - layout and responsive styling
- JavaScript - product display, cart, demo orders, and shipment tracking
- Browser localStorage - temporary demo order storage

## Important limitation

This is an educational front-end demonstration. It does not have a backend, shared database, real payment processing, courier integration, or live shipment updates. Order data is stored only in the current browser.
