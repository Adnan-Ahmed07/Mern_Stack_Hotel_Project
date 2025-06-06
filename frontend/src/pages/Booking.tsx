
import BookingForm from "@/forms/BookingForm/BookingForm";
import * as apiClient from "../api-client";

import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "@/contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "@/components/BookingDetailsSummary";
import { useAppContext } from "@/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
    const { stripePromise } = useAppContext();
   const search = useSearchContext();
    const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent", hotelId, numberOfNights],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId && numberOfNights > 0,
  });


     const { data: hotel } = useQuery({
    queryKey: ["fetchHotelByID", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
  });

  const { data: currentUser } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: apiClient.fetchCurrentUser,
  });
console.log(currentUser?.email)
 if (!hotel) {
    return <></>;
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
        <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
            {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
            
          
    </div>
  );
};

export default Booking;
