import React, { useState, useRef } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';

const CloudinaryUpload = ({ 
  onImageUpload, 
  existingImages = [], 
  maxImages = 5,
  className = "" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(existingImages.filter(img => img.url));
  const fileInputRef = useRef(null);

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'
    }
  });

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset');
    formData.append('folder', 'inksoul-products');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
        alt: file.name.split('.')[0],
        isPrimary: uploadedImages.length === 0,
        colorCode: '' // Will be set by user
      };
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length + uploadedImages.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      
      const newImages = [...uploadedImages, ...uploadedFiles];
      setUploadedImages(newImages);
      onImageUpload(newImages);
    } catch (error) {
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    // If we removed the primary image, make the first remaining image primary
    if (newImages.length > 0 && uploadedImages[index].isPrimary) {
      newImages[0].isPrimary = true;
    }
    setUploadedImages(newImages);
    onImageUpload(newImages);
  };

  const setPrimaryImage = (index) => {
    const newImages = uploadedImages.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    setUploadedImages(newImages);
    onImageUpload(newImages);
  };

  const updateImageAlt = (index, alt) => {
    const newImages = uploadedImages.map((img, i) => 
      i === index ? { ...img, alt } : img
    );
    setUploadedImages(newImages);
    onImageUpload(newImages);
  };

  const updateImageColor = (index, colorCode) => {
    const newImages = uploadedImages.map((img, i) =>
      i === index ? { ...img, colorCode } : img
    );
    setUploadedImages(newImages);
    onImageUpload(newImages);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Product Images ({uploadedImages.length}/{maxImages})
        </label>
        
        {uploadedImages.length < maxImages && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-ink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Images
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                {process.env.REACT_APP_CLOUDINARY_CLOUD_NAME && image.publicId ? (
                  <AdvancedImage
                    cldImg={cld.image(image.publicId)
                      .resize(fill().width(300).height(300))
                      .delivery(quality('auto'))}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={image.url}
                    alt={image.alt || `Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Image Controls Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <div className="flex space-x-2">
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(index)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                      title="Set as primary image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Primary Image Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Primary
                </div>
              )}

              {/* Alt Text Input */}
              <div className="mt-2 space-y-1">
                <input
                  type="text"
                  placeholder="Alt text"
                  value={image.alt || ''}
                  onChange={(e) => updateImageAlt(index, e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Color code (e.g., #FF0000)"
                  value={image.colorCode || ''}
                  onChange={(e) => updateImageColor(index, e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Instructions */}
      {uploadedImages.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-2">No images uploaded yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Click "Add Images" to upload product photos
          </p>
        </div>
      )}

      {/* Upload Tips */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>• Recommended image size: 800x800px or larger</p>
        <p>• Supported formats: JPG, PNG, WebP</p>
        <p>• Maximum file size: 10MB per image</p>
        <p>• First image will be set as primary by default</p>
      </div>
    </div>
  );
};

export default CloudinaryUpload;