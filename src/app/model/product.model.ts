import { CategoryResponse } from './category-response.model';
import { Category } from './category.model';
export interface Product{
  productName: string,
  productDescription: string,
  price: number,
  stockAvailable: number,
  image: string,
  category: CategoryResponse
}