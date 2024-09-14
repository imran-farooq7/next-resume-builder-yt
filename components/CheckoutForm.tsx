import { saveSubscription } from "@/lib/actions/actions";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/react-native.js";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	user: User;
	setUser: Dispatch<
		SetStateAction<
			| {
					id: string;
					name: string | null;
					email: string;
					emailVerified: Date | null;
					image: string | null;
					createdAt: Date;
					updatedAt: Date;
					resumeProfile: JsonValue;
					role: string | null;
					subscription: JsonValue | null;
			  }
			| undefined
		>
	>;
}

export default function CheckoutForm({ open, setOpen, user, setUser }: Props) {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setLoading(true);
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "",
			},
			redirect: "if_required",
		});
		if (result.error) {
			toast.error(result.error.message!);
			setLoading(false);
		} else {
			setLoading(false);
			setOpen(false);
			toast.success("Payment successful");
			const res = await saveSubscription({
				userId: user.id,
				paymentId: result.paymentIntent.id,
				amount: "5",
			});
			if (res?.status === "success") {
				toast.success("Subscription purchased successfully");
				setUser(res.data);
			} else {
				toast.error("subscription purchase failed");
			}
		}
	};
	return (
		<Transition show={open}>
			<Dialog className="relative z-10" onClose={setOpen}>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
								<div>
									<div className="mt-3 text-center sm:mt-5">
										<DialogTitle
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900"
										>
											Complete Your Payment
										</DialogTitle>
										<div className="mt-2"></div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<form onSubmit={handleSubmit}>
										<PaymentElement />
										<button
											type="submit"
											disabled={!stripe || !elements || loading}
											className="bg-emerald-400 w-full text-white py-3 px-6 rounded-lg hover:scale-105 transition-all ease-in-out disabled:opacity-50 mt-4"
										>
											{loading ? (
												<span className="animate-pulse">Process...</span>
											) : (
												"Pay Now"
											)}
										</button>
									</form>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
