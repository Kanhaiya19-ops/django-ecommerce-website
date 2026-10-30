const KEY = "shoplite_cart";
let cart = JSON.parse(localStorage.getItem(KEY) || "[]");

const money = n => "₹" + Number(n).toLocaleString("en-IN", {maximumFractionDigits: 2});

function save() {
  localStorage.setItem(KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(item) {
  const found = cart.find(x => x.id === item.id);
  if (found) found.qty += 1;
  else cart.push({...item, qty: 1});
  save();
  openCart();
}

function renderCart() {
  const count = cart.reduce((sum, x) => sum + x.qty, 0);
  const countEl = document.querySelector("#cartCount");
  if (countEl) countEl.textContent = count;

  const list = document.querySelector("#cartItems");
  const totalEl = document.querySelector("#cartTotal");
  if (!list) return;

  if (!cart.length) {
    list.innerHTML = '<p class="muted">Your cart is empty.</p>';
    totalEl.textContent = money(0);
    return;
  }

  list.innerHTML = cart.map((x, i) => `
    <div class="cart-row">
      <div><strong>${x.name}</strong><br><small>${money(x.price)} × ${x.qty}</small></div>
      <div class="qty">
        <button onclick="changeQty(${i}, -1)">−</button>
        <span>${x.qty}</span>
        <button onclick="changeQty(${i}, 1)">+</button>
      </div>
    </div>
  `).join("");

  totalEl.textContent = money(cart.reduce((s, x) => s + Number(x.price) * x.qty, 0));
}

function changeQty(i, delta) {
  cart[i].qty += delta;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save();
}

function openCart() {
  document.querySelector("#cartPanel")?.classList.add("open");
  document.querySelector("#overlay")?.classList.add("open");
}
function closeCart() {
  document.querySelector("#cartPanel")?.classList.remove("open");
  document.querySelector("#overlay")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart({
      id: Number(btn.dataset.id),
      name: btn.dataset.name,
      price: Number(btn.dataset.price)
    }));
  });

  document.querySelector("#cartButton")?.addEventListener("click", openCart);
  document.querySelector("#closeCart")?.addEventListener("click", closeCart);
  document.querySelector("#overlay")?.addEventListener("click", closeCart);

  document.querySelector("#checkoutBtn")?.addEventListener("click", () => {
    alert("Demo checkout — connect this button to an order/payment flow.");
  });

  document.querySelector("#search")?.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll(".product-card").forEach(card => {
      card.style.display = card.dataset.name.includes(q) || card.dataset.category.includes(q) ? "" : "none";
    });
  });

  renderCart();
});
