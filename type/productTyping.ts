 export interface ProductType {
  id:number;
     name:string;
    imgSrc:string;
 description: string | null;
     price:number;
    stock:number;
    categoryId:number;
    isOffer:boolean;
    isBestseller:boolean;
     createdAt: Date;
    updatedAt: Date;
}
 export interface CategoryProductsDataType {
  products: ProductType[];          
  categoryName: string;         
  productsCount: number;          
}
export interface CategoryProductsClientType{
  id:number;
  pageNumber:number;
  userName:string;
  userId?:number;
  initialData:CategoryProductsDataType ;
}
export interface CategoryProductsList{
  id:number;
  userId:number | undefined;
  pageNumber:number;
  data:CategoryProductsDataType;
}

export interface OffersResponse {
  products:ProductType[];
  productOffersCount:number;
}
