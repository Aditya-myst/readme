"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function SplitPane({ leftPane, rightPane }: { leftPane: React.ReactNode, rightPane: React.ReactNode }) {
  const [leftWidth, setLeftWidth] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden select-none">
      <div style={{ width: `${leftWidth}%` }} className="h-full flex flex-col overflow-hidden">
        {leftPane}
      </div>
      
      <div 
        onMouseDown={startDragging}
        className={`w-[2px] cursor-col-resize flex flex-col items-center justify-center relative z-50 transition-all ${isDragging ? 'bg-[#58a6ff] w-[4px]' : 'bg-[#30363d] hover:bg-[#58a6ff] hover:w-[4px]'}`}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 cursor-col-resize z-50" />
      </div>

      <div style={{ width: `${100 - leftWidth}%` }} className="h-full flex flex-col overflow-hidden">
        {rightPane}
      </div>
    </div>
  );
}
