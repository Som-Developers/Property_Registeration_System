import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRegisterMutation } from '../redux/api/userApi'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must not exceed 30 characters')
});

function Register() {
  const [register, { isLoading,error }] = useRegisterMutation();
  const navigate = useNavigate();

  const { register: formRegister, handleSubmit: formHandleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  const onSubmit = async (data) => {
    try {
      const result = await register(data);
      if (result.error) {
        console.error('Registration error:', result.error.data.message);
      }
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Register User</CardTitle>
        </CardHeader>
        <CardContent>
          {(error || Object.keys(errors).length > 0) && (
            <div className="text-red-500 text-sm mb-4">
              {error || 'Please fix the validation errors below'}
            </div>
          )}
          <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                {...formRegister('username')}
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                {...formRegister('email')}
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                {...formRegister('password')}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
