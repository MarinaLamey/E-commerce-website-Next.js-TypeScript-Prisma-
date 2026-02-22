import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminCategoryStore } from '@/store/useAdminCategoryStore';

export const useCategoryForm = () => {
  const addCategory = useAdminCategoryStore((state) => state.addCategory);
  const [formData, setFormData] = useState({ name: "", imgSrc: "" });
  const [loading, setLoading] = useState(false);
 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await addCategory(formData);
    
    if (success) {
      setFormData({ name: "", imgSrc: "" });
      router.refresh(); 
    }
    setLoading(false);
  };

  return {
    addCategory,
    handleSubmit,
   loading,
    formData,
    setFormData
  }
}
