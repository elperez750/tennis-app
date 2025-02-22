import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer"; 

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      <Navbar />
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
