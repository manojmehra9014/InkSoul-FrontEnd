import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import DesignCanvas from '../components/CustomDesigner/DesignCanvas';
import DesignToolbar from '../components/CustomDesigner/DesignToolbar';
import DesignPreview from '../components/CustomDesigner/DesignPreview';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const CustomDesign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const canvasRef = useRef(null);
  const [designData, setDesignData] = useState(null);
  const [designPreview, setDesignPreview] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [productType, setProductType] = useState('tshirt');
  const [productColor, setProductColor] = useState('#ffffff');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Product options
  const products = [
    { id: 'tshirt', name: 'T-Shirt', basePrice: 29.99 },
    { id: 'hoodie', name: 'Hoodie', basePrice: 49.99 },
    { id: 'tank', name: 'Tank Top', basePrice: 24.99 },
    { id: 'longsleeve', name: 'Long Sleeve', basePrice: 34.99 },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const colors = [
    { name: 'White', hex: '#ffffff', price: 0 },
    { name: 'Black', hex: '#000000', price: 0 },
    { name: 'Red', hex: '#ef4444', price: 2 },
    { name: 'Blue', hex: '#3b82f6', price: 2 },
    { name: 'Green', hex: '#10b981', price: 2 },
    { name: 'Yellow', hex: '#fbbf24', price: 2 },
    { name: 'Purple', hex: '#8b5cf6', price: 2 },
    { name: 'Pink', hex: '#ec4899', price: 2 },
  ];

  const selectedProduct = products.find((p) => p.id === productType);
  const selectedColorObj = colors.find((c) => c.hex === productColor);
  const totalPrice = (selectedProduct.basePrice + (selectedColorObj?.price || 0)) * quantity;

  const handleDesignChange = (json) => {
    setDesignData(json);
  };

  const generatePreview = () => {
    if (canvasRef.current) {
      const exported = canvasRef.current.exportDesign();
      setDesignPreview(exported.dataUrl);
      setShowPreview(true);
    }
  };

  const handleSaveDesign = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setSaving(true);
    try {
      const exported = canvasRef.current?.exportDesign();
      if (!exported) {
        alert('Please create a design first');
        return;
      }

      // Save design to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/designs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          designData: exported.json,
          thumbnail: exported.dataUrl,
          productType,
          productColor,
          size: selectedSize,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Design saved successfully!');
        console.log('Saved design:', data);
      } else {
        alert('Failed to save design');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Error saving design');
    } finally {
      setSaving(false);
    }
  };

  const handleAddToCart = () => {
    if (!designData) {
      alert('Please create a design first');
      return;
    }

    const exported = canvasRef.current?.exportDesign();

    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedProduct.name}`,
      price: totalPrice / quantity,
      quantity,
      size: selectedSize,
      color: selectedColorObj.name,
      image: exported?.dataUrl || '/placeholder.png',
      customDesign: true,
      designData: exported?.json,
    });

    alert('Custom design added to cart!');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Custom Design Studio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create your unique design and bring your ideas to life
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Toolbar */}
          <div className="lg:col-span-3">
            <DesignToolbar
              onAddText={() => canvasRef.current?.addText()}
              onAddImage={(url) => canvasRef.current?.addImage(url)}
              onAddShape={(shape) => canvasRef.current?.addShape(shape)}
              onDeleteSelected={() => canvasRef.current?.deleteSelected()}
              onBringToFront={() => canvasRef.current?.bringToFront()}
              onSendToBack={() => canvasRef.current?.sendToBack()}
              onClearCanvas={() => {
                if (window.confirm('Are you sure you want to clear the canvas?')) {
                  canvasRef.current?.clearCanvas();
                }
              }}
              activeObject={activeObject}
              onUpdateObject={(prop, value) => canvasRef.current?.updateActiveObject(prop, value)}
            />
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Design Canvas
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 bg-soul-600 text-white rounded-lg hover:bg-soul-700 transition-colors"
                  >
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <DesignCanvas
                  ref={canvasRef}
                  onDesignChange={handleDesignChange}
                  onSelectionChange={setActiveObject}
                  productColor={productColor}
                />
              </div>

              {/* Quick Tips */}
              <div className="mt-4 p-4 bg-ink-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Click and drag elements to move them</li>
                  <li>• Use the handles to resize and rotate</li>
                  <li>• Double-click text to edit</li>
                  <li>• Design within the dashed rectangle for best results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Product Options & Preview */}
          <div className="lg:col-span-3 space-y-6">
            {/* Product Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Product Options
              </h3>

              {/* Product Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Type
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-ink-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.basePrice}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-ink-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setProductColor(color.hex)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        productColor === color.hex
                          ? 'border-ink-600 ring-2 ring-ink-300'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name}${color.price > 0 ? ` (+$${color.price})` : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-ink-600 dark:text-ink-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!designData}
                    className="w-full btn-primary py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleSaveDesign}
                    disabled={!designData || saving}
                    className="w-full btn-secondary py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Design'}
                  </button>
                  <button
                    onClick={generatePreview}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Generate Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && designPreview && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Mockup Preview
                </h3>
                <DesignPreview
                  designDataUrl={designPreview}
                  productType={productType}
                  productColor={productColor}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {saving && <LoadingSpinner />}
    </div>
  );
};

export default CustomDesign;
