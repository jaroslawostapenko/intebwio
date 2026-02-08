import React from 'react';
import { HeroSection as HeroType } from '../../types';
import { getPlaceholderImage } from '../../constants';

export const HeroSection: React.FC<{ data: HeroType }> = ({ data }) => {
  const bgImage = getPlaceholderImage(data.backgroundImageQuery || 'abstract', 1600, 600);

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
          {data.headline}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
          {data.subheadline}
        </p>
      </div>
    </div>
  );
};