// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AuthForm from './component/Authfrom';
// import Navbar from './component/Navbar';
// import LandingPage from './component/Landingpage';
// import AdminDashboard from './component/Admindash';
// import Home from './component/Home';
    

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/home" element={<Home/>} />
//                     <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                     <Route path="/auth" element={<AuthForm />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignInPage from './component/SignInPage'; 
 import SignUpPage from './component/SignUpPage';
import Navbar from './component/Navbar';
import LandingPage from './component/Landingpage';  // Make sure the path is correct
import AdminDashboard from './component/Admindash';  // Make sure the path is correct
import Home from './component/Home';  // Make sure the path is correct
import Footer from './component/Footer';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/auth/signin" element={<SignInPage />} />
                    <Route path="/auth/signup" element={<SignUpPage />} />
                </Routes>
                <Footer/>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
