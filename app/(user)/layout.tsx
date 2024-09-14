import { auth } from "@/auth";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { FormProvider } from "@/context/FormContext";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<FormProvider>
			<Navbar user={session?.user!} />
			<Container>{children}</Container>
		</FormProvider>
	);
};

export default UserLayout;
