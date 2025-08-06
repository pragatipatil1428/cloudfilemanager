import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // Default to email login
  const [showOtp, setShowOtp] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    mobile: "",
    otp: "",
  };

  const emailSignInSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const mobileSignInSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    showOtp: Yup.boolean(),
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .when("showOtp", {
        is: true,
        then: (schema) => schema.required("OTP is required"),
      }),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-900 to-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => {
              setLoginMethod("email");
              setShowOtp(false);
            }}
            className={`px-4 py-2 font-medium rounded-l-md ${
              loginMethod === "email"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("mobile");
              setShowOtp(false);
            }}
            className={`px-4 py-2 font-medium rounded-r-md ${
              loginMethod === "mobile"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Mobile & OTP
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={
            loginMethod === "email" ? emailSignInSchema : mobileSignInSchema
          }
          onSubmit={(values) => {
            if (loginMethod === "email") {
              // Handle email/password login
              console.log(
                "Logging in with email:",
                values.email,
                values.password
              );
              // Add your email/password authentication logic here
            } else {
              if (!showOtp) {
                // Simulate sending OTP
                console.log("Sending OTP to", values.mobile);
                setShowOtp(true);
              } else {
                // Handle OTP verification and login
                console.log(
                  "Verifying OTP and logging in:",
                  values.mobile,
                  values.otp
                );
                // Add your OTP authentication logic here
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {loginMethod === "email" ? (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <Field
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your mobile number"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {showOtp && (
                    <div>
                      <label
                        htmlFor="otp"
                        className="block text-sm font-medium text-gray-700"
                      >
                        OTP
                      </label>
                      <Field
                        type="text"
                        id="otp"
                        name="otp"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter OTP"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}
                </>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {loginMethod === "email"
                  ? "Sign In"
                  : showOtp
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <a
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
