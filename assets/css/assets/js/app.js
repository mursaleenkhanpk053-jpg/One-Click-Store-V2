/**
 * =====================================================
 * ONE-CLICK STORE V2 - MAIN APPLICATION SCRIPT
 * Professional Ecommerce Website JavaScript
 * Production-Ready Vanilla JavaScript
 * ===================================================== */

'use strict';

// =====================================================
// 1. APPLICATION CONFIGURATION
// =====================================================
const APP_CONFIG = {
    slideInterval: 5000,
    cartStorageKey: 'oneClickCart',
    wishlistStorageKey: 'oneClickWishlist',
    toastDuration: 3000,
    animationDuration: 300,
};

// =====================================================
// 2. PRODUCT DATA
// =====================================================
const PRODUCTS_DATA = {
    featured: [
        {
            id: 1,
            name: 'Premium Smartwatch',
            category: 'Electronics',
            price: 199.99,
            originalPrice: 299.99,
            image: 'assets/images/product-featured-1.jpg',
            rating: 5,
            reviews: 1243,
            description: 'Advanced fitness tracking with heart rate monitor',
        },
        {
            id: 2,
            name: 'Portable Power Bank 30000mAh',
            category: 'Electronics',
            price: 34.99,
            originalPrice: 54.99,
            image: 'assets/images/product-featured-2.jpg',
            rating: 4,
            reviews: 2145,
            description: 'Fast charging with dual USB ports',
        },
        {
            id: 3,
            name: 'Waterproof Bluetooth Speaker',
            category: 'Electronics',
            price: 79.99,
            originalPrice: 129.99,
            image: 'assets/images/product-featured-3.jpg',
            rating: 5,
            reviews: 3892,
            description: '360° sound with 12-hour battery',
        },
        {
            id: 4,
            name: 'Laptop Backpack 17-inch',
            category: 'Fashion',
            price: 44.99,
            originalPrice: 69.99,
            image: 'assets/images/product-featured-4.jpg',
            rating: 5,
            reviews: 1567,
            description: 'Water-resistant with multiple compartments',
        },
        {
            id: 5,
            name: 'USB-C Hub Multiport',
            category: 'Electronics',
            price: 39.99,
            originalPrice: 74.99,
            image: 'assets/images/product-featured-5.jpg',
            rating: 5,
            reviews: 2234,
            description: '7-in-1 connectivity hub',
        },
        {
            id: 6,
            name: 'Wireless Mouse Silent',
            category: 'Electronics',
            price: 24.99,
            originalPrice: 44.99,
            image: 'assets/images/product-featured-6.jpg',
            rating: 4,
            reviews: 1845,
            description: 'Quiet click technology',
        },
        {
            id: 7,
            name: 'Monitor Arm Stand Dual',
            category: 'Electronics',
            price: 89.99,
            originalPrice: 149.99,
            image: 'assets/images/product-featured-7.jpg',
            rating: 5,
            reviews: 987,
            description: 'Full motion VESA mount',
        },
        {
            id: 8,
            name: 'Webcam HD 1080p',
            category: 'Electronics',
            price: 49.99,
            originalPrice: 89.99,
            image: 'assets/images/product-featured-8.jpg',
            rating: 5,
            reviews: 2654,
            description: 'Auto focus with noise cancelling mic',
        },
    ],
    deals: [
        {
            id: 101,
            name: 'Premium Wireless Headphones',
            category: 'Electronics',
            price: 89.99,
            originalPrice: 164.99,
            discount: 45,
            image: 'assets/images/product-deal-1.jpg',
            rating: 5,
            reviews: 2345,
            description: 'Noise cancelling with 30-hour battery',
            timeRemaining: 45,
        },
        {
            id: 102,
            name: '4K Smart TV 55-inch',
            category: 'Electronics',
            price: 349.99,
            originalPrice: 515.99,
            discount: 32,
            image: 'assets/images/product-deal-2.jpg',
            rating: 4,
            reviews: 1892,
            description: 'Ultra HD with smart apps',
            timeRemaining: 60,
        },
        {
            id: 103,
            name: 'Mechanical Gaming Keyboard',
            category: 'Electronics',
            price: 59.99,
            originalPrice: 142.99,
            discount: 58,
            image: 'assets/images/product-deal-3.jpg',
            rating: 5,
            reviews: 3120,
            description: 'RGB backlighting with custom switches',
            timeRemaining: 75,
        },
        {
            id: 104,
            name: 'Professional Camera DSLR',
            category: 'Electronics',
            price: 799.99,
            originalPrice: 1329.99,
            discount: 40,
            image: 'assets/images/product-deal-4.jpg',
            rating: 5,
            reviews: 956,
            description: '24MP sensor with 4K video',
            timeRemaining: 90,
        },
    ],
    bestsellers: [
        {
            id: 201,
            name: 'USB-C Charging Cable Fast',
            category: 'Electronics',
            price: 12.99,
            originalPrice: 24.99,
            image: 'assets/images/bestseller-1.jpg',
            rating: 5,
            reviews: 5342,
            description: 'Ultra-durable, fast charging cable compatible with all USB-C devices.',
            rank: 1,
        },
        {
            id: 202,
            name: 'Phone Screen Protector Glass',
            category: 'Electronics',
            price: 6.99,
            originalPrice: 15.99,
            image: 'assets/images/bestseller-2.jpg',
            rating: 5,
            reviews: 4876,
            description: 'Tempered glass screen protector with 9H hardness rating.',
            rank: 2,
        },
        {
            id: 203,
            name: 'Phone Case Protective Armor',
            category: 'Fashion',
            price: 14.99,
            originalPrice: 29.99,
            image: 'assets/images/bestseller-3.jpg',
            rating: 5,
            reviews: 6123,
            description: 'Military-grade protection with premium design.',
            rank: 3,
        },
        {
            id: 204,
            name: 'Wireless Earbuds Pro',
            category: 'Electronics',
            price: 119.99,
            originalPrice: 249.99,
            image: 'assets/images/bestseller-4.jpg',
            rating: 5,
            reviews: 7456,
            description: 'Active noise cancellation with 32-hour battery life.',
            rank: 4,
        },
    ],
};

