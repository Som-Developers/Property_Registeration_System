import React, { useState } from 'react';
import { useGetPropertyTypesQuery, useDeletePropertyTypeMutation } from '../../redux/api/propertyTypeApi';
import CustomDataTable from '@/components/customTable';
import { createPropertyTypeColumns } from './Columns';
import PropertyTypeSummaryCards from './PropertyTypeSummaryCards';
import PropertyTypeFormModal from './PropertyTypeModelForm';
import { DeleteConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from 'sonner';

const PropertyTypeView = () => {
  // State management for table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);

  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyTypeToDelete, setPropertyTypeToDelete] = useState(null);

  // Query parameters
  const { data: propertyTypes, isLoading, isFetching, error, refetch } = useGetPropertyTypesQuery({
    page: currentPage,
    limit: rowsPerPage,
    search: search,
    searchFields: "name,description",
    sort: "createdAt:desc"
  });

  // Delete mutation
  const [deletePropertyType, { isLoading: isDeleting }] = useDeletePropertyTypeMutation();

  // Action handlers
  const handleEdit = (propertyType) => {
    setSelectedPropertyType(propertyType);
    setIsModalOpen(true);
  };

  const handleDelete = (propertyType) => {
    setPropertyTypeToDelete(propertyType);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyTypeToDelete) return;

    try {
      await deletePropertyType({ id: propertyTypeToDelete.id || propertyTypeToDelete._id }).unwrap();
      toast.success(`Property Type "${propertyTypeToDelete.name}" deleted successfully!`);
      setIsDeleteDialogOpen(false);
      setPropertyTypeToDelete(null);
      refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || 'Failed to delete property type.';
      toast.error(errorMessage);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setPropertyTypeToDelete(null);
  };

  const handleView = (propertyType) => {
    console.log('View property type:', propertyType);
  };

  const handleAddPropertyType = () => {
    setSelectedPropertyType(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPropertyType(null);
  };

  const handleModalSuccess = () => {
    refetch();
  };

  const columns = createPropertyTypeColumns(handleEdit, handleDelete, handleView);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading property types: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Property Types Management</h1>
        <p className="text-muted-foreground">
          Manage property types for the system.
        </p>
      </div>

      <PropertyTypeSummaryCards />

      <CustomDataTable
        title="All Property Types"
        ButtonLabel="Add Property Type"
        columns={columns}
        data={propertyTypes || {}}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        isFetching={isFetching}
        addButtonClick={handleAddPropertyType}
        showButton={true}
        searchable={true}
        sortable={true}
        showRefresh={true}
        onRefresh={() => {
          setSearch("");
          setCurrentPage(1);
          refetch();
        }}
        emptyMessage="No property types found"
      />

      <PropertyTypeFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        propertyType={selectedPropertyType}
        onSuccess={handleModalSuccess}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={propertyTypeToDelete?.name || 'this item'}
        itemType="property type"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PropertyTypeView;