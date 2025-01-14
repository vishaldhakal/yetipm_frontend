import Swal from "sweetalert2";

export const showSuccess = (message) => {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export const showError = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonColor: "#d33",
  });
};

export const showConfirmation = async (message) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  return result.isConfirmed;
};
