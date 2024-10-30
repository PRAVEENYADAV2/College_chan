// components/SignupForm.js
"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { log } from 'console';

const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    role: Yup.string().oneOf(['admin', 'moderator', 'super_moderator']).required('Role is required'),
});

const SignupForm = () => {
    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            await axios.post('/api/signup', values);
            alert('Signup successful!');
            resetForm();
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <div className='bg-yellow-50 min-h-[100vh] p-5'>

            <div className="max-w-md bg-white  mx-auto  shadow-md rounded-lg p-6 ">
                <h2 className="text-2xl font-bold mb-6 text-center">Moderator Signup</h2>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        role: 'moderator',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                                <Field
                                    type="text"
                                    name="username"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                                <Field
                                    as="select"
                                    name="role"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="super_moderator">Super Moderator</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {isSubmitting ? 'Signing up...' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignupForm;
