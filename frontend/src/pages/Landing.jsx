import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Layout, Lock, BarChart3, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-primary-500 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-50 dark:opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">v2.0 is now live</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight leading-tight animate-slide-up">
                        Master your workflow with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                            intelligent tools
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        The all-in-one platform for modern teams to manage tasks, track progress, and collaborate seamlessly. Secure, fast, and beautiful.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/register" className="btn-primary flex items-center group text-lg px-8 py-4">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                            View Demo
                        </Link>
                    </div>

                    {/* Hero Image / Dashboard Preview */}
                    <div className="mt-20 relative max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden aspect-[16/9] group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

                            {/* Abstract Dashboard UI Mockup */}
                            <div className="absolute inset-0 p-8 flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="h-2 w-32 bg-gray-700 rounded-full"></div>
                                </div>

                                <div className="flex-1 grid grid-cols-12 gap-6">
                                    {/* Sidebar */}
                                    <div className="col-span-2 hidden md:block space-y-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="h-8 w-full bg-gray-800 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                        ))}
                                    </div>

                                    {/* Main Content */}
                                    <div className="col-span-12 md:col-span-10 space-y-6">
                                        <div className="grid grid-cols-3 gap-6">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-32 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm p-4 relative overflow-hidden group-hover:border-primary-500/30 transition-colors">
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                                                    <div className="h-4 w-24 bg-gray-700 rounded mb-4"></div>
                                                    <div className="h-8 w-16 bg-gray-700 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="h-64 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-primary-600 font-semibold tracking-wide uppercase mb-3">Features</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Everything you need to succeed
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                desc: 'Built on modern architecture for instant page loads and real-time updates.',
                                color: 'text-yellow-500 bg-yellow-500/10'
                            },
                            {
                                icon: Shield,
                                title: 'Enterprise Security',
                                desc: 'Bank-grade encryption, RBAC, and automated security scanning built-in.',
                                color: 'text-primary-500 bg-primary-500/10'
                            },
                            {
                                icon: Layout,
                                title: 'Beautiful Interface',
                                desc: 'A stunning, intuitive interface designed for focus and clarity.',
                                color: 'text-pink-500 bg-pink-500/10'
                            },
                            {
                                icon: BarChart3,
                                title: 'Advanced Analytics',
                                desc: 'Gain insights into your team\'s performance with detailed charts.',
                                color: 'text-green-500 bg-green-500/10'
                            },
                            {
                                icon: Users,
                                title: 'Team Collaboration',
                                desc: 'Work together seamlessly with shared workspaces and real-time sync.',
                                color: 'text-blue-500 bg-blue-500/10'
                            },
                            {
                                icon: Lock,
                                title: 'Privacy First',
                                desc: 'Your data is yours. We prioritize user privacy and data ownership.',
                                color: 'text-red-500 bg-red-500/10'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="bg-gradient-to-br from-primary-900 to-secondary-900 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
                            Ready to transform your workflow?
                        </h2>
                        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto relative z-10">
                            Join thousands of developers and teams who trust us with their daily tasks.
                        </p>
                        <div className="relative z-10">
                            <Link to="/register" className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-primary-900 bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg"></div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Task Manager</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        © 2024 Task Manager. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
