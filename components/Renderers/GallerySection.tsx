import React from 'react';
import { GallerySection as GalleryType } from '../../types';
import { getPlaceholderImage } from '../../constants';

export const GallerySection: React.FC<{ data: GalleryType }> = ({ data }) => {
  return (
    <div className="mb-8">
      {data.title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.images.map((img, idx) => (
          <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
            <img
              src={getPlaceholderImage(img.query || idx.toString(), 600, 600)}
              alt={img.alt}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
              <p className="text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-sm font-medium">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};