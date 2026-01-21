import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api.config';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Since it's a public endpoint, we don't need axiosSecure
  // We use standard axios with the base URL
  const publicAxios = axios.create({
    baseURL: API_BASE_URL,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await publicAxios.post(API_ENDPOINTS.CONTACT, data);
      
      // Success case
      if (response.status === 201) {
        toast.success(response.data.message || 'Message sent successfully!');
        reset(); // Clear form
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error.response?.data) {
        // Handle validation errors from backend
        // e.g. { "email": ["Enter a valid email address."], "message": ["This field is required."] }
        const serverErrors = error.response.data;
        
        // If it's an object with field keys, show the first error message
        Object.keys(serverErrors).forEach(key => {
            const messages = serverErrors[key];
            if (Array.isArray(messages)) {
               toast.error(`${key}: ${messages[0]}`); 
            } else if (typeof messages === 'string') {
               toast.error(messages);
            }
        });
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="bg-green-600 text-white p-10 md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-green-100 mb-8 leading-relaxed">
                Have questions about volunteering, donations, or our campaigns? 
                We'd love to hear from you. Fill out the form and our team will get back to you shortly.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <FiMail className="text-xl" />
                  </div>
                  <span>ngoconnect.bd@gmail.com</span>
                </div>
                {/* Add more contact info here if needed */}
              </div>
            </div>
            
            <div className="mt-12">
              <div className="w-20 h-1 bg-green-400 mb-6"></div>
              <p className="text-sm text-green-100">
                NGOConnect &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-10 md:w-3/5">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text flex items-center gap-2 font-medium text-gray-600">
                    <FiUser /> Name
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className={`input input-bordered w-full hover:border-green-500 focus:border-green-500 focus:outline-none transition-colors ${errors.name ? 'input-error' : ''}`}
                  {...register("name", { required: "Name is required" })} 
                />
                {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text flex items-center gap-2 font-medium text-gray-600">
                    <FiMail /> Email
                  </span>
                </label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className={`input input-bordered w-full hover:border-green-500 focus:border-green-500 focus:outline-none transition-colors ${errors.email ? 'input-error' : ''}`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })} 
                />
                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text flex items-center gap-2 font-medium text-gray-600">
                    <FiMessageSquare /> Subject
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className={`input input-bordered w-full hover:border-green-500 focus:border-green-500 focus:outline-none transition-colors ${errors.subject ? 'input-error' : ''}`}
                  {...register("subject", { required: "Subject is required" })} 
                />
                {errors.subject && <span className="text-error text-xs mt-1">{errors.subject.message}</span>}
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text flex items-center gap-2 font-medium text-gray-600">
                    Message
                  </span>
                </label>
                <textarea 
                  className={`textarea textarea-bordered h-32 hover:border-green-500 focus:border-green-500 focus:outline-none transition-colors ${errors.message ? 'textarea-error' : ''}`}
                  placeholder="Your message here..."
                  {...register("message", { required: "Message is required" })} 
                ></textarea>
                {errors.message && <span className="text-error text-xs mt-1">{errors.message.message}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary w-full bg-green-600 hover:bg-green-700 border-none text-white normal-case text-lg gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
