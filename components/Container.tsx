const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto max-w-7xl my-10 px-4 sm:px-6 lg:px-8">
			{children}
		</div>
	);
};

export default Container;
