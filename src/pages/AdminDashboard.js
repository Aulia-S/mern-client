import React from 'react';
// components
import AdminHeader from '../components/AdminHeader';
import AdminActionBtns from '../components/AdminActionBtns';
import AdminCategoryModal from '../components/AdminCategoryModal';
import AdminProductModal from '../components/AdminProductModal';


const AdminDashboard = () => (
    <section>
      <AdminHeader />
      <AdminActionBtns />
      <AdminCategoryModal />
      <AdminProductModal />
    </section>
  );

export default AdminDashboard;