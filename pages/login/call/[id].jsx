import { useRouter } from "next/router";
import Landing from "../../../components/Landing";
import { useAuth } from "../../../contexts/AuthContext";


export default function ProductPage() {
 const router = useRouter();
  const { id } = router.query;
 const {currentUser} = useAuth;
  // Fetch data for the product with the specified ID using `id`

  return (
    <div>
      <h1>Product {id}</h1>
      {currentUser?.addr}
      <Landing/>
    </div>
  );

}