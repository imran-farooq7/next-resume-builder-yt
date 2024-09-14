import { getAllTemplates } from "@/lib/actions/actions";
import { Template } from "@prisma/client";
import Link from "next/link";

const HomePage = async () => {
	const templates = (await getAllTemplates()) as Template[];
	return (
		<div>
			<h1 className="text-3xl text-emerald-400 font-bold">Templates</h1>
			<p className="py-8">Choose the template you like</p>
			<div className="grid grid-cols-4 gap-10">
				{templates.map((template) => (
					<Link
						href={`/template/${template.id}`}
						key={template.id}
						className="border border-emerald-400 hover:scale-105 transition-all ease-in-out"
					>
						<img
							src={template.thumbnail}
							alt={template.name}
							className="object-contain w-full h-full"
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default HomePage;
