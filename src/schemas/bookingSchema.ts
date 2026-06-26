import * as yup from "yup";

export const bookingSchema = yup.object({
  reason: yup.string().required("Please choose a reason"),
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export type BookingFormValues = yup.InferType<typeof bookingSchema>;