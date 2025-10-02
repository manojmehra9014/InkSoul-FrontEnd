import React from 'react';
import { ChromePicker } from 'react-color';

const DesignToolbar = ({
  onAddText,
  onAddImage,
  onAddShape,
  onDeleteSelected,
  onBringToFront,
  onSendToBack,
  onClearCanvas,
  activeObject,
  onUpdateObject,
}) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState('#000000');
  const [showImageUpload, setShowImageUpload] = React.useState(false);

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Verdana',
    'Impact',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
  ];

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
    if (activeObject) {
      onUpdateObject('fill', color.hex);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAddImage(e.target.result);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="design-toolbar bg-white rounded-lg shadow-lg p-4 space-y-4">
      {/* Main Tools */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddText()}
            className="flex items-center justify-center gap-2 p-3 bg-ink-50 hover:bg-ink-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-sm font-medium">Add Text</span>
          </button>

          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex items-center justify-center gap-2 p-3 bg-ink-50 hover:bg-ink-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Add Image</span>
          </button>
        </div>

        {showImageUpload && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ink-600 file:text-white hover:file:bg-ink-700"
            />
          </div>
        )}
      </div>

      {/* Shapes */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Shapes</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onAddShape('rectangle')}
            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            title="Rectangle"
          >
            <div className="w-full h-8 bg-blue-500 rounded"></div>
          </button>
          <button
            onClick={() => onAddShape('circle')}
            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            title="Circle"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto"></div>
          </button>
          <button
            onClick={() => onAddShape('triangle')}
            className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            title="Triangle"
          >
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-blue-500 mx-auto"></div>
          </button>
        </div>
      </div>

      {/* Object Properties */}
      {activeObject && (
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase">Properties</h3>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: activeObject.fill || currentColor }}
              ></div>
              <span className="text-sm">{activeObject.fill || currentColor}</span>
            </button>
            {showColorPicker && (
              <div className="mt-2">
                <ChromePicker
                  color={activeObject.fill || currentColor}
                  onChange={handleColorChange}
                  disableAlpha={false}
                />
              </div>
            )}
          </div>

          {/* Font Family (for text) */}
          {activeObject.type === 'i-text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
              <select
                value={activeObject.fontFamily || 'Arial'}
                onChange={(e) => onUpdateObject('fontFamily', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-ink-500 focus:outline-none"
              >
                {fonts.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Font Size (for text) */}
          {activeObject.type === 'i-text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size: {activeObject.fontSize || 40}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={activeObject.fontSize || 40}
                onChange={(e) => onUpdateObject('fontSize', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Text Alignment (for text) */}
          {activeObject.type === 'i-text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateObject('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold')}
                  className={`p-2 rounded ${activeObject.fontWeight === 'bold' ? 'bg-ink-600 text-white' : 'bg-gray-200'}`}
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => onUpdateObject('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic')}
                  className={`p-2 rounded ${activeObject.fontStyle === 'italic' ? 'bg-ink-600 text-white' : 'bg-gray-200'}`}
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => onUpdateObject('underline', !activeObject.underline)}
                  className={`p-2 rounded ${activeObject.underline ? 'bg-ink-600 text-white' : 'bg-gray-200'}`}
                >
                  <u>U</u>
                </button>
              </div>
            </div>
          )}

          {/* Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opacity: {Math.round((activeObject.opacity || 1) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={activeObject.opacity || 1}
              onChange={(e) => onUpdateObject('opacity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Layer Controls */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Layer</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onBringToFront}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Bring to Front
              </button>
              <button
                onClick={onSendToBack}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                Send to Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-3 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onDeleteSelected}
            disabled={!activeObject}
            className="flex items-center justify-center gap-2 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-sm">Delete</span>
          </button>
          <button
            onClick={onClearCanvas}
            className="flex items-center justify-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm">Clear All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignToolbar;
