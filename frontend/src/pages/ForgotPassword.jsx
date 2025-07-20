import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import axiosInstance from '../utils/axiosInstance'

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleEmailSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axiosInstance.post('/forgot-password/send-otp', { email: values.email })
      setEmail(values.email)
      setStep(2)
      setStatus({ success: 'OTP sent to your email' })
    } catch (error) {
      setStatus({ error: error.response?.data?.message || 'Failed to send OTP' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleOtpSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axiosInstance.post('/forgot-password/verify-otp', { email, otp: values.otp })
      setStep(3)
      setStatus({ success: 'OTP verified' })
    } catch (error) {
      setStatus({ error: error.response?.data?.message || 'OTP verification failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const handlePasswordReset = async (values, { setSubmitting, setStatus }) => {
    try {
      await axiosInstance.post('/forgot-password/reset-password', {
        email,
        password: values.password,
      })
      setStatus({ success: 'Password reset successful!' })
      setTimeout(() => navigate('/signin'), 1500)
    } catch (error) {
      setStatus({ error: error.response?.data?.message || 'Password reset failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const emailForm = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: handleEmailSubmit,
  })

  const otpForm = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string().length(4, 'OTP must be 4 digits').required('OTP is required'),
    }),
    onSubmit: handleOtpSubmit,
  })

  const passwordForm = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: handlePasswordReset,
  })

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={emailForm.handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Enter your email</h2>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              name="email"
              type="email"
              placeholder="Email"
              onChange={emailForm.handleChange}
              onBlur={emailForm.handleBlur}
              value={emailForm.values.email}
            />
            {emailForm.touched.email && emailForm.errors.email && (
              <div className="text-red-500 text-sm">{emailForm.errors.email}</div>
            )}
            <SubmitButton isSubmitting={emailForm.isSubmitting} text="Send OTP" />
            <StatusMessage status={emailForm.status} />
          </form>
        )
      case 2:
        return (
          <form onSubmit={otpForm.handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Enter OTP sent to {email}</h2>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              name="otp"
              type="text"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              onChange={otpForm.handleChange}
              onBlur={otpForm.handleBlur}
              value={otpForm.values.otp}
            />
            {otpForm.touched.otp && otpForm.errors.otp && (
              <div className="text-red-500 text-sm">{otpForm.errors.otp}</div>
            )}
            <SubmitButton isSubmitting={otpForm.isSubmitting} text="Verify OTP" />
            <StatusMessage status={otpForm.status} />
          </form>
        )
      case 3:
        return (
          <form onSubmit={passwordForm.handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Set a New Password</h2>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              name="password"
              type="password"
              placeholder="New Password"
              onChange={passwordForm.handleChange}
              onBlur={passwordForm.handleBlur}
              value={passwordForm.values.password}
            />
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={passwordForm.handleChange}
              onBlur={passwordForm.handleBlur}
              value={passwordForm.values.confirmPassword}
            />
            {passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{passwordForm.errors.confirmPassword}</div>
            )}
            <SubmitButton isSubmitting={passwordForm.isSubmitting} text="Reset Password" />
            <StatusMessage status={passwordForm.status} />
          </form>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[40%] bg-white rounded-2xl p-8 border-2 border-[#1a1f23]">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="logo" className="w-[80px]" />
        </div>
        {renderForm()}
        <p className="mt-6 text-gray-600 text-center cursor-pointer">
          Go back to
          <span className="ms-1 border-b-2 pb-1 text-black" onClick={() => navigate('/signin')}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}

// Reusable button
const SubmitButton = ({ isSubmitting, text }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="mt-6 tracking-wide font-semibold bg-[linear-gradient(to_right,_#6848c6,_#d84189,_#fb9438)] text-white w-full py-3 rounded-lg flex justify-center items-center"
  >
    {isSubmitting ? <ClipLoader size={20} color="#fff" /> : <span>{text}</span>}
  </button>
)

// Reusable status message
const StatusMessage = ({ status }) => {
  if (!status) return null
  if (status.success) return <div className="text-green-600 text-center mt-2">{status.success}</div>
  if (status.error) return <div className="text-red-600 text-center mt-2">{status.error}</div>
  return null
}

export default ForgotPassword
