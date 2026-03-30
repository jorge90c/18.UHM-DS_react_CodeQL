import React from 'react';

const AdminLoginModal = ({
    adminLoginVisible,
    handleAdminLoginCancel,
    adminLoginUser,
    setAdminLoginUser,
    adminLoginPassword,
    setAdminLoginPassword,
    handleAdminLoginSubmit
}) => {
    if (!adminLoginVisible) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1040 }}></div>
            <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-xl bg-white" style={{ border: '1px solid #e0e0e0', boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.4)' }}>
                        <div className="modal-header border-0 bg-white">
                            <h5 className="modal-title fw-bold text-dark">Acceso administrador</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleAdminLoginCancel}
                            ></button>
                        </div>
                        <div className="modal-body px-4" style={{ backgroundColor: '#ffffff' }}>
                            <p className="text-secondary mb-3 fw-semibold">Introduce usuario y contraseña para entrar en modo administrador.</p>
                            <div className="mb-3">
                                <label htmlFor="adminUser" className="form-label fw-semibold text-dark">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="adminUser"
                                    placeholder="admin"
                                    value={adminLoginUser}
                                    onChange={(e) => setAdminLoginUser(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLoginSubmit()}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="adminPassword" className="form-label fw-semibold text-dark">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="adminPassword"
                                    placeholder="••••••"
                                    value={adminLoginPassword}
                                    onChange={(e) => setAdminLoginPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLoginSubmit()}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-0 bg-white" style={{ backgroundColor: '#ffffff' }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleAdminLoginCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAdminLoginSubmit}
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLoginModal;
