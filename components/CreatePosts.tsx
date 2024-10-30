import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';

// Validation schema using Yup
const validationSchema = Yup.object({
  board_id: Yup.number().required('Board ID is required'),
  title: Yup.string()
    .max(100, 'Title must be 100 characters or less')
    .required('Title is required'),
  ip_address: Yup.string()
    .matches(
      /^(?:(?:\d{1,3}\.){3}\d{1,3}|[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4}:[a-fA-F\d]{1,4})$/,
      'Invalid IP address'
    )
    .required('IP address is required'),
  image_path: Yup.string().url('Invalid URL'),
  content: Yup.string().required('Content is required'),
  status: Yup.string()
    .oneOf(['active', 'closed', 'archived'], 'Invalid status')
    .required('Status is required'),
});

export default function CreatePostForm() {
  return (
    <div className="create_post_form p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>

      <Formik
        initialValues={{
          board_id: '',
          title: '',
          ip_address: '',
          image_path: '',
          content: '',
          status: 'active', // Default status
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Submit form data
          console.log(values);
          setSubmitting(false);
          resetForm(); // Reset form after submission
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Board ID */}
            <div>
              <label htmlFor="board_id" className="block text-sm font-medium">
                Board ID
              </label>
              <Field
                type="number"
                name="board_id"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />
              <ErrorMessage
                name="board_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* IP Address */}
            <div>
              <label htmlFor="ip_address" className="block text-sm font-medium">
                IP Address
              </label>
              <Field
                type="text"
                name="ip_address"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />
              <ErrorMessage
                name="ip_address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Image Path */}
            <div>
              <label htmlFor="image_path" className="block text-sm font-medium">
                Image URL
              </label>
              <Field
                type="text"
                name="image_path"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />
              <ErrorMessage
                name="image_path"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                rows="5"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Post'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
