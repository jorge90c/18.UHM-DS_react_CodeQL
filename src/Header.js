import React from 'react';

const Header = ({ cartVisible, setCartVisible, totalItems, handleAdminLogin }) => {
    return (
        <header className="navbar navbar-expand-lg navbar-dark main-header shadow-sm">
            <div className="container-fluid px-4">
                <span className="navbar-brand fw-semibold">LIBRERIA - JORGE CACERES</span>
                <div className="ms-auto d-flex align-items-center gap-3">
                    <button
                        onClick={() => setCartVisible(!cartVisible)}
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                    >
                        <i className="bi bi-cart3 fs-5"></i>
                        <span className="d-none d-sm-inline">Carrito</span>
                        <span className="badge bg-warning text-dark ms-1">{totalItems}</span>
                    </button>
                    <button
                        onClick={handleAdminLogin}
                        className="btn btn-warning btn-sm d-flex align-items-center gap-2"
                    >
                        <i className="bi bi-gear-fill fs-5"></i>
                        <span className="d-none d-sm-inline">Administración</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
