import React, { useEffect } from 'react'
import Signup from "../components/Signup/Signup.tsx"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <Signup />
  )
}

export default SignupPage