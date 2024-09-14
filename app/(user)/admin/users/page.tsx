import { auth } from "@/auth";
import UsersTable from "@/components/UsersTable";
import { prisma } from "@/prisma/db";

const UsersPage = async () => {
	const users = await prisma.user.findMany({
		where: {
			role: "user",
		},
	});
	const session = await auth();
	if (
		//@ts-ignore
		session?.user.role !== "admin"
	) {
		return (
			<div className="h-screen flex justify-center items-center">
				<h1 className="text-emerald-400 text-5xl">
					You are not authorized to view this page
				</h1>
			</div>
		);
	}
	return (
		<div>
			<h1 className="text-3xl text-emerald-400 font-bold mb-6">Users</h1>
			<UsersTable users={users} />
		</div>
	);
};

export default UsersPage;
