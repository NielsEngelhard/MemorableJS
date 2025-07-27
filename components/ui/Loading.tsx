import React from 'react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ 
  message = "Searching for active games...", 
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Animated dots */}
      <div className="flex space-x-1 mb-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${dotSizes[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1.4s'
            }}
          />
        ))}
      </div>
      
      {/* Loading text with fade animation */}
      <p className={`${sizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium animate-pulse`}>
        {message}
      </p>
      
      {/* Subtle background pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10 rounded-lg animate-pulse pointer-events-none" 
           style={{ animationDuration: '3s' }} />
    </div>
  );
}