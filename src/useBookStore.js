import { useState, useEffect } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = '123456';

export const useBookStore = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(true);
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminLoginVisible, setAdminLoginVisible] = useState(false);
  const [adminLoginUser, setAdminLoginUser] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');
  const [newCategory, setNewCategory] = useState({ id: '', name: '' });
  const [newProduct, setNewProduct] = useState({
    id: '', categoryId: '', description: '', price: '', stock: '', image: ''
  });
  const [newProductImageFile, setNewProductImageFile] = useState(null);
  const [productSuccessMsg, setProductSuccessMsg] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('category');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/data/products.json`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        const expandedState = {};
        data.categories.forEach(cat => {
          expandedState[cat.id] = true;
        });
        setExpandedCategories(expandedState);
      })
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const findProductById = (productId) => {
    for (const category of categories) {
      const product = category.products.find(p => p.id === productId);
      if (product) return { category, product };
    }
    return null;
  };

  const getCartItem = (productId) => cart.find(item => item.productId === productId);

  const addToCart = (productId) => {
    const result = findProductById(productId);
    if (!result) return;
    const { product } = result;
    if (product.stock <= 0) return;

    const updatedCategories = categories.map(cat => ({
      ...cat,
      products: cat.products.map(prod => prod.id === productId ? { ...prod, stock: prod.stock - 1 } : prod)
    }));
    setCategories(updatedCategories);

    const existingItem = getCartItem(productId);
    if (existingItem) {
      setCart(cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { productId: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const result = findProductById(productId);
    if (!result) return;
    const cartItem = getCartItem(productId);
    if (!cartItem) return;

    const updatedCategories = categories.map(cat => ({
      ...cat,
      products: cat.products.map(prod => prod.id === productId ? { ...prod, stock: prod.stock + 1 } : prod)
    }));
    setCategories(updatedCategories);

    if (cartItem.quantity > 1) {
      setCart(cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.productId !== productId));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddCategory = () => {
    if (!newCategory.id || !newCategory.name) {
      alert('Debes completar el ID y el nombre de la categoría.');
      return;
    }
    const exists = categories.some(cat => cat.id.toLowerCase() === newCategory.id.toLowerCase());
    if (exists) {
      alert('Ya existe una categoría con ese ID. Debe ser único.');
      return;
    }
    setCategories([...categories, { id: newCategory.id, name: newCategory.name, products: [] }]);
    setNewCategory({ id: '', name: '' });
    alert('Categoría creada correctamente.');
  };

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.categoryId || !newProduct.description || !newProduct.price || !newProduct.stock) {
      alert('Debes completar todos los campos del producto.');
      return;
    }
    let productExists = false;
    categories.forEach(cat => {
      if (cat.products.some(p => p.id.toLowerCase() === newProduct.id.toLowerCase())) productExists = true;
    });
    if (productExists) {
      alert('Ya existe un producto con ese código. Debe ser único.');
      return;
    }
    const category = categories.find(c => c.id === newProduct.categoryId);
    if (!category) {
      alert('La categoría seleccionada no existe.');
      return;
    }

    let imagePath = newProduct.image || 'assets/data/img/default.jpeg';
    if (newProductImageFile) {
      imagePath = URL.createObjectURL(newProductImageFile);
    }

    const updatedCategories = categories.map(cat => cat.id === newProduct.categoryId ? {
      ...cat,
      products: [{
        id: newProduct.id, title: newProduct.description, description: newProduct.description,
        price: Number.parseFloat(newProduct.price), stock: Number.parseInt(newProduct.stock),
        year: new Date().getFullYear(), image: imagePath
      }, ...cat.products]
    } : cat);

    setCategories(updatedCategories);
    setNewProduct({ id: '', categoryId: '', description: '', price: '', stock: '', image: '' });
    setNewProductImageFile(null);
    const fileInput = document.getElementById('newProductImageFile');
    if (fileInput) fileInput.value = '';

    setProductSuccessMsg(`¡Producto ${newProduct.id} creado correctamente!`);
    setTimeout(() => setProductSuccessMsg(''), 5000);
    alert('Producto creado correctamente.');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    setCheckoutMessage(true);
    setCart([]);
    setTimeout(() => setCheckoutMessage(false), 4000);
  };

  const handleAdminLogin = () => {
    setAdminLoginVisible(true);
    setAdminLoginUser('');
    setAdminLoginPassword('');
  };

  const handleAdminLoginSubmit = () => {
    if (adminLoginUser !== ADMIN_USER || adminLoginPassword !== ADMIN_PASSWORD) {
      alert('Usuario o contraseña incorrectos.');
      return;
    }
    setAdminVisible(true);
    setAdminLoginVisible(false);
    setAdminLoginUser('');
    setAdminLoginPassword('');
  };

  const handleAdminLoginCancel = () => {
    setAdminLoginVisible(false);
    setAdminLoginUser('');
    setAdminLoginPassword('');
  };

  return {
    categories, expandedCategories, cart, cartVisible, adminVisible, adminLoginVisible,
    adminLoginUser, adminLoginPassword, newCategory, newProduct, newProductImageFile,
    checkoutMessage, adminActiveTab, totalItems, cartTotal, productSuccessMsg,
    setCartVisible, setAdminVisible, setAdminLoginUser, setAdminLoginPassword,
    setNewCategory, setNewProduct, setNewProductImageFile, setAdminActiveTab,
    toggleCategory, addToCart, removeFromCart, handleAddCategory, handleAddProduct,
    handleCheckout, handleAdminLogin, handleAdminLoginSubmit, handleAdminLoginCancel
  };
};
