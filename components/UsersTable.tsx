import { User } from "@prisma/client";

interface Props {
	users: User[];
}
const UsersTable = ({ users }: Props) => {
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
						Email
					</th>

					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Subscriber
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{users.map((user) => (
					<tr key={user.id}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							{user?.name}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							{user.email}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
							{user.subscription ? "Yes" : "No"}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UsersTable;
