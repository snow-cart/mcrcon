import { Header, Console } from "./components";

export default async function Home() {
  return (
	<>
	<Header/>

	<main className="flex flex-col items-left mx-8 my-5 max-h-screen">
		<Console/>
	</main>

	{/* <Footer/> */}
	</>
  );
}
