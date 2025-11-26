import { Navbar } from '../components/Navbar';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="animate-slide-in">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Let&apos;s talk about <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                your next project
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">hello@taskmanager.com</p>
                                    <p className="text-gray-600 dark:text-gray-400">support@taskmanager.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">123 Innovation Drive</p>
                                    <p className="text-gray-600 dark:text-gray-400">Tech Valley, CA 94043</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                    <p className="text-gray-600 dark:text-gray-400">Mon-Fri from 8am to 5pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card animate-fade-in delay-100">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                    <input type="text" className="input-field" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                    <input type="text" className="input-field" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input type="email" className="input-field" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea rows="4" className="input-field" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="btn-primary w-full flex items-center justify-center space-x-2">
                                <Send className="h-5 w-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
