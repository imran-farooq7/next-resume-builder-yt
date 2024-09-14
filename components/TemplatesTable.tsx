"use client";
import { deleteTemplateById } from "@/lib/actions/actions";
import { prisma } from "@/prisma/db";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Template } from "@prisma/client";
import toast from "react-hot-toast";

interface Props {
	templates: Template[];
}
const TemplatesTable = ({ templates }: Props) => {
	const handleDeleteTemplate = async (id: string) => {
		try {
			const deletedTemplate = await deleteTemplateById(id);
			if (deletedTemplate?.status === "success") {
				toast.success(deletedTemplate.message);
			}
		} catch (error) {
			toast.error("Template deletation failed");
		}
	};
	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead className="bg-gray-50">
				<tr>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>
						Name
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Is Paid
					</th>

					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Actions
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{templates.map((template) => (
					<tr key={template.id}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							{template.name}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							{template.isPaid ? "Yes" : "No"}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							<TrashIcon
								onClick={() => handleDeleteTemplate(template.id)}
								className="text-red-600 w-8 h-8 cursor-pointer"
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TemplatesTable;
