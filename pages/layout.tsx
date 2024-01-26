
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix',
};

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
