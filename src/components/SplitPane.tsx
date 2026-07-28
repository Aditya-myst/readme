"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function SplitPane({ leftPane, rightPane }: { leftPane: React.ReactNode, rightPane: React.ReactNode }) {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return;
    if ('touches' in e) return;
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
    <div ref={containerRef} className="flex flex-col lg:flex-row h-full w-full overflow-hidden select-none">
      <div style={{ width: isMobile ? '100%' : `${leftWidth}%` }} className="h-1/2 lg:h-full flex flex-col overflow-hidden w-full lg:w-auto">
        {leftPane}
      </div>
      
      <div 
        onMouseDown={startDragging}
        className={`hidden lg:flex w-[1px] cursor-col-resize flex-col items-center justify-center relative z-50 transition-all ${isDragging ? 'bg-[#58a6ff] w-[4px]' : 'bg-[#30363d] hover:bg-[#58a6ff] hover:w-[4px]'}`}
      >
        <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize z-50" />
      </div>

      {/* Mobile divider */}
      <div className="lg:hidden w-full h-[2px] bg-[#30363d] shrink-0" />

      <div style={{ width: isMobile ? '100%' : `${100 - leftWidth}%` }} className="h-1/2 lg:h-full flex flex-col overflow-hidden w-full lg:w-auto">
        {rightPane}
      </div>
    </div>
  );
}