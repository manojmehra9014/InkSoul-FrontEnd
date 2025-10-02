import React from 'react';
import CloudinaryUpload from './CloudinaryUpload';

const ProductModal = ({ 
  show, 
  onClose, 
  title, 
  formData, 
  handleInputChange, 
  handleSubmit, 
  handleImageUpload, 
  selectedProduct,
  categories 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Code *
              </label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compare Price (₹)
              </label>
              <input
                type="number"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Images - Cloudinary Upload */}
          <CloudinaryUpload
            onImageUpload={handleImageUpload}
            existingImages={formData.images}
            maxImages={5}
            className="mb-6"
          />

          {/* Additional Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                placeholder="e.g., 100% Cotton"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Care Instructions
              </label>
              <input
                type="text"
                name="careInstructions"
                value={formData.careInstructions}
                onChange={handleInputChange}
                placeholder="e.g., Machine wash cold"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Colors
            </label>
            <div className="space-y-2">
              {formData.colors && formData.colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={color.name}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index].name = e.target.value;
                      handleInputChange({ target: { name: 'colors', value: newColors } });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="#000000"
                    value={color.hex}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index].hex = e.target.value;
                      handleInputChange({ target: { name: 'colors', value: newColors } });
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={color.stock}
                    onChange={(e) => {
                      const newColors = [...formData.colors];
                      newColors[index].stock = parseInt(e.target.value) || 0;
                      handleInputChange({ target: { name: 'colors', value: newColors } });
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newColors = formData.colors.filter((_, i) => i !== index);
                      handleInputChange({ target: { name: 'colors', value: newColors } });
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newColors = [...formData.colors, { name: '', hex: '', stock: 0 }];
                  handleInputChange({ target: { name: 'colors', value: newColors } });
                }}
                className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Add Color
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sizes
            </label>
            <div className="space-y-2">
              {formData.sizes && formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Size"
                    value={size.name}
                    onChange={(e) => {
                      const newSizes = [...formData.sizes];
                      newSizes[index].name = e.target.value;
                      handleInputChange({ target: { name: 'sizes', value: newSizes } });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={size.stock}
                    onChange={(e) => {
                      const newSizes = [...formData.sizes];
                      newSizes[index].stock = parseInt(e.target.value) || 0;
                      handleInputChange({ target: { name: 'sizes', value: newSizes } });
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSizes = formData.sizes.filter((_, i) => i !== index);
                      handleInputChange({ target: { name: 'sizes', value: newSizes } });
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newSizes = [...formData.sizes, { name: '', stock: 0 }];
                  handleInputChange({ target: { name: 'sizes', value: newSizes } });
                }}
                className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Add Size
              </button>
            </div>
          </div>

          {/* Featured Product */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-white">
              Featured Product
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-ink-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-ink-600 text-white rounded-lg hover:bg-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-500"
            >
              {selectedProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;