// =====================================================
// 3. GLOBAL STATE MANAGEMENT
// =====================================================
const AppState = {
    cart: [],
    wishlist: [],
    currentSlide: 0,
    sliderInterval: null,

    /**
     * Initialize application state from localStorage
     */
    init() {
        this.loadCart();
        this.loadWishlist();
    },

    /**
     * Load cart from localStorage
     */
    loadCart() {
        const saved = localStorage.getItem(APP_CONFIG.cartStorageKey);
        this.cart = saved ? JSON.parse(saved) : [];
        this.updateCartCounter();
    },

    /**
     * Save cart to localStorage
     */
    saveCart() {
        localStorage.setItem(APP_CONFIG.cartStorageKey, JSON.stringify(this.cart));
        this.updateCartCounter();
    },

    /**
     * Load wishlist from localStorage
     */
    loadWishlist() {
        const saved = localStorage.getItem(APP_CONFIG.wishlistStorageKey);
        this.wishlist = saved ? JSON.parse(saved) : [];
    },

    /**
     * Save wishlist to localStorage
     */
    saveWishlist() {
        localStorage.setItem(APP_CONFIG.wishlistStorageKey, JSON.stringify(this.wishlist));
    },

    /**
     * Add product to cart
     */
    addToCart(product) {
        const existingItem = this.cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
            });
        }

        this.saveCart();
    },

    /**
     * Remove product from cart
     */
    removeFromCart(productId) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCart();
    },

    /**
     * Add product to wishlist
     */
    addToWishlist(product) {
        if (!this.wishlist.find((item) => item.id === product.id)) {
            this.wishlist.push(product);
            this.saveWishlist();
            return true;
        }
        return false;
    },

    /**
     * Remove product from wishlist
     */
    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter((item) => item.id !== productId);
        this.saveWishlist();
    },

    /**
     * Check if product is in wishlist
     */
    isInWishlist(productId) {
        return this.wishlist.some((item) => item.id === productId);
    },

    /**
     * Update cart counter in header
     */
    updateCartCounter() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    },

    /**
     * Get cart total
     */
    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    /**
     * Get cart item count
     */
    getCartItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
};

