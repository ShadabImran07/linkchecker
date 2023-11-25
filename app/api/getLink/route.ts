import { LinkChecker } from "linkinator";
import { NextResponse } from "next/server";

export async function GET(request: any) {
	try {
		const url = request.nextUrl.searchParams.get("id");
		const checker = new LinkChecker();
		let brokenLinks: any = [];
		checker.on("link", (link: any) => {
			if (link.state === "BROKEN") brokenLinks.push(link);
		});
		await checker.check({ path: url, recurse: true });
		return NextResponse.json({
			message: "Ok",
			data: brokenLinks,
		});
	} catch (error: any) {
		throw new Error(`Failed to get links: ${error.message}`);
	}
}
