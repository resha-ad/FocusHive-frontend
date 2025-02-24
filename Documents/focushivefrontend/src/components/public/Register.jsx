import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import '../../styles/login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [error, setError] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            login(response.data.token);
            navigate('/calendar');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    const images = [
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80'
    ];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container">
                <div className="split image-section">
                    <ImageSlider images={images} />
                </div>
                <div className="split form-section">
                    <div className="form-container">
                        <div className="logo">
                            <h1>Join Focus Hive</h1>
                            <p>Small steps, big wins</p>
                        </div>
                        {error && <div className="error-message text-red-500 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="terms">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="agreeToTerms">
                                    I agree to the{' '}
                                    <button
                                        type="button"
                                        onClick={() => setShowTerms(true)}
                                        className="text-[#7A958F] hover:underline"
                                    >
                                        terms and conditions
                                    </button>
                                </label>
                            </div>
                            <button type="submit" className="btn" disabled={!formData.agreeToTerms}>
                                Sign Up
                            </button>
                            <div className="toggle-form">
                                <Link to="/login" className="toggle-btn">
                                    Already have an account? Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions Modal */}
            {showTerms && (
                <div className="modal show">
                    <div className="modal-content">
                        <h2>Terms and Conditions</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum vitae justo tincidunt,
                            at tincidunt nisi tincidunt. Vivamus euismod, nisi vel consectetur interdum, nisl nisi tincidunt nisi,
                            nec tincidunt nisl nisi nec nisi.
                        </p>
                        <button onClick={() => setShowTerms(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ImageSlider = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useState(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-container">
            {images.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt={`Productivity ${index + 1}`}
                    className={`slider-image ${index === currentImage ? 'active' : ''}`}
                />
            ))}
            <div className="slider-controls">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`slider-dot ${index === currentImage ? 'active' : ''}`}
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Register;