import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

const AddUser = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    return <div className="text-red-500 text-center">UserContext not found</div>;
  }

  const { addUser } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Valid email is required";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.street.trim()) {
        newErrors.street = "Street is required";
        isValid = false;
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
        isValid = false;
      }
      if (!formData.zipCode.trim() || !/^\d{5,6}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Valid zip code is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      addUser({
        name: formData.name,
        email: formData.email,
        address: {
          street: formData.street,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      });
      toast.success("User added successfully!", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Add New User
        </h2>

        {step === 1 && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 mb-2 text-sm">{errors.name}</p>}

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 mb-2 text-sm">{errors.email}</p>}
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.street && <p className="text-red-500 mb-2 text-sm">{errors.street}</p>}

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.city && <p className="text-red-500 mb-2 text-sm">{errors.city}</p>}

            <input
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            {errors.zipCode && <p className="text-red-500 mb-2 text-sm">{errors.zipCode}</p>}
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Back
          </button>
          {step < 2 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
