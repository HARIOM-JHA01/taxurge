'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { fullName, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [fullName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");
      
      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <motion.div 
          className="container"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <motion.div 
                className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]"
                variants={itemVariants}
              >
                <motion.h3 
                  className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl"
                  variants={itemVariants}
                >
                  Create your account
                </motion.h3>
                {error && (
                  <motion.p 
                    className="mb-3 text-red-500 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.p>
                )}
                <motion.p 
                  className="mb-11 text-center text-base font-medium text-body-color"
                  variants={itemVariants}
                >
                  Create an account to access all the features.
                </motion.p>
                <motion.form 
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                >
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <label
                      htmlFor="confirmPassword"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </>
                      ) : "Create Account"}
                    </button>
                  </motion.div>
                </motion.form>
                <motion.p 
                  className="text-center text-base font-medium text-body-color"
                  variants={itemVariants}
                >
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="897.603"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;