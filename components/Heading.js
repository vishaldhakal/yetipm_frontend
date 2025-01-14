import React from 'react';

export default function Heading({ city = "CALGARY" }) {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-normal inline-flex flex-wrap relative text-center"
          style={{ fontKerning: 'none' }}>
        <span className="relative">
          {city}
          <span 
            className="absolute left-0 bottom-0 h-[45%] w-full -z-10" 
            style={{ backgroundColor: '#f2db0f' }}
          ></span>
        </span>
        <span className="ml-2">PROJECTS</span>
      </h1>
    </div>
  );
}
