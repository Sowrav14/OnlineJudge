'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const pathname = usePathname();
  const hideOn = ['/problems/[problemId]'];
  const hideFooter = /^\/problems\/[^/]+$/.test(pathname);

  return (
    !hideFooter ? <footer className="py-4 mt-2">
      <div className="container mx-auto text-center">
        <p className="text-lg"> Thanks for visiting @Online Judge. </p>
        <p className='text-lg'> We just started. Stay with us. Best is yet to come. </p>
      </div>
    </footer> : null
  );
};

export default Footer;