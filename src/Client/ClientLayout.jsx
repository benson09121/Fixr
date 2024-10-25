import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ClientLayout() {
  return (
    <>
      {/* Add any common layout components here, like a header or sidebar */}
      <Outlet />
    </>
  );
}

