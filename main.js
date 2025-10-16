// Application State
const state = {
    currentView: 'home',
    isAuthenticated: false,
    currentUser: null,
    userType: null,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    queue: {
        position: 5,
        estimatedWait: 35,
        totalAhead: 4,
        totalToday: 45,
        averageWaitTime: 8
    },
    realTimeUpdates: true,
    lastUpdate: new Date()
};

// Expanded Mock Users Database
const users = {
    customers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', password: 'customer123', joinDate: '2024-01-15', totalVisits: 12, loyalty: 'Gold' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 987-6543', password: 'customer456', joinDate: '2024-03-20', totalVisits: 8, loyalty: 'Silver' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '+1 (555) 456-7890', password: 'customer789', joinDate: '2024-02-10', totalVisits: 15, loyalty: 'Platinum' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 321-0987', password: 'customer321', joinDate: '2024-04-05', totalVisits: 6, loyalty: 'Bronze' }
    ],
    barbers: [
        { id: 1, name: 'Mike Rodriguez', email: 'mike@elitebarber.com', password: 'barber123', specialties: ['Classic Cuts', 'Beard Trimming', 'Hot Towel Shaves'], experience: '8 years', rating: 4.8, completedToday: 12, totalRevenue: 340, workingHours: '9:00 AM - 6:00 PM', bio: 'Master barber with expertise in traditional and modern styles' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@elitebarber.com', password: 'barber456', specialties: ['Modern Styles', 'Hair Coloring', 'Styling'], experience: '5 years', rating: 4.9, completedToday: 8, totalRevenue: 290, workingHours: '10:00 AM - 7:00 PM', bio: 'Creative stylist specializing in contemporary looks' },
        { id: 3, name: 'David Chen', email: 'david@elitebarber.com', password: 'barber789', specialties: ['Fade Cuts', 'Beard Sculpting', 'Hair Designs'], experience: '6 years', rating: 4.7, completedToday: 10, totalRevenue: 315, workingHours: '8:00 AM - 5:00 PM', bio: 'Precision specialist in modern fade techniques' }
    ]
};

// Enhanced Services with more details
const services = [
    { id: 1, name: 'Classic Haircut', description: 'Traditional scissor cut with professional styling and finishing', price: 28, duration: 30, icon: '✂️', popular: true },
    { id: 2, name: 'Beard Trim', description: 'Professional beard shaping, trimming and grooming', price: 18, duration: 20, icon: '🧔', popular: true },
    { id: 3, name: 'Hair Wash & Style', description: 'Luxury shampoo, conditioning and professional styling', price: 22, duration: 25, icon: '🧴', popular: false },
    { id: 4, name: 'Full Service', description: 'Complete grooming package - haircut, beard trim, and styling', price: 48, duration: 60, icon: '⭐', popular: true },
    { id: 5, name: 'Hot Towel Shave', description: 'Traditional straight razor shave with hot towel treatment', price: 35, duration: 45, icon: '🪒', popular: false },
    { id: 6, name: 'Kids Cut', description: 'Fun and gentle haircut for children under 12', price: 20, duration: 20, icon: '👶', popular: true },
    { id: 7, name: 'Fade Cut', description: 'Modern fade haircut with precision blending', price: 32, duration: 40, icon: '🔥', popular: true },
    { id: 8, name: 'Hair Design', description: 'Creative hair patterns and designs', price: 40, duration: 50, icon: '🎨', popular: false }
];

