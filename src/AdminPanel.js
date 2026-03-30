import React from 'react';

const AdminPanel = ({
    adminVisible,
    setAdminVisible,
    adminActiveTab,
    setAdminActiveTab,
    newCategory,
    setNewCategory,
    handleAddCategory,
    newProduct,
    setNewProduct,
    categories,
    setNewProductImageFile,
    handleAddProduct,
    productSuccessMsg
}) => {
    if (!adminVisible) return null;

    return (
        <section className="admin-panel border-top bg-white shadow-lg admin-visible">
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 mb-0">Panel de administración</h2>
                    <button
                        onClick={() => setAdminVisible(false)}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        Cerrar administración
                    </button>
                </div>

                <ul className="nav nav-pills mb-3" id="adminTabs">
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${adminActiveTab === 'category' ? 'active' : ''}`}
                            onClick={() => setAdminActiveTab('category')}
                        >
                            Crear categoría
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${adminActiveTab === 'product' ? 'active' : ''}`}
                            onClick={() => setAdminActiveTab('product')}
                        >
                            Crear producto
                        </button>
                    </li>
                </ul>

                <div className="row g-4">
                    {adminActiveTab === 'category' && (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="h6 mb-3">Nueva categoría</h3>
                                    <div className="mb-3">
                                        <label htmlFor="newCategoryId" className="form-label">ID de categoría</label>
                                        <input
                                            type="text"
                                            id="newCategoryId"
                                            className="form-control"
                                            placeholder="ej: Aventura"
                                            value={newCategory.id}
                                            onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newCategoryName" className="form-label">Nombre visible</label>
                                        <input
                                            type="text"
                                            id="newCategoryName"
                                            className="form-control"
                                            placeholder="ej: Aventura y Sueños"
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddCategory}
                                        className="btn btn-primary w-100"
                                        type="button"
                                    >
                                        Añadir categoría
                                    </button>
                                    <div id="categoryAdminMessage" className="small mt-2 text-muted"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {adminActiveTab === 'product' && (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="h6 mb-3">Nuevo producto</h3>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="newProductId" className="form-label">Código de producto</label>
                                            <input
                                                type="text"
                                                id="newProductId"
                                                className="form-control"
                                                placeholder="ej: CURS-FE-01"
                                                value={newProduct.id}
                                                onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newProductCategory" className="form-label">Categoría</label>
                                            <select
                                                id="newProductCategory"
                                                className="form-select"
                                                value={newProduct.categoryId}
                                                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                                            >
                                                <option value="">Seleccionar categoría</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="newProductDescription" className="form-label">Descripción</label>
                                            <input
                                                type="text"
                                                id="newProductDescription"
                                                className="form-control"
                                                placeholder="ej: Descripción de libro"
                                                value={newProduct.description}
                                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newProductPrice" className="form-label">Precio (€)</label>
                                            <input
                                                type="number"
                                                id="newProductPrice"
                                                className="form-control"
                                                placeholder="99.00"
                                                step="0.01"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newProductStock" className="form-label">Stock inicial</label>
                                            <input
                                                type="number"
                                                id="newProductStock"
                                                className="form-control"
                                                placeholder="10"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newProductImageUrl" className="form-label">URL de imagen (opcional)</label>
                                            <input
                                                type="text"
                                                id="newProductImageUrl"
                                                className="form-control"
                                                placeholder="https://ejemplo.com/curso.png"
                                                value={newProduct.image}
                                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                            />
                                            <small className="text-muted d-block mt-1">Si indicas una URL no es necesario seleccionar archivo.</small>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newProductImageFile" className="form-label">Imagen (opcional)</label>
                                            <input
                                                type="file"
                                                id="newProductImageFile"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setNewProductImageFile(e.target.files[0])}
                                            />
                                            <small className="text-muted d-block mt-1">Se usará una imagen de prueba si no se selecciona.</small>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                onClick={handleAddProduct}
                                                className="btn btn-success w-100 mt-3"
                                                type="button"
                                            >
                                                Añadir producto
                                            </button>
                                        </div>
                                    </div>

                                    <div id="productAdminMessage" className="small mt-3">
                                        {productSuccessMsg && (
                                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                                                <div>
                                                    {productSuccessMsg}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;
