const trackingForm = document.getElementById("tracking-form");
const orderInput = document.getElementById("order-id");
const trackingMessage = document.getElementById("tracking-message");
const trackingResult = document.getElementById("tracking-result");

const statusSteps = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

function formatShipmentPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function getSavedOrders() {
  try {
    return JSON.parse(localStorage.getItem("shopEaseOrders") || "[]");
  } catch (error) {
    return [];
  }
}

function showOrder(orderId) {
  const order = getSavedOrders().find(item =>
    String(item.orderId).toLowerCase() === orderId.trim().toLowerCase()
  );

  trackingResult.hidden = true;

  if (!order) {
    trackingMessage.textContent = "Order not found. Check the Order ID and try again in the same browser where you placed the order.";
    trackingMessage.className = "tracking-message is-error";
    return;
  }

  trackingMessage.textContent = "";
  trackingMessage.className = "tracking-message";
  document.getElementById("result-order-id").textContent = order.orderId;
  document.getElementById("result-status").textContent = order.status || "Order Placed";
  document.getElementById("result-date").textContent =
    "Order placed: " + new Date(order.placedAt).toLocaleString();

  const currentStep = Math.max(0, statusSteps.indexOf(order.status || "Order Placed"));
  document.querySelectorAll(".shipment-step").forEach((step, index) => {
    step.classList.toggle("is-complete", index < currentStep);
    step.classList.toggle("is-current", index === currentStep);
  });

  const itemsList = document.getElementById("result-items");
  itemsList.replaceChildren();

  order.items.forEach(item => {
    const listItem = document.createElement("li");
    const itemName = document.createElement("span");
    const itemPrice = document.createElement("strong");
    itemName.textContent = item.name + " × " + item.quantity;
    itemPrice.textContent = formatShipmentPrice(item.price * item.quantity);
    listItem.append(itemName, itemPrice);
    itemsList.appendChild(listItem);
  });

  document.getElementById("result-total").textContent = formatShipmentPrice(order.total);
  trackingResult.hidden = false;
}

trackingForm.addEventListener("submit", event => {
  event.preventDefault();
  showOrder(orderInput.value);
});

const params = new URLSearchParams(window.location.search);
const requestedOrderId = params.get("orderId");
if (requestedOrderId) {
  orderInput.value = requestedOrderId;
  showOrder(requestedOrderId);
}