// Expanded Appointments with more realistic data for the dashboard
const appointments = [
    // Appointments for Mike Rodriguez (barberId: 1) on 2025-01-15
    { id: 1, customerId: 1, customerName: 'John Doe', service: 'Classic Haircut', date: '2025-01-15', time: '10:00 AM', status: 'completed', barber: 'Mike Rodriguez', barberId: 1, estimatedDuration: 30 },
    { id: 3, customerId: 3, customerName: 'Michael Johnson', service: 'Full Service', date: '2025-01-15', time: '11:00 AM', status: 'confirmed', barber: 'Mike Rodriguez', barberId: 1, estimatedDuration: 60 },
    { id: 8, customerId: 4, customerName: 'Emily Davis', service: 'Beard Trim', date: '2025-01-15', time: '1:00 PM', status: 'confirmed', barber: 'Mike Rodriguez', barberId: 1, estimatedDuration: 20 },

    // Appointments for Sarah Williams (barberId: 2) on 2025-01-15
    { id: 2, customerId: 2, customerName: 'Jane Smith', service: 'Hair Wash & Style', date: '2025-01-15', time: '10:30 AM', status: 'completed', barber: 'Sarah Williams', barberId: 2, estimatedDuration: 25 },
    { id: 4, customerId: 4, customerName: 'Emily Davis', service: 'Kids Cut', date: '2025-01-15', time: '11:30 AM', status: 'in-progress', barber: 'Sarah Williams', barberId: 2, estimatedDuration: 20 },
    { id: 9, customerId: 1, customerName: 'John Doe', service: 'Fade Cut', date: '2025-01-15', time: '12:30 PM', status: 'confirmed', barber: 'Sarah Williams', barberId: 2, estimatedDuration: 40 },

    // Appointments for David Chen (barberId: 3) on 2025-01-15
    { id: 5, customerId: 1, customerName: 'John Doe', service: 'Beard Trim', date: '2025-01-15', time: '2:00 PM', status: 'completed', barber: 'David Chen', barberId: 3, estimatedDuration: 20 },
    { id: 10, customerId: 2, customerName: 'Jane Smith', service: 'Hair Design', date: '2025-01-15', time: '3:00 PM', status: 'confirmed', barber: 'David Chen', barberId: 3, estimatedDuration: 50 },

    // Appointments for other dates
    { id: 6, customerId: 2, customerName: 'Jane Smith', service: 'Hot Towel Shave', date: '2025-01-16', time: '9:00 AM', status: 'confirmed', barber: 'Mike Rodriguez', barberId: 1, estimatedDuration: 45 },
    { id: 7, customerId: 3, customerName: 'Michael Johnson', service: 'Fade Cut', date: '2025-01-16', time: '10:00 AM', status: 'confirmed', barber: 'David Chen', barberId: 3, estimatedDuration: 40 }
];

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
            slots.push(time);
        }
    }
    return slots;
};

const timeSlots = generateTimeSlots();
const getBookedSlots = (date) => appointments.filter(apt => apt.date === date).map(apt => apt.time);

