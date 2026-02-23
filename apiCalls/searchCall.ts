import { Product } from "@/app/generated/prisma";
import axios from "axios";
import { toast } from "react-toastify";

 export interface SearchProps {
    products:Product[];
    ProductCount:number;
}

export const getSearchResult = async(pageNumber: number | undefined, searchText: string | undefined , sort: string | undefined): Promise<SearchProps> => {
    try{
            const response = await axios.get(`https://e-commerce-website-next-js-type-scr-nine.vercel.app/api/search?q=${searchText}&pageNumber=${pageNumber}&sort=${sort || "default"}`);
    return  response.data
    }catch(error:any){
      toast.error(`Faild`)
      return { products: [], ProductCount: 0 };
    }

}

