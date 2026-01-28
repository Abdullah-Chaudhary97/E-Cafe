import React from 'react';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-dark-light border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center md:justify-between h-10 py-2">
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a 
              href="tel:+923005392979" 
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              <span>+92 300 5392979</span>
            </a>
            <div className="flex items-center gap-2 text-text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
              <span>Mon-Sat: 11AM - 23PM</span>
            </div>
          </div>
          
          {/* Mobile: Show only phone */}
          <div className="md:hidden flex items-center gap-2 text-xs text-text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="text-primary"
              viewBox="0 0 16 16"
            >
              <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
              <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <a href="tel:+923005392979" className="text-text-muted hover:text-primary transition-colors no-underline">
              +92 300 5392979
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
