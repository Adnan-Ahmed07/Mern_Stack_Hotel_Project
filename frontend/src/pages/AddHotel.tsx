// frontend/src/pages/AddHotel.tsx
import React from "react";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const AddHotel: React.FC = () => {
  const { showToast } = useAppContext();

 
  const { mutate, status } = useMutation<any, Error, FormData>({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

 
  const isLoading = status === "pending";

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default AddHotel;
