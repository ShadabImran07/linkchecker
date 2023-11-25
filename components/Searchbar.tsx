"use client";

import { FormEvent, useState } from "react";

const Searchbar = () => {
	const [searchPrompt, setSearchStatePrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [brokenLinks, setBrokenLinks] = useState([]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await fetch("/api/getLink",
				{
					method: "POST",
					body: JSON.stringify({
						url: searchPrompt,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await response.json();
			setBrokenLinks(data.data);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	console.log(brokenLinks);
	return (
		<div className='mt-4 p-4'>
			<form
				className='flex items-center'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					value={searchPrompt}
					onChange={(e) => setSearchStatePrompt(e.target.value)}
					placeholder='Enter a Link'
					className='border border-gray-300 rounded px-4 py-2 mr-4 w-60'
				/>

				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400'
					disabled={searchPrompt === ""}
				>
					{isLoading ? "Searching..." : "Search"}
				</button>
			</form>

			{brokenLinks !== null && (
				<div className='mt-4'>
					{brokenLinks?.length > 0 ? (
						<ul>
							{brokenLinks.map((link: any, index) => (
								<li
									key={index}
									className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2'
								>
									Broken Link:{link.url}
								</li>
							))}
						</ul>
					) : (
						<p className='text-green-700 font-bold'>All links are perfect!</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Searchbar;
