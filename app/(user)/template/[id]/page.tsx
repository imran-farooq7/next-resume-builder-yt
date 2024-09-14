import { auth } from "@/auth";
import Resume from "@/components/Resume";
import { prisma } from "@/prisma/db";

interface Props {
	params: {
		id: string;
	};
}
const TemplatePreviewPage = async ({ params: { id } }: Props) => {
	const session = await auth();
	const template = await prisma.template.findUnique({
		where: {
			id,
		},
	});
	const userProfile = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
			role: "user",
		},
		select: {
			resumeProfile: true,
			subscription: true,
		},
	});
	return (
		<div>
			<Resume
				template={template!}
				userProfile={userProfile?.resumeProfile!}
				userSubscription={userProfile?.subscription!}
			/>
		</div>
	);
};
export default TemplatePreviewPage;
