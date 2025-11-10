import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, navigationItems }) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed right-4 top-4 z-50"
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div 
        className={`mobile-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <nav 
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start gap-2 text-lg"
              onClick={() => {
                item.onClick();
                onToggle();
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;