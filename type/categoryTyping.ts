export interface CategoryType {
    id:number;
       name:string;
       imgSrc:string;
}

export interface GetCategoryProps{
    categories:CategoryType[];
    categoriesCount?:number;
}


export interface CategoryListType {
    data:GetCategoryProps;
    pageNumber:number;
}

export interface CategoryClientType{
     initialData:GetCategoryProps;
    pageNumber:number;
}