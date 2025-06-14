import { CategoryResponse } from '@api/category/CategrotyModels';

// Delete /api/favorite/category/{userId}/{categoryId} 즐겨찾기 삭제
// export type DeleteFavoriteCategoryResponse = SuccessResponse | FailResponse;

// GET  /api/favorite/category/{userId} 사용자 즐겨 찾기 항목 조회.
export type GetFavoriteCategoriesResponse = CategoryResponse[];
//  | FailResponse;

// POST /api/favorite/category/{userId} 사용자 즐겨 찾기 항목 추가
export type AddFavoriteCategoriesRequest = number[]; // 카테고리 ID 배열

// export type AddFavoriteCategoriesResponse = SuccessResponse | FailResponse;
