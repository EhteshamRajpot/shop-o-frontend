import React, { useEffect } from 'react'
import Login from "../components/Login/Login.tsx"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <Login />
  )
}

export default LoginPage