// script.js
let cart = [];

function addToCart(id, name, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, img, qty: 1 });
    }
    updateUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateUI();
}

function updateQty(id, val) {
    const item = cart.find(item => item.id === id);
    if (item) item.qty = parseInt(val);
    updateUI();
}

function clearCart() {
    cart = [];
    updateUI();
}

function updateUI() {
    const cartList = document.getElementById('cart-items');
    const cartCountNav = document.getElementById('cart-count-nav');
    const cartHeader = document.getElementById('cart-header');
    
    cartList.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        cartList.innerHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <img src="${item.img}" class="item-img">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Size: medium, Color: blue</p>
                        <p>Seller: Artel Market</p>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
                <div class="item-price-qty">
                    <p><b>$${item.price.toFixed(2)}</b></p>
                    <select onchange="updateQty(${item.id}, this.value)">
                        <option ${item.qty == 1 ? 'selected':''}>1</option>
                        <option ${item.qty == 2 ? 'selected':''}>2</option>
                        <option ${item.qty == 3 ? 'selected':''}>3</option>
                    </select>
                </div>
            </div>
        `;
    });

    // Math Logic
    const taxValue = subtotal * 0.02; // 2% Tax
    const total = subtotal + taxValue;

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `+$${taxValue.toFixed(2)}`;
    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
    
    cartCountNav.innerText = cart.length;
    cartHeader.innerText = `My cart (${cart.length})`;
}