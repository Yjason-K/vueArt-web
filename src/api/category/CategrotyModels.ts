import { SuccessResponse } from '@api/globalResTypes';

// GET /api/category
export interface CategoryResponse {
  categoryId: number;
  categoryKey: string;
}

export type GetCategoriesResponse = CategoryResponse[];

// POST /api/category
export interface CategoryRequest {
  categoryName: string;
}

export type CreateCategoryResponse = SuccessResponse;
