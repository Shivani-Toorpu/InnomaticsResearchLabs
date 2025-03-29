// let cart = [];
// let cartPanel = document.getElementById('cart-panel');
// let cartIcon = document.getElementById('cart-icon');
// let closeCart = document.getElementById('close-cart');
// let cartItemsContainer = document.getElementById('cart-items');
// let cartTotal = document.getElementById('cart-total');
// let cartCount = document.getElementById('cart-count');
// let emptyCartBtn = document.getElementById('empty-cart');

// // Load cart from localStorage
// function loadCart() {
//   const savedCart = localStorage.getItem('cart');
//   if (savedCart) {
//     cart = JSON.parse(savedCart);
//     updateCartUI();
//   }
// }

// // Save cart to localStorage
// function saveCart() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Update cart UI
// function updateCartUI() {
//   cartItemsContainer.innerHTML = '';
//   let total = 0;

//   cart.forEach((item, index) => {
//     total += item.price * item.quantity;
//     const cartItem = document.createElement('div');
//     cartItem.className = 'cart-item';
//     cartItem.innerHTML = `
//       <img src="${item.image}" alt="${item.name}">
//       <div class="cart-item-info">
//         <h4>${item.name}</h4>
//         <p>₹${(item.price * item.quantity).toFixed(2)}</p>
//       </div>
//       <div class="cart-item-controls">
//         <button onclick="decreaseQuantity(${index})">-</button>
//         <span>${item.quantity}</span>
//         <button onclick="increaseQuantity(${index})">+</button>
//         <button onclick="removeItem(${index})">Remove</button>
//       </div>
//     `;
//     cartItemsContainer.appendChild(cartItem);
//   });

//   cartTotal.textContent = total.toFixed(2);
//   cartCount.textContent = cart.length;
// }

// // Add item to cart
// document.querySelectorAll('.add-to-cart').forEach(button => {
//   button.addEventListener('click', () => {
//     const product = {
//       id: button.getAttribute('product-id'),
//       name: button.getAttribute('product-name'),
//       price: parseFloat(button.getAttribute('product-price').replace(/,/g, '')),
//       quantity: 1,
//       image: button.parentElement.querySelector('img').src
//     };

//     const existingItem = cart.find(item => item.id === product.id);
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push(product);
//     }

//     updateCartUI();
//     saveCart();
//   });
// });

// // Increase quantity
// function increaseQuantity(index) {
//   cart[index].quantity += 1;
//   updateCartUI();
//   saveCart();
// }

// // Decrease quantity
// function decreaseQuantity(index) {
//   if (cart[index].quantity > 1) {
//     cart[index].quantity -= 1;
//   } else {
//     cart.splice(index, 1);
//   }
//   updateCartUI();
//   saveCart();
// }

// // Remove item
// function removeItem(index) {
//   cart.splice(index, 1);
//   updateCartUI();
//   saveCart();
// }

// // Empty cart
// emptyCartBtn.addEventListener('click', () => {
//   cart = [];
//   updateCartUI();
//   saveCart();
// });

// // Toggle cart panel
// cartIcon.addEventListener('click', () => {
//   cartPanel.classList.toggle('open');
// });

// closeCart.addEventListener('click', () => {
//   cartPanel.classList.remove('open');
// });

// // Load cart on page load
// loadCart();


// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartPanel = document.getElementById("cart-panel");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const emptyCartBtn = document.getElementById("empty-cart");
    const cartCount = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    updateCartDisplay();

    // Show/Hide Cart Panel
    cartIcon.addEventListener("click", function () {
        cartPanel.classList.toggle("open");
    });

    closeCart.addEventListener("click", function () {
        cartPanel.classList.remove("open");
    });

    // Add to Cart Functionality
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("product-id");
            const productName = this.getAttribute("product-name");
            const productPrice = parseFloat(this.getAttribute("product-price"));

            addToCart(productId, productName, productPrice);
        });
    });

    function addToCart(id, name, price) {
        let existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        updateCart();
    }

    function updateCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity} = ₹${itemTotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="increase" data-id="${item.id}">+</button>
                    <button class="decrease" data-id="${item.id}">-</button>
                    <button class="remove" data-id="${item.id}">x</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = itemCount;

        addCartEventListeners();
    }

    function addCartEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                let id = this.getAttribute("data-id");
                let item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity += 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                let id = this.getAttribute("data-id");
                let item = cart.find(item => item.id === id);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                updateCart();
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function () {
                let id = this.getAttribute("data-id");
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Empty Cart Functionality
    emptyCartBtn.addEventListener("click", function () {
        cart = [];
        updateCart();
    });
});
