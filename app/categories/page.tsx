import { getAllCategories } from "@/apiCalls/categoriesCalls";
import { CategoryClient } from "@/componant/CategoryClient/CategoryClient";
import { GetCategoryProps } from "@/type/categoryTyping";
import Image from "next/image";

type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;

const Allcategories = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { pageNumber } = await props.searchParams;

  const initialData: GetCategoryProps = await getAllCategories(Number(pageNumber));

  return (
    <section
      className="container mx-auto relative p-10 overflow-hidden"
      style={{ minHeight: "800px" }}
    >
      {/* Background Image Implementation:
          - hidden lg:block: Responsive visibility (Visible only on Large screens, hidden on mobile)
          - fixed inset-0: Covers the entire viewport
          - pointer-events-none: Ensures the image doesn't block clicks on category items
          - z-0: Keeps the image behind the main content
      */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block">
        <Image 
          src="/imgs/contactUs.png" // Replace with your desired image path
          alt="background"
          fill
          className="object-cover opacity-20" // Low opacity to maintain content readability
          priority 
        />
      </div>

      {/* Main Content Layer - High Z-index to stay above background */}
      <div className="relative z-10">
        <CategoryClient pageNumber={Number(pageNumber)} initialData={initialData} />
      </div>
    </section>
  );
};

export default Allcategories;