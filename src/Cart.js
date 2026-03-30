import React from 'react';

const Cart = ({ cart, cartVisible, setCartVisible, cartTotal, removeFromCart, handleCheckout, checkoutMessage }) => {
    return (
        <aside className="col-lg-4">
            <div className={`card shadow-sm border-0 cart-panel ${cartVisible ? '' : 'cart-hidden'}`}>
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span className="h6 mb-0">Carrito de la compra</span>
                    <button
                        onClick={() => setCartVisible(false)}
                        className="btn btn-sm btn-outline-light"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="card-body cart-body">
                    <div id="cartItemsContainer" className="small">
                        {cart.length === 0 ? (
                            <p className="text-muted mb-0">Tu carrito está vacío. Añade libros desde el catálogo.</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.productId} className="cart-item d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src={item.image.startsWith('blob:') || item.image.startsWith('http') ? item.image : `${process.env.PUBLIC_URL}/${item.image}`}
                                            alt={item.description}
                                            className="cart-item-img"
                                        />
                                        <div>
                                            <div className="cart-item-title">{item.title}</div>
                                            <div className="cart-item-code">Código: {item.productId}</div>
                                            <div className="cart-item-qty text-muted">
                                                Unidades: <strong>{item.quantity}</strong> · Unitario: {item.price.toFixed(2)} € ·
                                                Total: <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="btn btn-outline-danger btn-xs btn-remove-from-cart"
                                    >
                                        Eliminar del carrito
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold">Total:</span>
                        <span id="cartTotal" className="fw-bold text-primary">{cartTotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="btn btn-success w-100"
                    >
                        Realizar Pedido
                    </button>
                    {checkoutMessage && (
                        <div className="alert alert-success py-1 px-2 mt-2 small d-block">
                            ¡Pedido realizado correctamente! Gracias por tu compra.
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Cart;