// UI Notification System
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function showConfirmation(message, onConfirm) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <h3>Confirmation</h3>
            <p>${message}</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
                <button class="btn btn-danger" id="confirmBtn">Confirm</button>
            </div>
        </div>`;
    document.body.appendChild(modalOverlay);
    const close = () => {
        modalOverlay.classList.remove('show');
        setTimeout(() => modalOverlay.remove(), 300);
    };
    modalOverlay.querySelector('#confirmBtn').onclick = () => { onConfirm(); close(); };
    modalOverlay.querySelector('#cancelBtn').onclick = close;
    setTimeout(() => modalOverlay.classList.add('show'), 10);
}

// Real-time update simulation
let updateInterval;
function simulateUpdate() {
    if (state.realTimeUpdates && state.isAuthenticated) {
        // This logic ensures that for the demo, the queue position doesn't drop below 3 (2 people ahead).
        if (Math.random() < 0.4 && state.queue.position > 3) {
            state.queue.position--;
            state.queue.totalAhead--;
            state.queue.estimatedWait = Math.max(0, state.queue.estimatedWait - state.queue.averageWaitTime);
            showToast('Queue Updated: You moved forward!', 'info');
        }
        if (Math.random() < 0.2) {
            const pending = appointments.find(apt => apt.status === 'pending');
            if (pending) {
                pending.status = 'confirmed';
                showToast(`Appointment for ${pending.customerName} confirmed!`, 'success');
            }
        }
        state.lastUpdate = new Date();
        if (['queue', 'dashboard'].includes(state.currentView)) render();
    }
}
function startRealTimeUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(simulateUpdate, 8000);
}
function manualRefresh() {
    showToast('🔄 Refreshing data...', 'info');
    simulateUpdate();
    render();
}

// Authentication & Routing
function login(email, password, userType) {
    const userDb = users[userType === 'customer' ? 'customers' : 'barbers'];
    const user = userDb.find(u => u.email === email && u.password === password);
    if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
        state.userType = userType;
        state.currentView = userType === 'customer' ? 'home' : 'dashboard';
        startRealTimeUpdates();
        render();
        showToast(`Welcome back, ${user.name}!`, 'success');
        return true;
    }
    return false;
}
function logout() {
    state.isAuthenticated = false;
    state.currentUser = null;
    state.userType = null;
    state.currentView = 'home';
    if (updateInterval) clearInterval(updateInterval);
    render();
}
function register(userData, userType) {
    const userDb = users[userType === 'customer' ? 'customers' : 'barbers'];
    if (userDb.some(u => u.email === userData.email)) return false;
    const newUser = { id: userDb.length + 1, ...userData, joinDate: new Date().toISOString().split('T')[0] };
    if (userType === 'customer') {
        Object.assign(newUser, { totalVisits: 0, loyalty: 'Bronze' });
    } else {
        Object.assign(newUser, { completedToday: 0, totalRevenue: 0, rating: 5.0, workingHours: '9:00 AM - 6:00 PM' });
    }
    userDb.push(newUser);
    return true;
}
function router(view) {
    const protectedViews = ['booking', 'queue', 'profile', 'dashboard', 'appointments', 'barber-profile'];
    if (protectedViews.includes(view) && !state.isAuthenticated) {
        state.currentView = 'login';
    } else {
        state.currentView = view;
    }
    render();
}

// Utility Functions
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
function generateCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const calendar = [];
    for (let i = 0; i < startingDayOfWeek; i++) calendar.push({ day: '', disabled: true });
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isToday = date.toDateString() === today.toDateString();
        calendar.push({ day, date: date.toISOString().split('T')[0], disabled: date < today && !isToday, isToday });
    }
    return { calendar, days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], monthName: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
}

// Component Renders
function renderHeader() {
    if (!state.isAuthenticated) {
        return `
            <header class="header">
                <div class="header-content">
                    <div class="logo"><span>✂️</span> TrimTime</div>
                    <div class="nav-buttons">
                        <button class="nav-btn ${state.currentView === 'home' ? 'active' : ''}" onclick="router('home')">Home</button>
                        <button class="nav-btn" onclick="router('login')">Services</button>
                        <button class="nav-btn" onclick="router('login')">Book</button>
                        <button class="nav-btn" onclick="showToast('Contact us at contact@trimtime.com', 'info')">Contact</button>
                        <button class="nav-btn" onclick="router('login')">Login</button>
                    </div>
                </div>
            </header>`;
    }
    const isBarber = state.userType === 'barber';
    return `
        <header class="header">
            <div class="header-content">
                <div class="logo"><span>${isBarber ? '👨‍💼' : '✂️'}</span> TrimTime</div>
                <div class="nav-buttons">
                    ${!isBarber ? `
                        <button class="nav-btn ${state.currentView === 'home' ? 'active' : ''}" onclick="router('home')">Home</button>
                        <button class="nav-btn ${state.currentView === 'booking' ? 'active' : ''}" onclick="router('booking')">Book</button>
                        <button class="nav-btn ${state.currentView === 'queue' ? 'active' : ''}" onclick="router('queue')">Queue</button>
                        <button class="nav-btn ${state.currentView === 'profile' ? 'active' : ''}" onclick="router('profile')">Profile</button>
                    ` : `
                        <button class="nav-btn ${state.currentView === 'dashboard' ? 'active' : ''}" onclick="router('dashboard')">Dashboard</button>
                        <button class="nav-btn ${state.currentView === 'appointments' ? 'active' : ''}" onclick="router('appointments')">Appointments</button>
                        <button class="nav-btn ${state.currentView === 'barber-profile' ? 'active' : ''}" onclick="router('barber-profile')">Profile</button>
                    `}
                    <button class="nav-btn refresh-btn" onclick="manualRefresh()" title="Refresh Data">🔄</button>
                    <button class="nav-btn" onclick="logout()">Logout</button>
                </div>
            </div>
        </header>`;
}

function renderFooter() {
    return `
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-column">
                <h4><span>✂️</span> TrimTime</h4>
                <p>Style is a reflection of your attitude and personality. Let us help you express yourself.</p>
            </div>
            <div class="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#" onclick="router('home')">Home</a></li>
                    <li><a href="#" onclick="router('login')">Services</a></li>
                    <li><a href="#" onclick="router('login')">Book Now</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Contact Us</h4>
                <p>123 Barber Street, Style City, 10101</p>
                <p>Email: <a href="mailto:contact@trimtime.com">contact@trimtime.com</a></p>
                <p>Phone: (555) 123-4567</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} TrimTime. All Rights Reserved.</p>
        </div>
    </footer>`;
}

function renderPublicHome() {
    return `
    <div class="main-content">
        <div class="home-screen fade-in">
            <div class="hero-section">
                <h1>Style is a reflection of your attitude and your personality.</h1>
                <p>Experience the finest in men's grooming with our expert barbers. Precision, style, and a premium experience await you.</p>
                <button class="cta-button" onclick="router('login')">Book Your Appointment</button>
            </div>
            <h2 style="text-align:center; font-size: 2.5rem; margin-bottom: 2rem;">Why Choose Us?</h2>
            <div class="features">
                <div class="feature-card"><div class="feature-icon">⭐</div><h3>Expert Barbers</h3><p>Our team consists of highly skilled, passionate barbers dedicated to their craft.</p></div>
                <div class="feature-card"><div class="feature-icon">🌿</div><h3>Quality Services</h3><p>We use only premium products and techniques to ensure you look and feel your best.</p></div>
                <div class="feature-card"><div class="feature-icon">💰</div><h3>Fair Prices</h3><p>Get a premium experience without the premium price tag. Quality grooming is for everyone.</p></div>
            </div>
        </div>
    </div>`;
}

function renderLogin() {
    return `
        <div class="main-content">
            <div class="login-screen fade-in">
                <div class="login-container">
                    <div class="login-header">
                        <h2>Welcome to TrimTime</h2>
                        <p>Your premium grooming experience awaits</p>
                    </div>
                    <div class="login-tabs">
                        <button class="tab-btn active" onclick="switchLoginTab('customer', this)">Customer</button>
                        <button class="tab-btn" onclick="switchLoginTab('barber', this)">Barber</button>
                    </div>
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <div class="form-group"><label for="email">Email Address</label><input type="email" id="email" name="email" required placeholder="Enter your email"></div>
                        <div class="form-group"><label for="password">Password</label><input type="password" id="password" name="password" required placeholder="Enter your password"></div>
                        <button type="submit" class="btn btn-primary" style="width:100%">Sign In</button>
                    </form>
                    <p class="text-center mt-2">Don't have an account? <a href="#" onclick="router('register')">Register here</a></p>
                    <div class="demo-credentials">
                        <h4>🔑 Demo Credentials</h4>
                        <div class="demo-section"><strong>👤 Customer:</strong> john@example.com / customer123</div>
                        <div class="demo-section"><strong>👨‍💼 Barber:</strong> mike@elitebarber.com / barber123</div>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderRegister() {
    return `
        <div class="main-content">
            <div class="register-screen fade-in">
                <div class="register-container">
                    <div class="register-header"><h2>Join TrimTime</h2><p>Create your account and start your journey</p></div>
                    <div class="register-tabs">
                        <button class="tab-btn active" onclick="switchRegisterTab('customer', this)">Customer</button>
                        <button class="tab-btn" onclick="switchRegisterTab('barber', this)">Barber</button>
                    </div>
                    <form id="registerForm" onsubmit="handleRegister(event)">
                        <div class="form-group"><label for="regName">Full Name</label><input type="text" id="regName" name="name" required></div>
                        <div class="form-group"><label for="regEmail">Email Address</label><input type="email" id="regEmail" name="email" required></div>
                        <div class="form-group"><label for="regPhone">Phone Number</label><input type="tel" id="regPhone" name="phone" required></div>
                        <div class="form-group"><label for="regPassword">Password</label><input type="password" id="regPassword" name="password" required></div>
                        <div id="barberFields" class="hidden">
                            <div class="form-group"><label for="experience">Experience</label><input type="text" id="experience" name="experience" placeholder="e.g., 5 years"></div>
                            <div class="form-group"><label for="specialties">Specialties (comma-separated)</label><input type="text" id="specialties" name="specialties" placeholder="e.g., Fades, Beards"></div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%">Create Account</button>
                    </form>
                    <p class="text-center mt-2">Already have an account? <a href="#" onclick="router('login')">Sign in</a></p>
                </div>
            </div>
        </div>`;
}

