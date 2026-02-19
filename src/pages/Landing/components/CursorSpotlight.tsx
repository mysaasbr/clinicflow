import React, { useState, useEffect } from 'react';

export const CursorSpotlight: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let frameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Use requestAnimationFrame to debounce updates to screen refresh rate
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.07), transparent 40%)`,
                willChange: 'background'
            }}
        />
    );
};
