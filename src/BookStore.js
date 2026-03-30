import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './BookStore.css';
import { useBookStore } from './useBookStore';
import Header from './Header';
import ProductCatalog from './ProductCatalog';
import Cart from './Cart';
import AdminPanel from './AdminPanel';
import AdminLoginModal from './AdminLoginModal';

function BookStore() {
  const {
    categories,
    expandedCategories,
    cart,
    cartVisible,
    adminVisible,
    adminLoginVisible,
    adminLoginUser,
    adminLoginPassword,
    newCategory,
    newProduct,
    checkoutMessage,
    adminActiveTab,
    productSuccessMsg,
    totalItems,
    cartTotal,
    setCartVisible,
    setAdminVisible,
    setAdminLoginUser,
    setAdminLoginPassword,
    setNewCategory,
    setNewProduct,
    setNewProductImageFile,
    setAdminActiveTab,
    toggleCategory,
    addToCart,
    removeFromCart,
    handleAddCategory,
    handleAddProduct,
    handleCheckout,
    handleAdminLogin,
    handleAdminLoginSubmit,
    handleAdminLoginCancel
  } = useBookStore();

  return (
    <div className="BookStore">
      <Header
        cartVisible={cartVisible}
        setCartVisible={setCartVisible}
        totalItems={totalItems}
        handleAdminLogin={handleAdminLogin}
      />

      <main className="container-fluid py-4">
        <div className="row g-4">
          <ProductCatalog
            categories={categories}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            addToCart={addToCart}
          />

          <Cart
            cart={cart}
            cartVisible={cartVisible}
            setCartVisible={setCartVisible}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
            checkoutMessage={checkoutMessage}
          />
        </div>
      </main>

      <AdminPanel
        adminVisible={adminVisible}
        setAdminVisible={setAdminVisible}
        adminActiveTab={adminActiveTab}
        setAdminActiveTab={setAdminActiveTab}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={categories}
        setNewProductImageFile={setNewProductImageFile}
        handleAddProduct={handleAddProduct}
        productSuccessMsg={productSuccessMsg}
      />

      <AdminLoginModal
        adminLoginVisible={adminLoginVisible}
        handleAdminLoginCancel={handleAdminLoginCancel}
        adminLoginUser={adminLoginUser}
        setAdminLoginUser={setAdminLoginUser}
        adminLoginPassword={adminLoginPassword}
        setAdminLoginPassword={setAdminLoginPassword}
        handleAdminLoginSubmit={handleAdminLoginSubmit}
      />
    </div>
  );
}

export default BookStore;
