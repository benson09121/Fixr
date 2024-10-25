import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
      {/* Add any common layout components here, like a header or sidebar */}
      <Outlet />
    </>
  );
}

export default AdminLayout;