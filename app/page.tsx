import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const Home = async () => {
	return (
		<section className='px-6 md:px-20 py-24'>
			<div className='flex max-xl:flex-col gap-16'>
				<div className='flex flex-col justify-center'>
					<h1 className='head-text'>LinkChecker</h1>

					<p className='mt-6'>
						Paste the link here and see if broken link is present or not !
					</p>

					<Searchbar />
				</div>
			</div>
		</section>
	);
};

export default Home;
