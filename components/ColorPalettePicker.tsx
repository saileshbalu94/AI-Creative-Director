import React, { useState, useRef, useEffect, useCallback } from 'react';
import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../utils/colorUtils';

interface ColorPalettePickerProps {
  label: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPalettePicker: React.FC<ColorPalettePickerProps> = ({ label, selectedColor, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selectedColor);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onColorChange(value);
    }
  };

  const handleInputBlur = () => {
    if (!/^#[0-9A-F]{6}$/i.test(inputValue)) {
      setInputValue(selectedColor);
    }
  };
  
  return (
    <div className="relative" ref={pickerRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-md border border-gray-300"
          style={{ backgroundColor: selectedColor }}
          aria-label={`Select color, current color is ${selectedColor}`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-24 border border-gray-300 rounded-lg shadow-sm py-1 px-2 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm"
        />
      </div>
      {isOpen && (
        <ColorPickerPanel
          color={selectedColor}
          onChange={onColorChange}
        />
      )}
    </div>
  );
};


const ColorPickerPanel: React.FC<{ color: string, onChange: (color: string) => void }> = ({ color, onChange }) => {
    const { h, s, v } = rgbToHsv(hexToRgb(color));
    const [hue, setHue] = useState(h);
    const [saturation, setSaturation] = useState(s);
    const [value, setValue] = useState(v);

    const spectrumRef = useRef<HTMLDivElement>(null);
    const hueSliderRef = useRef<HTMLDivElement>(null);

    const handleSpectrumMouseDown = (e: React.MouseEvent) => {
        handleSpectrumMouseMove(e);
        window.addEventListener('mousemove', handleSpectrumMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const handleHueMouseDown = (e: React.MouseEvent) => {
        handleHueMouseMove(e);
        window.addEventListener('mousemove', handleHueMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = () => {
        window.removeEventListener('mousemove', handleSpectrumMouseMove);
        window.removeEventListener('mousemove', handleHueMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    
    const handleSpectrumMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (!spectrumRef.current) return;
        const rect = spectrumRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

        const newS = x / rect.width;
        const newV = 1 - y / rect.height;
        setSaturation(newS);
        setValue(newV);
    }, []);

    const handleHueMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (!hueSliderRef.current) return;
        const rect = hueSliderRef.current.getBoundingClientRect();
        const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        const newH = y / rect.height;
        setHue(newH);
    }, []);

    useEffect(() => {
        const newRgb = hsvToRgb({ h: hue, s: saturation, v: value });
        onChange(rgbToHex(newRgb));
    }, [hue, saturation, value, onChange]);

    const spectrumBg = rgbToHex(hsvToRgb({ h: hue, s: 1, v: 1 }));

    return (
        <div className="absolute z-10 mt-2 w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200">
            <div
                ref={spectrumRef}
                onMouseDown={handleSpectrumMouseDown}
                className="w-full h-40 rounded-md cursor-crosshair relative"
                style={{ backgroundColor: spectrumBg }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div
                    className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${saturation * 100}%`, top: `${(1 - value) * 100}%` }}
                />
            </div>
            <div className="mt-4 flex items-center space-x-3">
                <div
                    ref={hueSliderRef}
                    onMouseDown={handleHueMouseDown}
                    className="w-4 h-40 rounded-full cursor-pointer relative bg-gradient-to-b from-red-500 via-yellow-500,green-500,cyan-500,blue-500,magenta-500 to-red-500"
                >
                     <div
                        className="absolute w-5 h-2 -left-0.5 rounded-sm border-2 border-white shadow-md transform -translate-y-1/2"
                        style={{ top: `${hue * 100}%` }}
                    />
                </div>
                <div className="w-10 h-10 rounded-md border" style={{backgroundColor: color}}></div>
            </div>
        </div>
    );
}

export default ColorPalettePicker;