// =====================================================
// 4. TOAST NOTIFICATION SYSTEM
// ===================================================== */
const Toast = {
    /**
     * Show toast notification
     */
    show(message, type = 'success', duration = APP_CONFIG.toastDuration) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        const container = document.getElementById('toastContainer') || this.createContainer();
        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), APP_CONFIG.animationDuration);
        }, duration);
    },

    /**
     * Create toast container if it doesn't exist
     */
    createContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    },
};

// Add toast styles
const addToastStyles = () => {
    if (document.getElementById('toastStyles')) return;

    const style = document.createElement('style');
    style.id = 'toastStyles';
    style.textContent = `
        .toast {
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateX(400px);
            transition: all 300ms ease-in-out;
            pointer-events: auto;
            cursor: pointer;
            font-size: 14px;
        }

        .toast.show {
            opacity: 1;
            transform: translateX(0);
        }

        .toast-success {
            background-color: #2ecc71;
        }

        .toast-error {
            background-color: #e74c3c;
        }

        .toast-warning {
            background-color: #f39c12;
        }

        .toast-info {
            background-color: #3498db;
        }

        .toast:hover {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
};

// =====================================================
// 5. HERO SLIDER FUNCTIONALITY
// ===================================================== */
const HeroSlider = {
    /**
     * Initialize hero slider
     */
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
    },

    /**
     * Setup slider button event listeners
     */
    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());

        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
                this.restartAutoPlay();
            });
        });
    },

    /**
     * Show slide at specific index
     */
    showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        if (index >= slides.length) {
            AppState.currentSlide = 0;
        } else if (index < 0) {
            AppState.currentSlide = slides.length - 1;
        } else {
            AppState.currentSlide = index;
        }

        slides.forEach((slide) => slide.classList.remove('active'));
        dots.forEach((dot) => dot.classList.remove('active'));

        if (slides[AppState.currentSlide]) {
            slides[AppState.currentSlide].classList.add('active');
        }

        if (dots[AppState.currentSlide]) {
            dots[AppState.currentSlide].classList.add('active');
        }
    },

    /**
     * Go to next slide
     */
    next() {
        this.showSlide(AppState.currentSlide + 1);
        this.restartAutoPlay();
    },

    /**
     * Go to previous slide
     */
    prev() {
        this.showSlide(AppState.currentSlide - 1);
        this.restartAutoPlay();
    },

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        this.showSlide(index);
    },

    /**
     * Start autoplay
     */
    startAutoPlay() {
        AppState.sliderInterval = setInterval(() => {
            this.next();
        }, APP_CONFIG.slideInterval);
    },

    /**
     * Restart autoplay (clear and restart)
     */
    restartAutoPlay() {
        clearInterval(AppState.sliderInterval);
        this.startAutoPlay();
    },
};

// =====================================================
// 6. PRODUCT RENDERING FUNCTIONS
// ===================================================== */
const ProductRenderer = {
    /**
     * Create product card HTML
     */
    createProductCard(product, type = 'featured') {
        const isInWishlist = AppState.isInWishlist(product.id);
        const discount = product.discount ? `-${product.discount}%` : '';

        const cardHTML = `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${discount ? `<div class="deal-badge">${discount}</div>` : ''}
                    <div class="product-overlay">
                        <button class="quick-view-btn" aria-label="Quick View">Quick View</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="rating">
                        <span class="stars">${this.renderStars(product.rating)}</span>
                        <span class="review-count">(${product.reviews.toLocaleString()})</span>
                    </div>
                    <div class="product-pricing">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn" aria-label="Add to Cart">Add to Cart</button>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = cardHTML;
        const card = container.firstElementChild;

        // Add to cart event
        const addCartBtn = card.querySelector('.add-to-cart-btn');
        addCartBtn.addEventListener('click', () => {
            AppState.addToCart(product);
            Toast.show(`${product.name} added to cart!`, 'success');
        });

        // Quick view event
        const quickViewBtn = card.querySelector('.quick-view-btn');
        quickViewBtn.addEventListener('click', () => {
            this.showQuickView(product);
        });

        return card;
    },

    /**
     * Create deal card HTML
     */
    createDealCard(product) {
        const dealHTML = `
            <div class="deal-card" data-product-id="${product.id}">
                <div class="deal-badge">-${product.discount}%</div>
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="deal-info">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        <span class="stars">${this.renderStars(product.rating)}</span>
                        <span class="review-count">(${product.reviews.toLocaleString()})</span>
                    </div>
                    <div class="pricing">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="deal-timer">
                        <span class="timer-label">Ends in:</span>
                        <span class="timer" data-time="${product.timeRemaining}">12:45:30</span>
                    </div>
                    <button class="add-to-cart-btn" aria-label="Add to Cart">Add to Cart</button>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = dealHTML;
        const card = container.firstElementChild;

        // Add to cart event
        const addCartBtn = card.querySelector('.add-to-cart-btn');
        addCartBtn.addEventListener('click', () => {
            AppState.addToCart(product);
            Toast.show(`${product.name} added to cart!`, 'success');
        });

        // Start deal timer
        this.startDealTimer(card.querySelector('.timer'));

        return card;
    },

    /**
     * Create bestseller card HTML
     */
    createBestsellerCard(product) {
        const sellerHTML = `
            <div class="bestseller-card" data-product-id="${product.id}">
                <div class="bestseller-rank">#${product.rank}</div>
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="bestseller-info">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        <span class="stars">${this.renderStars(product.rating)}</span>
                        <span class="review-count">(${product.reviews.toLocaleString()})</span>
                    </div>
                    <p class="description">${product.description}</p>
                    <div class="pricing">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart-btn" aria-label="Add to Cart">Add to Cart</button>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = sellerHTML;
        const card = container.firstElementChild;

        // Add to cart event
        const addCartBtn = card.querySelector('.add-to-cart-btn');
        addCartBtn.addEventListener('click', () => {
            AppState.addToCart(product);
            Toast.show(`${product.name} added to cart!`, 'success');
        });

        return card;
    },

    /**
     * Render star rating
     */
    renderStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    },

    /**
     * Start deal countdown timer
     */
    startDealTimer(timerElement) {
        if (!timerElement) return;

        const timeRemaining = parseInt(timerElement.dataset.time) * 60; // Convert to seconds
        let secondsLeft = timeRemaining;

        const updateTimer = () => {
            const hours = Math.floor(secondsLeft / 3600);
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;

            timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            secondsLeft--;

            if (secondsLeft < 0) {
                timerElement.textContent = 'Deal Ended';
                timerElement.style.color = '#999';
            } else {
                setTimeout(updateTimer, 1000);
            }
        };

        updateTimer();
    },

    /**
     * Show quick view modal
     */
    showQuickView(product) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}" class="modal-image">
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <div class="rating">
                            <span class="stars">${this.renderStars(product.rating)}</span>
                            <span class="review-count">(${product.reviews.toLocaleString()} reviews)</span>
                        </div>
                        <p class="description">${product.description}</p>
                        <div class="pricing">
                            <span class="price">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <div class="modal-actions">
                            <button class="add-to-cart-btn-modal">Add to Cart</button>
                            <button class="wishlist-btn-modal">❤ Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles if not exists
        if (!document.getElementById('quickViewStyles')) {
            const style = document.createElement('style');
            style.id = 'quickViewStyles';
            style.textContent = `
                .quick-view-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .modal-content {
                    background-color: white;
                    border-radius: 12px;
                    max-width: 700px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }

                .modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 32px;
                    cursor: pointer;
                    color: #999;
                    z-index: 1001;
                }

                .modal-body {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                    padding: 32px;
                }

                .modal-image {
                    width: 100%;
                    border-radius: 8px;
                }

                .modal-info {
                    display: flex;
                    flex-direction: column;
                }

                .modal-info h2 {
                    margin-bottom: 12px;
                }

                .modal-info .rating {
                    margin-bottom: 16px;
                }

                .modal-info .description {
                    color: #666;
                    margin-bottom: 16px;
                    flex: 1;
                }

                .modal-info .pricing {
                    margin-bottom: 24px;
                }

                .modal-actions {
                    display: flex;
                    gap: 12px;
                }

                .add-to-cart-btn-modal,
                .wishlist-btn-modal {
                    flex: 1;
                    padding: 12px 16px;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 300ms ease;
                }

                .add-to-cart-btn-modal {
                    background-color: #FF9900;
                    color: #111;
                }

                .add-to-cart-btn-modal:hover {
                    background-color: #FF8800;
                }

                .wishlist-btn-modal {
                    background-color: #f5f5f5;
                    color: #111;
                    border: 2px solid #FF9900;
                }

                .wishlist-btn-modal:hover {
                    background-color: #FF9900;
                    color: white;
                }

                @media (max-width: 600px) {
                    .modal-body {
                        grid-template-columns: 1fr;
                        gap: 16px;
                        padding: 16px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Add to cart from modal
        const addCartBtn = modal.querySelector('.add-to-cart-btn-modal');
        addCartBtn.addEventListener('click', () => {
            AppState.addToCart(product);
            Toast.show(`${product.name} added to cart!`, 'success');
            modal.remove();
        });

        // Wishlist button
        const wishlistBtn = modal.querySelector('.wishlist-btn-modal');
        wishlistBtn.addEventListener('click', () => {
            if (AppState.addToWishlist(product)) {
                Toast.show(`${product.name} added to wishlist!`, 'success');
                wishlistBtn.style.backgroundColor = '#FF9900';
                wishlistBtn.style.color = 'white';
            } else {
                AppState.removeFromWishlist(product.id);
                Toast.show(`${product.name} removed from wishlist`, 'info');
                wishlistBtn.style.backgroundColor = '#f5f5f5';
                wishlistBtn.style.color = '#111';
            }
        });
    },
};

// =====================================================
// 7. PAGE INITIALIZATION
// ===================================================== */
const PageRenderer = {
    /**
     * Render featured products
     */
    renderFeaturedProducts() {
        const container = document.querySelector('.products-grid');
        if (!container) return;

        container.innerHTML = '';
        PRODUCTS_DATA.featured.forEach((product) => {
            const card = ProductRenderer.createProductCard(product, 'featured');
            container.appendChild(card);
        });
    },

    /**
     * Render today's deals
     */
    renderDeals() {
        const container = document.querySelector('.deals-container');
        if (!container) return;

        container.innerHTML = '';
        PRODUCTS_DATA.deals.forEach((product) => {
            const card = ProductRenderer.createDealCard(product);
            container.appendChild(card);
        });
    },

    /**
     * Render best sellers
     */
    renderBestSellers() {
        const container = document.querySelector('.best-sellers-container');
        if (!container) return;

        container.innerHTML = '';
        PRODUCTS_DATA.bestsellers.forEach((product) => {
            const card = ProductRenderer.createBestsellerCard(product);
            container.appendChild(card);
        });
    },

    /**
     * Render all product sections
     */
    renderAll() {
        this.renderFeaturedProducts();
        this.renderDeals();
        this.renderBestSellers();
    },
};

// =====================================================
// 8. SEARCH FUNCTIONALITY
// ===================================================== */
const SearchService = {
    /**
     * Search products across all categories
     */
    search(query) {
        if (!query || query.trim().length === 0) return [];

        const searchTerm = query.toLowerCase();
        const allProducts = [
            ...PRODUCTS_DATA.featured,
            ...PRODUCTS_DATA.deals,
            ...PRODUCTS_DATA.bestsellers,
        ];

        return allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
        );
    },

    /**
     * Initialize search functionality
     */
    init() {
        const searchForm = document.getElementById('searchForm');
        if (!searchForm) return;

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = searchForm.querySelector('.search-input');
            const query = input.value.trim();

            if (query.length === 0) {
                Toast.show('Please enter a search term', 'warning');
                return;
            }

            const results = this.search(query);

            if (results.length === 0) {
                Toast.show('No products found matching your search', 'info');
            } else {
                Toast.show(`Found ${results.length} products`, 'success');
                // Could redirect to search results page or show results in modal
            }

            input.value = '';
        });
    },
};

// =====================================================
// 9. NEWSLETTER FUNCTIONALITY
// ===================================================== */
const NewsletterService = {
    /**
     * Validate email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Initialize newsletter
     */
    init() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.newsletter-input');
            const email = input.value.trim();

            if (!email) {
                Toast.show('Please enter your email address', 'warning');
                return;
            }

            if (!this.validateEmail(email)) {
                Toast.show('Please enter a valid email address', 'error');
                return;
            }

            // Simulate subscription
            Toast.show('Thank you for subscribing!', 'success');
            input.value = '';
            // Here you could send the email to your backend
        });
    },
};

// =====================================================
// 10. FOOTER AUTO-UPDATE
// ===================================================== */
const FooterService = {
    /**
     * Update copyright year
     */
    updateYear() {
        const yearElements = document.querySelectorAll('[data-year]');
        const currentYear = new Date().getFullYear();

        yearElements.forEach((element) => {
            element.textContent = currentYear;
        });

        // Also update in footer text if it has 2024
        const footerText = document.querySelector('.footer-bottom-content p');
        if (footerText && footerText.textContent.includes('2024')) {
            footerText.textContent = footerText.textContent.replace('2024', currentYear);
        }
    },
};

// =====================================================
// 11. MOBILE MENU FUNCTIONALITY
// ===================================================== */
const MobileMenu = {
    /**
     * Initialize mobile menu
     */
    init() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const navbar = document.getElementById('navbar');

        if (!menuBtn || !navbar) return;

        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            menuBtn.classList.toggle('active');
        });

        // Close menu on link click
        const navLinks = navbar.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-open');
                menuBtn.classList.remove('active');
            });
        });
    },
};

// =====================================================
// 12. UTILITY FUNCTIONS
// ===================================================== */

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// =====================================================
// 13. MAIN APPLICATION INITIALIZATION
// ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app state
    AppState.init();

    // Add toast styles
    addToastStyles();

    // Initialize components
    HeroSlider.init();
    SearchService.init();
    NewsletterService.init();
    MobileMenu.init();
    FooterService.updateYear();

    // Render all products
    PageRenderer.renderAll();

    // Add keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') HeroSlider.prev();
        if (e.key === 'ArrowRight') HeroSlider.next();
    });

    // Log app ready
    console.log('🛒 One-Click Store V2 - Ready!');
});

// =====================================================
// 14. PERFORMANCE OPTIMIZATION - SERVICE WORKER SUPPORT
// ===================================================== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is available
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// =====================================================
// 15. ERROR HANDLING
// ===================================================== */
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    // In production, you might want to send this to an error tracking service
});

// =====================================================
// END OF APPLICATION SCRIPT
// ===================================================== */
