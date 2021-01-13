import React, { useEffect } from 'react';
// components
import AdminHeader from '../components/AdminHeader';
import AdminActionBtns from '../components/AdminActionBtns';
import AdminCategoryModal from '../components/AdminCategoryModal';
import AdminProductModal from '../components/AdminProductModal';
import AdminBody from '../components/AdminBody';
//redux
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])
  return(
    <section>
      <AdminHeader />
      <AdminActionBtns />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody />
    </section>
  )
};

export default AdminDashboard;