import Head from "next/head";
import Landing from "../components/Landing";
import Transaction from "../components/Transaction";
import Login from "../components/Onboard";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>FCL Quickstart with NextJS</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Transaction />
       <Login/>
      </main>
    </div>
  );
}
