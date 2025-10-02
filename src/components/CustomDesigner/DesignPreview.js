import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const DesignPreview = ({ designDataUrl, productType = 'tshirt', productColor = '#ffffff' }) => {
  const previewRef = useRef(null);
  const [mockupUrl, setMockupUrl] = useState(null);
  const [viewAngle, setViewAngle] = useState('front');

  // Product mockup templates
  const mockupTemplates = {
    tshirt: {
      front: '/images/mockups/tshirt-front.png',
      back: '/images/mockups/tshirt-back.png',
      side: '/images/mockups/tshirt-side.png',
    },
    hoodie: {
      front: '/images/mockups/hoodie-front.png',
      back: '/images/mockups/hoodie-back.png',
    },
    mug: {
      front: '/images/mockups/mug-front.png',
    },
  };

  const designPositions = {
    tshirt: {
      front: { top: '30%', left: '50%', transform: 'translate(-50%, 0)', width: '35%' },
      back: { top: '25%', left: '50%', transform: 'translate(-50%, 0)', width: '40%' },
      side: { top: '35%', left: '60%', transform: 'translate(-50%, 0)', width: '20%' },
    },
    hoodie: {
      front: { top: '35%', left: '50%', transform: 'translate(-50%, 0)', width: '30%' },
      back: { top: '30%', left: '50%', transform: 'translate(-50%, 0)', width: '35%' },
    },
    mug: {
      front: { top: '25%', left: '50%', transform: 'translate(-50%, 0)', width: '50%' },
    },
  };

  const generateMockup = async () => {
    if (!previewRef.current || !designDataUrl) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      setMockupUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error generating mockup:', error);
    }
  };

  useEffect(() => {
    if (designDataUrl) {
      generateMockup();
    }
  }, [designDataUrl, viewAngle, productType]);

  const downloadMockup = () => {
    if (mockupUrl) {
      const link = document.createElement('a');
      link.download = `mockup-${productType}-${viewAngle}.png`;
      link.href = mockupUrl;
      link.click();
    }
  };

  const position = designPositions[productType]?.[viewAngle] || designPositions.tshirt.front;

  return (
    <div className="design-preview space-y-4">
      {/* View Angle Selector */}
      <div className="flex gap-2 justify-center">
        {Object.keys(mockupTemplates[productType] || {}).map((angle) => (
          <button
            key={angle}
            onClick={() => setViewAngle(angle)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              viewAngle === angle
                ? 'bg-ink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {angle}
          </button>
        ))}
      </div>

      {/* 3D Mockup Preview */}
      <div
        ref={previewRef}
        className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-xl"
        style={{ backgroundColor: productColor }}
      >
        {/* Product Image Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Placeholder for product mockup image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="w-48 h-48 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  {productType.charAt(0).toUpperCase() + productType.slice(1)} Mockup
                </p>
                <p className="text-sm text-gray-400 mt-1">{viewAngle} view</p>
              </div>
            </div>

            {/* Design Overlay */}
            {designDataUrl && (
              <div
                className="absolute"
                style={{
                  ...position,
                  zIndex: 10,
                }}
              >
                <img
                  src={designDataUrl}
                  alt="Design preview"
                  className="w-full h-auto opacity-90"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Realistic lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none"></div>
      </div>

      {/* Mockup Actions */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={generateMockup}
          className="px-4 py-2 bg-ink-600 text-white rounded-lg hover:bg-ink-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Preview
        </button>
        <button
          onClick={downloadMockup}
          disabled={!mockupUrl}
          className="px-4 py-2 bg-soul-600 text-white rounded-lg hover:bg-soul-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Mockup
        </button>
      </div>

      {/* Color Options */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Product Color</label>
        <div className="flex gap-2">
          {[
            { name: 'White', color: '#ffffff' },
            { name: 'Black', color: '#000000' },
            { name: 'Red', color: '#ef4444' },
            { name: 'Blue', color: '#3b82f6' },
            { name: 'Green', color: '#10b981' },
            { name: 'Yellow', color: '#fbbf24' },
            { name: 'Purple', color: '#8b5cf6' },
            { name: 'Pink', color: '#ec4899' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                // This would be passed to parent to update product color
                console.log('Change color to:', item.color);
              }}
              className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
              style={{ backgroundColor: item.color }}
              title={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignPreview;
