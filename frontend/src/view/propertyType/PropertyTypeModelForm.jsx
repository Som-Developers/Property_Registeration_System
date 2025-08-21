import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { useCreatePropertyTypeMutation, useUpdatePropertyTypeMutation } from '@/redux/api/propertyTypeApi';
import { useGetPropertyTypesQuery } from '@/redux/api/propertyTypeApi';
import { createPropertyTypeSchema, updatePropertyTypeSchema } from './schema';
import { X, User, Plus } from 'lucide-react';

const PropertyTypeFormModal = ({ 
  isOpen, 
  onClose, 
  propertyType = null, // Pass project data for editing, null for creating
  onSuccess = () => {} 
}) => {
  const isEditing = !!propertyType;
  const schema = isEditing ? updatePropertyTypeSchema : createPropertyTypeSchema;

  // State for member search
  const [search, setSearch] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const [createPropertyType, { isLoading: isCreating }] = useCreatePropertyTypeMutation();
  const [updatePropertyType, { isLoading: isUpdating }] = useUpdatePropertyTypeMutation();
  
  // Fetch users for members selection with search
  const { data: usersData, isLoading: usersLoading } = useGetPropertyTypesQuery({
    limit: 50, // Reasonable limit for selection
    search: search.trim().length >= 2 ? search : '', // Only search if 2+ characters
    searchFields: 'username,email',
    sort: 'username:asc'
  });

  // Also get selected users data (for when editing)
  const selectedMembers = watch('members');
  const { data: selectedUsersData } = useGetPropertyTypesQuery({
    limit: 100,
    sort: 'username:asc'
  }, {
    skip: !selectedMembers?.length // Only fetch if there are selected members
  });

  const users = usersData?.docs || [];
  const allUsers = selectedUsersData?.docs || [];

  useEffect(() => {
    if (isOpen) {
      // Reset search when modal opens
      setSearch('');
      
      if (isEditing && propertyType) {
        // Extract member IDs for form
        const memberIds = propertyType.members?.map(member => 
          typeof member === 'object' ? member._id || member.id : member
        ) || [];
        
        reset({
          name: propertyType.name || '',
          description: propertyType.description || '',
        });
      } else {
        reset({
          name: '',
          description: '',
        });
      }
    }
  }, [isOpen, isEditing, propertyType, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updatePropertyType({ 
          id: propertyType.id || propertyType._id, 
          ...data 
        }).unwrap();
        
        toast.success('Property Type updated successfully!');
      } else {
        await createPropertyType(data).unwrap();
        toast.success('Property Type created successfully!');
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Property Type submission error:', error);
      const errorMessage = error?.data?.message || 
        `Failed to ${isEditing ? 'update' : 'create'} property type. Please try again.`;
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    reset();
    setSearch(''); // Reset search when closing
    onClose();
  };

  const handleMemberSelect = (userId) => {
    const currentMembers = selectedMembers || [];
    if (!currentMembers.includes(userId)) {
      setValue('members', [...currentMembers, userId]);
    }
    // Clear search after selection
    setSearch('');
  };

  const handleMemberRemove = (userId) => {
    const currentMembers = selectedMembers || [];
    setValue('members', currentMembers.filter(id => id !== userId));
  };

  const getSelectedUsers = () => {
    // Get selected users from allUsers data (which has all users)
    return allUsers.filter(user => 
      selectedMembers?.includes(user._id || user.id)
    );
  };

  const getAvailableUsers = () => {
    // Return users from search results, filtered to exclude already selected
    return users.filter(user => 
      !selectedMembers?.includes(user._id || user.id)
    );
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const isLoading = isSubmitting || isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit Property Type: ${propertyType?.name || 'Unknown'}` : 'Create New Property Type'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the property type information below.' 
              : 'Fill in the details to create a new property type.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Property Type Name</Label>
            <Input
              id="name"
              placeholder="Enter property type name"
              disabled={isLoading}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter property type description"
              disabled={isLoading}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading     
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Property Type' : 'Create Property Type')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyTypeFormModal; 