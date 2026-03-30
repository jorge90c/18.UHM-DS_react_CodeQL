import React from 'react';

const ProductCatalog = ({ categories, expandedCategories, toggleCategory, addToCart }) => {
    return (
        <section className="col-lg-8">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex align-items-center">
                    <div>
                        <h2 className="h5 mb-0">Catálogo de libros</h2>
                        <small className="text-muted">Haz clic en el nombre del género para mostrar u ocultar sus libros.</small>
                    </div>
                </div>
                <div className="card-body" id="categoriesContainer">
                    {categories.map(category => (
                        <div key={category.id} className="mb-3 category-block">
                            <button
                                className="category-header w-100 border-0 bg-transparent p-0 text-start"
                                onClick={() => toggleCategory(category.id)}
                                aria-expanded={expandedCategories[category.id]}
                            >
                                <span className="category-title">{category.name}</span>
                                <i className={`bi ${expandedCategories[category.id] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                            </button>
                            {expandedCategories[category.id] && (
                                <div className="category-products">
                                    {category.products.map(product => {
                                        const outOfStock = product.stock <= 0;
                                        const lowStock = product.stock > 0 && product.stock <= 3;
                                        return (
                                            <div
                                                key={product.id}
                                                className={`product-row ${outOfStock ? 'product-out-of-stock' : ''}`}
                                            >
                                                <div className="product-thumbnail-wrapper">
                                                    <img
                                                        src={product.image.startsWith('blob:') || product.image.startsWith('http') ? product.image : `${process.env.PUBLIC_URL}/${product.image}`}
                                                        alt={product.description}
                                                        className="product-thumbnail"
                                                    />
                                                </div>
                                                <div className="product-info">
                                                    <div className="product-code">CÓDIGO: {product.id}</div>
                                                    <div className="product-description">{product.title}</div>
                                                    <div className="product-meta">
                                                        <span className="text-price">{product.price.toFixed(2)} €</span>
                                                        <span className={lowStock ? 'product-stock-low ms-2' : 'ms-2'}>
                                                            Stock: {product.stock} uds.
                                                        </span>
                                                        <span className="ms-2">Año: {product.year}</span>
                                                    </div>
                                                </div>
                                                <div className="product-actions">
                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        disabled={outOfStock}
                                                        className="btn btn-outline-primary btn-sm btn-add-to-cart"
                                                    >
                                                        {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCatalog;
