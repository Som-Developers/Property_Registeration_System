import { z } from "zod";

// Create PropertyType schema
export const createPropertyTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Property type name is required')
    .min(3, 'Property type name must be at least 3 characters')
    .max(100, 'Property type name must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal(''))
});

// Update PropertyType schema
export const updatePropertyTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Property type name is required')
    .min(3, 'Property type name must be at least 3 characters')
    .max(100, 'Property type name must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal(''))
}); 