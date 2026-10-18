
import Link from "next/link";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

type Props = {
    searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({
    searchParams,
}: Props) {
    const { session_id } = await searchParams;
    let paid = false;
    let verified = false;

    if (
        session_id &&
        /^cs_(test|live)_[A-Za-z0-9]+$/.test(session_id) &&
        process.env.STRIPE_SECRET_KEY
    ) {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const session =
                await stripe.checkout.sessions.retrieve(session_id);

            verified =
                session.status === "complete" &&
                session.payment_status === "paid";

            paid = verified && session.mode === "payment";
        } catch (error) {
            console.error("Checkout session verification failed:", error);
        }
    }

    return (
        <main className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#e85d3f]">
                MG Creations
            </p>

            {paid ? (
                <>
                    <h1 className="mt-4 text-4xl font-black">
                        Payment confirmed!
                    </h1>
                    <p className="mt-6 text-gray-600">
                        Stripe confirms your payment. Keep your checkout
                        details for your records.
                    </p>
                </>
            ) : (
                <>
                    <h1 className="mt-4 text-4xl font-black">
                        {verified
                            ? "Payment not yet confirmed"
                            : "Checking your payment"}
                    </h1>
                    <p className="mt-6 text-gray-600">
                        {verified
                            ? "This checkout does not represent a paid one-time order."
                            : "We could not confirm a completed payment. If you paid, please contact us before trying again."}
                    </p>
                </>
            )}

            <Link
                href="/shop"
                className="mt-8 inline-block rounded-full bg-[#e85d3f] px-8 py-4 font-bold text-white hover:bg-[#d94f32]"
            >
                Continue Shopping
            </Link>
        </main>
    );
}