function renderHome() {
    const upcoming = appointments.filter(a => a.customerId === state.currentUser.id && a.status === 'confirmed').length;
    return `
        <div class="main-content">
            <div class="home-screen fade-in">
                <div class="dashboard-section">
                    <h2>Welcome back, ${state.currentUser.name}! 👋</h2>
                    <p>Ready for your next premium grooming experience?</p>
                    <div class="profile-stats mt-2">
                        <div class="stat-card"><div class="stat-number">${state.currentUser.totalVisits || 0}</div><div class="stat-label">Total Visits</div></div>
                        <div class="stat-card"><div class="stat-number">${upcoming}</div><div class="stat-label">Upcoming</div></div>
                        <div class="stat-card"><div class="stat-number" style="color: var(--text-primary)">${state.currentUser.loyalty || 'Bronze'}</div><div class="stat-label">Status</div></div>
                    </div>
                     <button class="btn btn-primary" onclick="router('booking')">Book New Appointment</button>
                </div>
            </div>
        </div>`;
}

function renderBooking() {
    const { calendar, days, monthName } = generateCalendar();
    const bookedSlots = state.selectedDate ? getBookedSlots(state.selectedDate) : [];
    return `
        <div class="main-content">
            <div class="booking-screen fade-in">
                <h2>Book Your Appointment</h2>
                <div class="profile-section">
                    <h3>1. Select Service</h3>
                    <div class="service-grid">${services.map(s => `
                        <div class="service-card ${state.selectedService?.id === s.id ? 'selected' : ''}" onclick="selectService(${s.id})">
                            <div class="service-header">
                                <div class="service-name">${s.icon} ${s.name}</div>
                                <div class="service-price">$${s.price}</div>
                            </div>
                            <p class="service-description">${s.description}</p>
                            <div class="service-duration">⏱️ ${s.duration} min ${s.popular ? '<span style="color:var(--accent-color);font-weight:bold;margin-left:1rem;">🔥 Popular</span>' : ''}</div>
                        </div>`).join('')}
                    </div>
                </div>
                ${state.selectedService ? `
                    <div class="profile-section">
                        <h3>2. Choose Date & Time</h3>
                        <div class="datetime-container">
                            <div class="calendar-container">
                                <h4>📅 ${monthName}</h4>
                                <div class="calendar-header">${days.map(d => `<div class="calendar-day">${d}</div>`).join('')}</div>
                                <div class="calendar">${calendar.map(c => `<div class="calendar-date ${c.disabled ? 'disabled' : ''} ${state.selectedDate === c.date ? 'selected' : ''}" onclick="${c.disabled ? '' : `selectDate('${c.date}')`}">${c.day}</div>`).join('')}</div>
                            </div>
                            <div class="time-slots-container">
                                <h4>⏰ Available Times</h4>
                                ${state.selectedDate ? `<div class="time-slots">${timeSlots.map(t => `<div class="time-slot ${bookedSlots.includes(t) ? 'booked' : ''} ${state.selectedTime === t ? 'selected' : ''}" onclick="${bookedSlots.includes(t) ? '' : `selectTime('${t}')`}">${t}</div>`).join('')}</div>` : `<p class="text-center mt-2">Please select a date.</p>`}
                            </div>
                        </div>
                    </div>` : ''}
                ${state.selectedService && state.selectedDate && state.selectedTime ? `
                    <div class="profile-section">
                        <h3>3. Confirm Booking</h3>
                        <div>
                            <p><strong>Service:</strong> ${state.selectedService.name}</p>
                            <p><strong>Date:</strong> ${formatDate(state.selectedDate)}</p>
                            <p><strong>Time:</strong> ${state.selectedTime}</p>
                            <p><strong>Price:</strong> $${state.selectedService.price}</p>
                            <button class="btn btn-primary mt-2" onclick="confirmBooking()" style="width:100%">✅ Confirm Booking</button>
                        </div>
                    </div>` : ''}
            </div>
        </div>`;
}

