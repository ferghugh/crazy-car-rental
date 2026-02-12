import{BrowserRouter as Router,Routes,Route}from"react-router-dom";
import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CarList from "./components/CarList";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreateAccount from "./components/CreateAccount";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Success from "./pages/Success";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


function App() {

  return (
    <Elements stripe ={stripePromise}>

    <Router>
    
      <Navbar />{/* Navbar displayed on all pages but is out of scope */}
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
          <Route path="/create-account" element={<CreateAccount />} />
         <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/success" element={<Success />} />
             
             
        
      </Routes>
      
    </Router>
    </Elements>
  );
}

export default App;
