import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useDI } from '../di/container'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaEyeSlash, FaEye } from "react-icons/fa";

const LoginView = () => {
  const { loginVM } = useDI()
  const navigate = useNavigate()
  const sessionId = useAuthStore((state) => state.sessionId)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (sessionId) navigate('/')
  }, [sessionId, navigate])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username wajib diisi')
        .min(3, 'Username minimal 3 karakter'),
        
      password: Yup.string()
        .required('Password wajib diisi')
        .min(3, 'Password minimal 3 karakter')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]+$/,
          'Password harus mengandung huruf, angka, dan simbol'
        )
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await loginVM.login(values.username, values.password)
        navigate('/')
      } catch (err) {
        console.error(err)
        alert('Login gagal: ' + (err.response?.data?.status_message || err.message))
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <div style={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5'
  }}>
    <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login ke TMDB</h2>

        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Username */}
          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                padding: '0.5rem',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
            {formik.touched.username && formik.errors.username && (
              <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>{formik.errors.username}</div>
            )}
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                padding: '0.5rem',
                width: '100%',
                paddingRight: '2.5rem',
                boxSizing: 'border-box',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.75rem',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1
              }}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            style={{
              padding: '0.75rem',
              width: '100%',
              backgroundColor: '#01b4e4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {formik.isSubmitting ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginView
