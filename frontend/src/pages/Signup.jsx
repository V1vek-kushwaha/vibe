import React from 'react'
import Logo from '../assets/logo.png'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// Add these imports:
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'




const Signup = () => {
    const navigate = useNavigate() // For navigation

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            username: Yup.string().required('Username is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                const response = await axiosInstance.post('/signup', values);  // No need to repeat the base URL
                setStatus({ success: 'Signup successful!' });
                resetForm();
                navigate('/signin')
            } catch (error) {
                setStatus({ error: error.response?.data?.message || 'Signup failed' });
            } finally {
                setSubmitting(false);
            }
        },
    })

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-5'>
                    <div className='font-semibold mt-8 text-[20px] flex gap-2.5 items-center'>
                        <span className='text-gray-600'> Sign Up to </span>
                        <img src={Logo} alt="logo" className='w-[70px]' />
                    </div>
                    <div className="w-full flex-1 mt-6">
                        <form onSubmit={formik.handleSubmit} className="mx-auto max-w-xs">
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
                            )}
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                            )}
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="text"
                                name="username"
                                placeholder="UserName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div>
                            )}
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-500 text-xs ">{formik.errors.password}</div>
                            )}
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="mt-5 tracking-wide font-semibold bg-[linear-gradient(to_right,_#6848c6,_#d84189,_#fb9438)] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <ClipLoader size={24} color="#fff" />
                                        <span className="ml-3">Signing Up...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy={7} r={4} />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </>
                                )}
                            </button>
                            {formik.status && formik.status.success && (
                                <div className="text-green-600 text-center">{formik.status.success}</div>
                            )}
                            {formik.status && formik.status.error && (
                                <div className="text-red-600 text-center ">{formik.status.error}</div>
                            )}
                            <p className="mt-6 text-gray-600 text-center cursor-pointer">
                                Already have an account ?
                                <span
                                    className='ms-1 border-b-2 pb-1 text-black'
                                    onClick={() => navigate('/signin')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Sign IN
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
                <div className=' md:w-[50%] h-full hidden lg:flex justify-center items-center 
                bg-[#080827] flex-col gap-2.5 text-white text-[16px] font-semibold rounded-l-[30px] 
                shadow-2xl shadow-black'>
                    <img src={Logo} alt="vibelogo" className='w-[40%]' />
                    <p className='text-white'> Feel the Vibe. Share the Moment</p>
                </div>
            </div>
        </div>
    )
}

export default Signup