import { Book, Target, Users, Award } from 'lucide-react';

export default function About() {
    return (
        <div className="container">
            <div className="page-header">
                <h1>About Task Manager</h1>
                <p className="subtitle">Efficient task management made simple</p>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        We&apos;re dedicated to helping individuals and teams organize their work efficiently.
                        Our task management platform is designed with simplicity and productivity in mind.
                    </p>
                </section>

                <div className="features-grid">
                    <div className="feature-card">
                        <Book className="feature-icon" />
                        <h3>Easy to Use</h3>
                        <p>Intuitive interface that anyone can master</p>
                    </div>

                    <div className="feature-card">
                        <Target className="feature-icon" />
                        <h3>Goal Oriented</h3>
                        <p>Track progress and achieve your objectives</p>
                    </div>

                    <div className="feature-card">
                        <Users className="feature-icon" />
                        <h3>Collaborative</h3>
                        <p>Work together seamlessly with your team</p>
                    </div>

                    <div className="feature-card">
                        <Award className="feature-icon" />
                        <h3>Achieve More</h3>
                        <p>Boost productivity and reach your goals</p>
                    </div>
                </div>

                <section className="about-section">
                    <h2>Why Choose Us?</h2>
                    <ul className="benefits-list">
                        <li>Simple and intuitive task creation</li>
                        <li>Powerful organization with categories and tags</li>
                        <li>Priority management to focus on what matters</li>
                        <li>Secure and reliable platform</li>
                        <li>Regular updates and improvements</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
