import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ carId, startDate, endDate }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    await stripe.confirmPayment({
      elements,
      confirmParams: {
       return_url: `http://localhost:3000/success?carId=${carId}&start=${startDate}&end=${endDate}`



      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button className="btn btn-primary mt-3" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}