function renderQueue() {
    const progress = state.queue.totalToday > 0 ? Math.min(100, ((state.queue.totalToday - state.queue.totalAhead) / state.queue.totalToday) * 100) : 0;
    return `
        <div class="main-content">
            <div class="queue-screen fade-in">
                <h2>Live Queue Status</h2>
                <div class="queue-status">
                    <div class="text-center">
                        <h3>🎯 Your Position in Queue</h3>
                        <div class="queue-info">
                            <div class="queue-stat"><div class="queue-number">${state.queue.position}</div><div class="queue-label">Your Position</div></div>
                            <div class="queue-stat"><div class="queue-number">${state.queue.totalAhead}</div><div class="queue-label">People Ahead</div></div>
                            <div class="queue-stat"><div class="queue-number">${state.queue.estimatedWait}</div><div class="queue-label">Wait Time (min)</div></div>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${progress}%"></div></div>
                        <p class="mt-2">🚀 Progress: ${Math.round(progress)}%</p>
                        <p class="text-secondary" style="font-size:0.9rem">Last updated: ${state.lastUpdate.toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderProfile() {
    const userApts = appointments.filter(a => a.customerId === state.currentUser.id);
    return `
        <div class="main-content">
            <div class="profile-screen fade-in">
                <div class="profile-section">
                    <div class="profile-header">
                        <div class="profile-avatar">${state.currentUser.name.charAt(0)}</div>
                        <div>
                            <h2>${state.currentUser.name}</h2>
                            <p>${state.currentUser.email} | ${state.currentUser.phone}</p>
                            <p>🏆 ${state.currentUser.loyalty} Member since ${new Date(state.currentUser.joinDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="profile-actions">
                        <button class="btn btn-primary" onclick="showToast('Edit profile feature coming soon!', 'info')">✏️ Edit Profile</button>
                        <button class="btn btn-secondary" onclick="router('booking')">📅 New Appointment</button>
                    </div>
                </div>
                <div class="profile-section">
                    <h3>📋 Your Appointments</h3>
                    <div>${userApts.length ? userApts.map(apt => `
                        <div class="appointment-card">
                            <div class="appointment-header">
                                <div><strong>${apt.service}</strong><p>📅 ${formatDate(apt.date)} at ${apt.time} with ${apt.barber}</p></div>
                                <div class="appointment-status status-${apt.status}">${apt.status}</div>
                            </div>
                            ${apt.status === 'confirmed' ? `<div class="appointment-actions"><button class="btn btn-danger" onclick="cancelAppointment(${apt.id})">❌ Cancel</button></div>` : ''}
                        </div>`).join('') : '<p>No appointments found.</p>'}
                    </div>
                </div>
            </div>
        </div>`;
}

function renderBarberProfile() {
    const barberApts = appointments.filter(a => a.barberId === state.currentUser.id);
    return `
        <div class="main-content">
            <div class="profile-screen fade-in">
                <div class="profile-section">
                    <div class="profile-header">
                        <div class="profile-avatar">${state.currentUser.name.charAt(0)}</div>
                        <div>
                            <h2>${state.currentUser.name}</h2>
                            <p>⭐ ${state.currentUser.rating}/5.0 | 📅 ${state.currentUser.experience} experience</p>
                            <p>🕐 ${state.currentUser.workingHours}</p>
                        </div>
                    </div>
                    <div class="profile-actions">
                        <button class="btn btn-primary" onclick="showToast('Edit profile feature coming soon!', 'info')">✏️ Edit Profile</button>
                    </div>
                </div>
                <div class="profile-section">
                    <h3>🎯 Specialties</h3>
                    <div class="specialties-list">${state.currentUser.specialties?.map(s => `<span class="specialty-tag">${s}</span>`).join('') || '<p>No specialties listed.</p>'}</div>
                </div>
            </div>
        </div>`;
}

function renderDashboard() {
    // For demo purposes, "today" is fixed to a date with appointments to ensure the dashboard is populated.
    const today = '2025-01-15';
    const todayApts = appointments.filter(a => a.date === today && a.barberId === state.currentUser.id);
    const revenue = todayApts.filter(a => a.status === 'completed').reduce((sum, apt) => sum + (services.find(s => s.name === apt.service)?.price || 0), 0);
    return `
        <div class="main-content">
            <div class="dashboard-screen fade-in">
                <div class="dashboard-section">
                    <h2>📊 Today's Dashboard for ${state.currentUser.name}</h2>
                    <div class="queue-info">
                        <div class="queue-stat"><div class="queue-number">${todayApts.length}</div><div class="queue-label">Total</div></div>
                        <div class="queue-stat"><div class="queue-number">${todayApts.filter(a => a.status === 'completed').length}</div><div class="queue-label">Completed</div></div>
                        <div class="queue-stat"><div class="queue-number">${todayApts.filter(a => ['confirmed', 'in-progress'].includes(a.status)).length}</div><div class="queue-label">Upcoming</div></div>
                        <div class="queue-stat"><div class="queue-number">$${revenue}</div><div class="queue-label">Revenue</div></div>
                    </div>
                </div>
                <div class="dashboard-section">
                    <h3>📅 Today's Schedule</h3>
                    <div>${todayApts.length ? todayApts.map(apt => `
                        <div class="appointment-card">
                            <div class="appointment-header">
                                <div><strong>${apt.service}</strong> for ${apt.customerName}<p>⏰ ${apt.time} (${apt.estimatedDuration} min)</p></div>
                                <div class="appointment-status status-${apt.status}">${apt.status}</div>
                            </div>
                            ${apt.status === 'confirmed' ? `<div class="appointment-actions"><button class="btn btn-primary" onclick="markCompleted(${apt.id})">✅ Complete</button></div>` : ''}
                        </div>`).join('') : '<p>No appointments for today.</p>'}
                    </div>
                </div>
            </div>
        </div>`;
}

function renderBarberAppointments() {
    const barberApts = appointments.filter(a => a.barberId === state.currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    return `
        <div class="main-content">
            <div class="dashboard-screen fade-in">
                <div class="dashboard-section">
                    <h2>🗓️ All Your Appointments</h2>
                    <p>Here is a complete list of your scheduled and past appointments.</p>
                </div>
                <div class="dashboard-section">
                    <div>${barberApts.length ? barberApts.map(apt => `
                        <div class="appointment-card">
                            <div class="appointment-header">
                                <div>
                                    <strong>${apt.service}</strong> for ${apt.customerName}
                                    <p>📅 ${formatDate(apt.date)} at ${apt.time}</p>
                                </div>
                                <div class="appointment-status status-${apt.status}">${apt.status}</div>
                            </div>
                            <div class="appointment-actions">
                                ${apt.status === 'confirmed' ? `<button class="btn btn-primary" onclick="markCompleted(${apt.id})">✅ Complete</button>` : ''}
                                ${apt.status === 'in-progress' ? `<button class="btn btn-primary" onclick="markCompleted(${apt.id})">✅ Complete</button>` : ''}
                                ${apt.status === 'completed' ? `<p style="color:var(--success-color)">✓ Completed</p>` : ''}
                            </div>
                        </div>`).join('') : '<p>No appointments found.</p>'}
                    </div>
                </div>
            </div>
        </div>`;
}

// Event Handlers
function switchLoginTab(type, el) {
    document.querySelectorAll('.login-tabs .tab-btn').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('loginForm').dataset.type = type;
}
function switchRegisterTab(type, el) {
    document.querySelectorAll('.register-tabs .tab-btn').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('barberFields').classList.toggle('hidden', type !== 'barber');
    document.getElementById('registerForm').dataset.type = type;
}
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    if (!login(form.email.value, form.password.value, form.dataset.type || 'customer')) {
        showToast('❌ Invalid credentials. Please try again.', 'error');
    }
}
function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const userType = form.dataset.type || 'customer';
    const userData = { name: form.name.value, email: form.email.value, phone: form.phone.value, password: form.password.value };
    if (userType === 'barber') {
        userData.experience = form.experience.value;
        userData.specialties = form.specialties.value.split(',').map(s => s.trim());
    }
    if (register(userData, userType)) {
        showToast('✅ Registration successful! Please login.', 'success');
        router('login');
    } else {
        showToast('❌ Email already exists.', 'error');
    }
}
function selectService(id) { state.selectedService = services.find(s => s.id === id); render(); }
function selectDate(date) { state.selectedDate = date; state.selectedTime = null; render(); }
function selectTime(time) { state.selectedTime = time; render(); }
function confirmBooking() {
    appointments.push({
        id: appointments.length + 1, customerId: state.currentUser.id, customerName: state.currentUser.name,
        service: state.selectedService.name, date: state.selectedDate, time: state.selectedTime, status: 'confirmed',
        barber: users.barbers[0].name, barberId: 1, estimatedDuration: state.selectedService.duration
    });
    state.currentUser.totalVisits++;
    state.selectedService = state.selectedDate = state.selectedTime = null;
    showToast('✅ Appointment booked successfully!', 'success');
    router('profile');
}
function markCompleted(id) {
    const apt = appointments.find(a => a.id === id);
    if (apt) {
        apt.status = 'completed';
        showToast('✅ Appointment marked as completed!', 'success');
        render();
    }
}
function cancelAppointment(id) {
    showConfirmation('Are you sure you want to cancel this appointment?', () => {
        const index = appointments.findIndex(a => a.id === id);
        if (index > -1) {
            appointments.splice(index, 1);
            showToast('❌ Appointment cancelled.', 'info');
            render();
        }
    });
}
function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
}

// Main Render Function
function render() {
    const app = document.getElementById('app');
    if (!app) return;
    hideLoading();
    
    let content = renderHeader();
    const viewMap = {
        home: state.isAuthenticated ? renderHome : renderPublicHome,
        login: renderLogin,
        register: renderRegister,
        booking: renderBooking,
        queue: renderQueue,
        profile: renderProfile,
        dashboard: renderDashboard,
        appointments: renderBarberAppointments,
        'barber-profile': renderBarberProfile,
    };
    
    const viewRenderer = viewMap[state.currentView] || (state.isAuthenticated ? renderHome : renderPublicHome);
    content += viewRenderer();
    content += renderFooter();
    app.innerHTML = content;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        render();
    }, 1500);
});

// Expose functions to global scope
Object.assign(window, {
    router, logout, handleLogin, handleRegister, switchLoginTab, switchRegisterTab,
    selectService, selectDate, selectTime, confirmBooking,
    markCompleted, cancelAppointment, manualRefresh, showToast
});
