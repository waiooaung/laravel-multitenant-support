import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const CheckCircleIcon = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function Create() {
    const ticketTypes = [
        "Technical Issues",
        "Account & Billing",
        "Product & Service",
        "General Inquiry",
        "Feedback & Suggestions"
    ];

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        customer_name: '',
        email: '',
        type: '',
        description: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/support', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Submit a Ticket" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Support Center
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    We're here to help. Fill out the form below and we'll route it to the right team instantly.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-[40rem]">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-2xl sm:px-10 border border-slate-100 relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    {recentlySuccessful ? (
                        <div className="text-center py-10">
                            <div className="animate-bounce-in">
                                <CheckCircleIcon />
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ticket Submitted!</h3>
                                <p className="text-slate-600 mb-6">
                                    Thank you, <strong>{data.customer_name || 'Customer'}</strong>.
                                    <br />
                                    We have routed your request to the <strong>{data.type}</strong> department.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    Submit another ticket &rarr;
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={submit}>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="customer_name" className="block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="customer_name"
                                            name="customer_name"
                                            type="text"
                                            required
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.customer_name && <p className="mt-1 text-xs text-red-500">{errors.customer_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-semibold text-slate-700">
                                    How can we help? (Department)
                                </label>
                                <div className="mt-1 relative">
                                    <select
                                        id="type"
                                        name="type"
                                        required
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg shadow-sm transition duration-150 ease-in-out bg-white"
                                    >
                                        <option value="" disabled>Select an issue type...</option>
                                        {ticketTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">
                                    * This ensures your ticket is routed to the correct database immediately.
                                </p>
                                {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        required
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                        placeholder="Please provide details about your issue..."
                                    />
                                </div>
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    {processing ? (
                                        <>
                                            <SpinnerIcon />
                                            Routing Ticket...
                                        </>
                                    ) : (
                                        'Submit Ticket'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        Powered by Laravel 12 & Multi-Database Architecture
                    </p>
                </div>
            </div>
        </div>
    );
}
