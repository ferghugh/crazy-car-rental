import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const Success = () => {

  useEffect(() => {
    const confirmRental = async () => {
      try {
        const paymentIntent = new URLSearchParams(window.location.search)
          .get("payment_intent");

        console.log("Payment Intent:", paymentIntent);

        if (!paymentIntent) {
          console.log("No payment_intent found in URL");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/rentals/confirm",
          { payment_intent: paymentIntent },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        );

        console.log("Rental confirmed and saved!");
      } catch (error) {
        console.error("Error confirming rental:", error);
      }
    };

    confirmRental();
  }, []);

  return <h1>Payment Successful!!</h1>;
};

export default Success;
