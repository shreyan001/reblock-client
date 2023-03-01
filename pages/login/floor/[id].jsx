import { useRouter } from "next/router";
import Landing from "../../../components/Landing";


export default function ProductPage() {
 const router = useRouter();
  const { id } = router.query;

  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
      <h1>Product {id}</h1>
      {/* Display product data here */}
      <Landing/>
      <button onClick={()=>{router.push(`/floor/${id}`)}} className="button1">Enter Meet</button>
    </div>
  );
}