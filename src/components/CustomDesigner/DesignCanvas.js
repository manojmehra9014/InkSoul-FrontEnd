import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, Rect, Line, IText, Circle, Triangle, FabricImage } from 'fabric';

const DesignCanvas = forwardRef(({
  onDesignChange,
  onSelectionChange,
  initialDesign = null,
  productColor = '#ffffff',
  canvasSize = { width: 500, height: 600 }
}, ref) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [activeObject, setActiveObject] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric canvas
    const canvas = new Canvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: productColor,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = canvas;

    // Add grid for better alignment
    const gridSize = 40;
    for (let i = 0; i <= (canvasSize.width / gridSize); i++) {
      const vLine = new Line([i * gridSize, 0, i * gridSize, canvasSize.height], {
        stroke: '#e5e7eb',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        opacity: 0.5,
      });
      canvas.add(vLine);
    }

    for (let i = 0; i <= (canvasSize.height / gridSize); i++) {
      const hLine = new Line([0, i * gridSize, canvasSize.width, i * gridSize], {
        stroke: '#e5e7eb',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        opacity: 0.5,
      });
      canvas.add(hLine);
    }

    // Add print area rectangle
    const printArea = new Rect({
      left: 100,
      top: 150,
      width: 300,
      height: 300,
      fill: 'transparent',
      stroke: '#4F46E5',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      opacity: 0.6,
    });
    canvas.add(printArea);

    // Load initial design if provided
    if (initialDesign) {
      canvas.loadFromJSON(initialDesign).then(() => {
        canvas.renderAll();
      });
    }

    // Track selection changes
    canvas.on('selection:created', (e) => {
      const obj = e.selected?.[0] || null;
      setActiveObject(obj);
      if (onSelectionChange) {
        onSelectionChange(obj);
      }
    });

    canvas.on('selection:updated', (e) => {
      const obj = e.selected?.[0] || null;
      setActiveObject(obj);
      if (onSelectionChange) {
        onSelectionChange(obj);
      }
    });

    canvas.on('selection:cleared', () => {
      setActiveObject(null);
      if (onSelectionChange) {
        onSelectionChange(null);
      }
    });

    // Cleanup
    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [canvasSize.width, canvasSize.height, productColor, initialDesign]);

  // Update background color when productColor changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.backgroundColor = productColor;
      fabricCanvasRef.current.renderAll();
    }
  }, [productColor]);

  // Save history function
  const saveHistory = () => {
    if (!fabricCanvasRef.current) return;

    const json = fabricCanvasRef.current.toJSON();
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(json);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);

    if (onDesignChange) {
      onDesignChange(json);
    }
  };

  // Add text to canvas
  const addText = (text = 'Your Text Here') => {
    if (!fabricCanvasRef.current) return;

    const fabricText = new IText(text, {
      left: 200,
      top: 300,
      fontSize: 40,
      fontFamily: 'Arial',
      fill: '#000000',
      fontWeight: 'bold',
    });

    fabricCanvasRef.current.add(fabricText);
    fabricCanvasRef.current.setActiveObject(fabricText);
    fabricCanvasRef.current.renderAll();
    saveHistory();
  };

  // Add image to canvas
  const addImage = (imageUrl) => {
    if (!fabricCanvasRef.current) return;

    FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' })
      .then((img) => {
        img.scale(0.5);
        img.set({
          left: 200,
          top: 250,
        });
        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.setActiveObject(img);
        fabricCanvasRef.current.renderAll();
        saveHistory();
      })
      .catch((error) => {
        console.error('Error loading image:', error);
        alert('Failed to load image. Please try again.');
      });
  };

  // Add shape to canvas
  const addShape = (shapeType) => {
    if (!fabricCanvasRef.current) return;

    let shape;
    switch (shapeType) {
      case 'rectangle':
        shape = new Rect({
          left: 200,
          top: 250,
          width: 100,
          height: 100,
          fill: '#3B82F6',
        });
        break;
      case 'circle':
        shape = new Circle({
          left: 200,
          top: 250,
          radius: 50,
          fill: '#3B82F6',
        });
        break;
      case 'triangle':
        shape = new Triangle({
          left: 200,
          top: 250,
          width: 100,
          height: 100,
          fill: '#3B82F6',
        });
        break;
      default:
        return;
    }

    fabricCanvasRef.current.add(shape);
    fabricCanvasRef.current.setActiveObject(shape);
    fabricCanvasRef.current.renderAll();
    saveHistory();
  };

  // Delete selected object
  const deleteSelected = () => {
    if (!fabricCanvasRef.current) return;

    const activeObj = fabricCanvasRef.current.getActiveObject();
    if (activeObj) {
      fabricCanvasRef.current.remove(activeObj);
      fabricCanvasRef.current.renderAll();
      saveHistory();
    }
  };

  // Update active object property
  const updateActiveObject = (property, value) => {
    if (!fabricCanvasRef.current) return;

    const activeObj = fabricCanvasRef.current.getActiveObject();
    if (activeObj) {
      activeObj.set(property, value);
      fabricCanvasRef.current.renderAll();
      saveHistory();
    }
  };

  // Bring object to front
  const bringToFront = () => {
    if (!fabricCanvasRef.current) return;

    const activeObj = fabricCanvasRef.current.getActiveObject();
    if (activeObj) {
      fabricCanvasRef.current.bringObjectToFront(activeObj);
      fabricCanvasRef.current.renderAll();
    }
  };

  // Send object to back
  const sendToBack = () => {
    if (!fabricCanvasRef.current) return;

    const activeObj = fabricCanvasRef.current.getActiveObject();
    if (activeObj) {
      fabricCanvasRef.current.sendObjectToBack(activeObj);
      fabricCanvasRef.current.renderAll();
    }
  };

  // Clear entire canvas
  const clearCanvas = () => {
    if (!fabricCanvasRef.current) return;

    fabricCanvasRef.current.clear();
    fabricCanvasRef.current.backgroundColor = productColor;
    fabricCanvasRef.current.renderAll();
    setHistory([]);
    setHistoryStep(0);
  };

  // Export design in multiple formats
  const exportDesign = () => {
    if (!fabricCanvasRef.current) {
      return {
        json: {},
        svg: '',
        dataUrl: '',
      };
    }

    return {
      json: fabricCanvasRef.current.toJSON(),
      svg: fabricCanvasRef.current.toSVG(),
      dataUrl: fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
      }),
    };
  };

  // Undo last action
  const undo = () => {
    if (historyStep > 0 && fabricCanvasRef.current) {
      const step = historyStep - 1;
      setHistoryStep(step);
      fabricCanvasRef.current.loadFromJSON(history[step]).then(() => {
        fabricCanvasRef.current.renderAll();
      });
    }
  };

  // Redo last undone action
  const redo = () => {
    if (historyStep < history.length - 1 && fabricCanvasRef.current) {
      const step = historyStep + 1;
      setHistoryStep(step);
      fabricCanvasRef.current.loadFromJSON(history[step]).then(() => {
        fabricCanvasRef.current.renderAll();
      });
    }
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    addText,
    addImage,
    addShape,
    deleteSelected,
    updateActiveObject,
    bringToFront,
    sendToBack,
    clearCanvas,
    exportDesign,
    undo,
    redo,
    getActiveObject: () => activeObject,
  }));

  return (
    <div className="design-canvas-container relative">
      <canvas ref={canvasRef} className="border-2 border-gray-300 rounded-lg shadow-lg" />

      {/* Undo/Redo buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={undo}
          disabled={historyStep <= 0}
          className="bg-white p-2 rounded-lg shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Undo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          className="bg-white p-2 rounded-lg shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Redo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>

      {/* Active object indicator */}
      {activeObject && (
        <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-lg shadow text-sm">
          <span className="font-semibold">Selected:</span> {activeObject.type}
        </div>
      )}
    </div>
  );
});

DesignCanvas.displayName = 'DesignCanvas';

export default DesignCanvas;
