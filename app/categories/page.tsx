import { getAllCategories } from "@/apiCalls/categoriesCalls";
import { CategoryClient } from "@/componant/CategoryClient/CategoryClient";

type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;
const Allcategories = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { pageNumber } = await props.searchParams;

  const initialData = await getAllCategories(Number(pageNumber));
  return (
    <section
      className="container mx-auto relative  p-10 "
      style={{ minHeight: "800px" }}
    >
      <CategoryClient pageNumber={pageNumber} initialData={initialData} />
    </section>
  );
};

export default Allcategories;
