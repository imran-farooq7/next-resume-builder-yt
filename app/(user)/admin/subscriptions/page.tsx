import { auth } from "@/auth";
import SubscriptionsTable from "@/components/SubscriptionsTable";
import { prisma } from "@/prisma/db";

const SubscriptionsPage = async () => {
	const subscriptions = await prisma.subscription.findMany();
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
			<h1 className="text-3xl text-emerald-400 font-bold mb-6">
				Subscriptions
			</h1>
			<SubscriptionsTable subscriptions={subscriptions} />
		</div>
	);
};

export default SubscriptionsPage;
