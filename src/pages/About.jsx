import React, { useState, useEffect } from 'react';

const MercApp = () => {
    // Sample product data
    const products = [
        { id: 1, name: "Fresh Apples", category: "fruits", unit: "per kg", price: 3.99, emoji: "🍎" },
        { id: 2, name: "Organic Bananas", category: "fruits", unit: "per bunch", price: 2.49, emoji: "🍌" },
        { id: 3, name: "Baby Carrots", category: "vegetables", unit: "per bag", price: 1.89, emoji: "🥕" },
        { id: 4, name: "Fresh Broccoli", category: "vegetables", unit: "per head", price: 2.99, emoji: "🥦" },
        { id: 5, name: "Organic Milk", category: "dairy", unit: "per liter", price: 2.49, emoji: "🥛" },
        { id: 6, name: "Greek Yogurt", category: "dairy", unit: "per container", price: 4.99, emoji: "🥛" },
        { id: 7, name: "Sourdough Bread", category: "bakery", unit: "per loaf", price: 4.99, emoji: "🍞" },
        { id: 8, name: "Croissants", category: "bakery", unit: "pack of 4", price: 3.49, emoji: "🥐" },
        { id: 9, name: "Chicken Breast", category: "meat", unit: "per kg", price: 8.99, emoji: "🍗" },
        { id: 10, name: "Ground Beef", category: "meat", unit: "per kg", price: 12.99, emoji: "🥩" },
    ];

    // State management
    const [activeTab, setActiveTab] = useState('products');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [isDark, setIsDark] = useState(false);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('mercapp-cart') || '[]');
        const savedTheme = localStorage.getItem('mercapp-theme');
        setCart(savedCart);
        if (savedTheme === 'dark') {
            setIsDark(true);
        }
    }, []);

    // Save cart to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('mercapp-cart', JSON.stringify(cart));
    }, [cart]);

    // Save theme preference
    useEffect(() => {
        localStorage.setItem('mercapp-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Add product to cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            setCart(cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                productId: productId,
                quantity: 1,
                price: product.price
            }]);
        }

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    // Update quantity in cart
    const updateQuantity = (productId, change) => {
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean);

        setCart(updatedCart);

        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    };

    // Calculate cart totals
    const cartTotals = cart.reduce((totals, item) => {
        const itemTotal = item.price * item.quantity;
        totals.subtotal += itemTotal;
        totals.itemCount += item.quantity;
        return totals;
    }, { subtotal: 0, itemCount: 0 });

    const tax = cartTotals.subtotal * 0.08;
    const total = cartTotals.subtotal + tax;

    // Filter categories
    const categories = [
        { id: 'all', label: 'All', emoji: '' },
        { id: 'fruits', label: 'Fruits', emoji: '🍎' },
        { id: 'vegetables', label: 'Vegetables', emoji: '🥕' },
        { id: 'dairy', label: 'Dairy', emoji: '🥛' },
        { id: 'bakery', label: 'Bakery', emoji: '🍞' },
        { id: 'meat', label: 'Meat', emoji: '🥩' },
    ];

    const ProductCard = ({ product }) => (
        <div className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-xl overflow-hidden active:scale-95 transition-transform">
            <div className="p-4 text-center">
                <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-4xl mb-3">
                    {product.emoji}
                </div>
                <h3 className="text-base font-semibold mb-1 leading-tight text-gray-900 dark:text-white">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {product.category} • {product.unit}
                </p>
                <div className="text-lg font-bold text-green-500 mb-3">
                    ${product.price.toFixed(2)}
                </div>
                <button
                    className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    onClick={() => addToCart(product.id)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );

    const CartItem = ({ item }) => {
        const product = products.find(p => p.id === item.productId);
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-xl mb-3">
                <div className="p-4 flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold mb-0.5 text-gray-900 dark:text-white">
                            {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {product.category} • {product.unit}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button
                                className="w-8 h-8 bg-white dark:bg-gray-600 rounded-md flex items-center justify-center text-lg font-semibold text-blue-500 shadow-sm active:scale-95 transition-transform"
                                onClick={() => updateQuantity(item.productId, -1)}
                            >
                                −
                            </button>
                            <span className="text-base font-semibold min-w-6 text-center text-gray-900 dark:text-white">
                                {item.quantity}
                            </span>
                            <button
                                className="w-8 h-8 bg-white dark:bg-gray-600 rounded-md flex items-center justify-center text-lg font-semibold text-blue-500 shadow-sm active:scale-95 transition-transform"
                                onClick={() => updateQuantity(item.productId, 1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="text-base font-semibold text-green-500">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EmptyState = ({ icon, title, subtitle }) => (
        <div className="text-center py-16">
            <div className="text-8xl mb-4 opacity-30">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-400">
                {title}
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
                {subtitle}
            </p>
        </div>
    );

    return (
        <div className={`${isDark ? 'dark' : ''} font-sans select-none`}>
            <div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen max-w-sm mx-auto relative overflow-hidden">

                {/* Main Content */}
                <main className="pb-20">
                    {/* Products Screen */}
                    {activeTab === 'products' && (
                        <div className="p-4">
                            {/* Search Bar */}
                            <div className="sticky top-0 z-40 bg-gray-100 dark:bg-black py-1 mb-4">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-lg text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Filter Chips */}
                            <div className="mb-5">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 pb-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentFilter === category.id
                                                    ? 'bg-blue-500 text-white border border-blue-500'
                                                    : 'bg-white dark:bg-gray-800 text-blue-500 border border-gray-200 dark:border-gray-700'
                                                }`}
                                            onClick={() => setCurrentFilter(category.id)}
                                        >
                                            {category.emoji && `${category.emoji} `}{category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-5">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <EmptyState
                                    icon="🔍"
                                    title="No products found"
                                    subtitle="Try adjusting your search or filters"
                                />
                            )}
                        </div>
                    )}

                    {/* Cart Screen */}
                    {activeTab === 'cart' && (
                        <div className="p-4">
                            {cart.length === 0 ? (
                                <EmptyState
                                    icon="🛒"
                                    title="Your cart is empty"
                                    subtitle="Add some products to get started"
                                />
                            ) : (
                                <>
                                    <div className="mb-5">
                                        {cart.map(item => (
                                            <CartItem key={item.productId} item={item} />
                                        ))}
                                    </div>

                                    {/* Cart Summary */}
                                    <div className="mt-5 p-5 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-xl">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                            Order Summary
                                        </h3>
                                        <div className="flex justify-between mb-2 text-base text-gray-900 dark:text-white">
                                            <span>Subtotal:</span>
                                            <span>${cartTotals.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mb-2 text-base text-gray-900 dark:text-white">
                                            <span>Tax (8%):</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 font-semibold text-lg text-gray-900 dark:text-white">
                                            <span>Total:</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <button className="w-full mt-4 px-4 py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl text-base font-semibold transition-colors">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* History Screen */}
                    {activeTab === 'history' && (
                        <div className="p-4">
                            <EmptyState
                                icon="📋"
                                title="No purchase history"
                                subtitle="Your completed orders will appear here"
                            />
                        </div>
                    )}
                </main>

                {/* Bottom Tab Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700 flex z-50">
                    {[
                        { id: 'products', label: 'Products', icon: '🛍️' },
                        { id: 'cart', label: 'Cart', icon: '🛒', badge: cartTotals.itemCount },
                        { id: 'history', label: 'History', icon: '📋' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`flex-1 flex flex-col items-center py-2 px-1 text-xs font-medium transition-colors active:scale-95 ${activeTab === tab.id
                                    ? 'text-blue-500'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <div className="relative text-2xl mb-0.5">
                                {tab.icon}
                                {tab.badge > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                        {tab.badge}
                                    </span>
                                )}
                            </div>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MercApp;