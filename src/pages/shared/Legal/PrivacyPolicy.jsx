import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: January 21, 2026</p>

            <div className="space-y-6 text-gray-700">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Introduction</h2>
                    <p>
                        Welcome to NGOConnect ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                        If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, 
                        please contact us at support@ngoconnect.com.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Information We Collect</h2>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the website, 
                        express an interest in obtaining information about us or our products and services, when you participate in activities on the website 
                        (such as by posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Names</li>
                        <li>Phone Numbers</li>
                        <li>Email Addresses</li>
                        <li>Mailing Addresses</li>
                        <li>Billing Addresses (for donations)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">3. How We Use Your Information</h2>
                    <p>
                        We use personal information collected via our website for a variety of business purposes described below. 
                        We process your personal information for these purposes in reliance on our legitimate business interests, 
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Sharing Your Information</h2>
                    <p>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may email us at support@ngoconnect.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;