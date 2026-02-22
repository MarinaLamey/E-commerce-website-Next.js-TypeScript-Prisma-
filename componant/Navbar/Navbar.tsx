import Link from "next/link";
import { cookies } from "next/headers";
import "./navbar.css";
import { SearchBar } from "./search/searchBar";
import { verifyTokenForPage } from "@/utils/verifyToken";
import Button from "../Button/Button";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./cart/carticon.css";
import { LucideShoppingBag } from "lucide-react";
import { CartItem, Category, Product } from "@/app/generated/prisma";
import { CartIcon } from "./cart/cartIcon";
import { CategoriesNameList } from "./CategoriesNameList";
export type CartItemWithProduct = CartItem & {
  product: Product;
};

  export  interface NavbarProp{
  initialCategories:Category[]
}

export async function Navbar({initialCategories} : NavbarProp) {
  //userDate
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userData = verifyTokenForPage(token);
  ///

  return (
    <nav className="relative  bg-white navShadow ">
      <div className="  container  mx-auto px-4  sm:px-0  p-0  flex flex-row   items-center justify-between   ">
        <div   className=" w-[30%]  sm:w-fit flex items-center justify-center !oswaldfont "
          style={{ height: "69px" }}
        >
          <Link
            href="/"
            className="w-full navbarlogo text-xl  sm:text-3xl font-medium flex items-center "
          >
            <span className="maincolor drop-shadow-logodrop text-2xl sm:text-3xl text-center">
              N-
            </span>
            <h2>NegmCartilla</h2>
          </Link>
        </div>
        {/* From medium to small screen will be BMenu */}
        <MobileMenu userData={userData} initialCategories={initialCategories} />
         {/* From medium to small screen will be BMenu */}

        {/* large screen */}
        <div className="  w-[40%]   hidden md:flex items-center justify-center  ">
          <ul className={` w-full text-black flex flex-row justify-between`}>
            <li className=" font-normal px-3 List  relative overflow-hidden ">
              {" "}
              <Link
                href="/"
                className="navanc  px-3 flex items-center justify-center "
                style={{ height: "69px" }}
              >
                Home
              </Link>
            </li>
            <li className=" font-normal px-3 List  relative  menuactive">
              <Link
                href="/categories?pageNumber=1"
                className="navanc  relative overflow-hidden px-3 flex items-center justify-center"
                style={{ height: "69px" }}
              >
                Categories
              </Link>
              <div className="categuremenu px-4 py-6">
                <CategoriesNameList initialCategories={initialCategories}/>
              </div>
            </li>
            <li className=" font-normal  px-3 relative List overflow-hidden">
              <Link
                href="/ContactUs"
                className=" navanc  px-3 flex items-center justify-center"
                style={{ height: "69px" }}
              >
                Contact Us
              </Link>
            </li>
         {userData?.isAdmin && (
  <li className="font-normal px-3 relative List overflow-hidden">
    <Link
      href="/admin/dashboard"
      className="navanc px-3 flex items-center justify-center transition-colors hover:text-[#771011]"
      style={{ height: "69px" }}
    >
      Admin
    </Link>
  </li>
)}
          </ul>
        </div>
        {/* large scren */}

        <div
          className="  mt-2 w-fit  md:w-fit flex items-center flex-row justify-between gap-4 relative  "
          style={{ height: "69px" }}
        >
          {!userData ? (
            <div className="relative ">
              <LucideShoppingBag
                color="black"
                className=" w-full  drop-shadow-logodrop cursor-pointer pumpCartQuantity animationicon"
                style={{ transition: "1s" }}
              />
            </div>
          ) : (
            <CartIcon user={userData.id} />
          )}

          <SearchBar />
        </div>
        <div className="flex flex-row items-center justify-between gap-1.5">
          {userData ? (
            <>
              <p className="hidden md:flex font">Hello {userData.firstName}</p>
              <DropdownMenu />
            </>
          ) : (
            <>
              <Button to={"/loginpage"} buttonValue={"LogIn"} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
