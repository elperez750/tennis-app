import { TurtleIcon as TennisBall } from "lucide-react";

const footerLinks = ["Privacy Policy", "Terms of Service", "Contact Us"];

const Footer = () => {
  return (
    <footer className="flex flex-col bg-green-800 text-white py-4 text-center mt-5">
      <div className="flex space-x-6 items-center justify-center mb-5">
        <TennisBall className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold text-white">TennisPredict</span>
      </div>

      <div className="flex space-x-6 items-center justify-center">
        {footerLinks.map((link) => (
          <li
            key={link}
            className="text-lg font-semibold list-none hover:text-yellow-400 cursor-pointer"
          >
            {link}
          </li>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
