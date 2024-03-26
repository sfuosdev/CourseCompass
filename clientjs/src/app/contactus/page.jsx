"use client";
import { useState } from 'react';

const ContactPage = () => {
    const [formResult, setFormResult] = useState('');
    const [inquiryType, setInquiryType] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [messageValue, setMessageValue] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            setFormResult('Please fill out all required fields.');
            setFormSubmitted(true);
            return;
        }

        const formData = new FormData(form);
        formData.append('inquiry_type', inquiryType);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        setFormResult("Please wait...");
        setFormSubmitted(false);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200) {
                setFormResult(result.message);
                form.reset();
                setInquiryType('');
            } else {
                console.error(response);
                setFormResult(result.message);
            }
        } catch (error) {
            console.error(error);
            setFormResult("Something went wrong!");
        }

        setTimeout(() => {
            setFormResult('');
        }, 5000);
    };

    const handleInquiryChange = (e) => {
        setInquiryType(e.target.value);
    };

    return (
        <div className="flex items-center min-h-screen bg-gray-200">
            <div className="container mx-auto">
                < div className="max-w-xl mx-auto my-10 bg-white p-5 rounded-md shadow-sm" >
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700">
                            Contact Us
                        </h1>
                        <p className="text-gray-400 dark:text-gray-400">
                            Fill out the form below to send us a message.
                        </p>
                    </div>
                    <div className="m-7">
                        <form
                            action="https://api.web3forms.com/submit"
                            method="POST"
                            id="form"
                            className={`needs-validation ${formSubmitted ? 'was-validated' : ''}`}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="access_key" value="6f057127-3163-4bec-bb74-8189e44b4b92" />
                            <input type="hidden" name="subject" value="New Submission from Web3Forms" />
                            <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />

                            <div className="mb-6">
                                <label htmlFor="inquiry" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Type of Inquiry</label>
                                <select
                                    id="inquiry"
                                    name="inquiry"
                                    value={inquiryType}
                                    onChange={handleInquiryChange}
                                    required
                                    className={`w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${formSubmitted && !inquiryType ? 'border-red-400' : ''}`}
                                >
                                    <option value="" disabled>Select Inquiry Type</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Help Needed">Help Needed</option>
                                    <option value="Bug Report">Bug Report</option>
                                </select>
                                {formSubmitted && !inquiryType && <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Please select an inquiry type.</div>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@company.com"
                                    required
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    className={`w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${formSubmitted && !emailValue.trim() ? 'border-red-400' : ''}`}
                                />
                                {formSubmitted && !emailValue.trim() && <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Please provide a valid email address.</div>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    value={nameValue}
                                    onChange={(e) => setNameValue(e.target.value)}
                                    className={`w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${formSubmitted && !nameValue.trim() ? 'border-red-400' : ''}`}
                                />
                                {formSubmitted && !nameValue.trim() && <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Please provide your name.</div>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Your Message"
                                    required
                                    value={messageValue}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                    className={`w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${formSubmitted && !messageValue.trim() ? 'border-red-400' : ''}`}
                                ></textarea>
                                {formSubmitted && !messageValue.trim() && <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">Please enter your message.</div>}
                            </div>
                            <button
                                type="submit"
                                className={`w-full px-3 py-4 text-white rounded-md focus:outline-none ${formSubmitted && (!emailValue.trim() || !nameValue.trim() || !messageValue.trim()) ? 'bg-red-500' : 'bg-indigo-500 focus:bg-indigo-600'}`}
                            >
                                Send Message
                            </button>
                            <p className={`text-base text-center ${formResult.startsWith('Form submitted successfully') ? 'text-green-500' : 'text-red-500'}`} id="result">{formResult}</p>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default ContactPage;

