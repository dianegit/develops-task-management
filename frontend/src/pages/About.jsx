import { Navbar } from '../components/Navbar';
import { Users, Globe, Heart, Award } from 'lucide-react';

export const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
                        We're building the future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            work management
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-in">
                        Our mission is to empower teams to achieve more with less friction.
                        We believe in simplicity, security, and speed.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Active Users', value: '10k+' },
                        { label: 'Tasks Completed', value: '1M+' },
                        { label: 'Countries', value: '50+' },
                        { label: 'Team Members', value: '25+' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Users, title: 'User First', desc: 'We obsess over user experience and feedback.' },
                        { icon: Globe, title: 'Global Mindset', desc: 'Building for teams across every time zone.' },
                        { icon: Heart, title: 'Passion', desc: 'We love what we do and it shows in our product.' },
                        { icon: Award, title: 'Excellence', desc: 'We strive for perfection in every pixel.' }
                    ].map((value, index) => (
                        <div key={index} className="card hover-lift text-center">
                            <div className="inline-flex p-4 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-6 text-blue-600 dark:text-blue-400">
                                <value.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
