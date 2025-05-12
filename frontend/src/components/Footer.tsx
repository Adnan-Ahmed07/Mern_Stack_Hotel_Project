// Footer.tsx
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          AdnanHotel.com
        </span>
        <span className="text-white font-bold tracking-tight flex items-center gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
          <a
            href="https://github.com/Adnan-Ahmed07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
            title="View our GitHub"
          >
            <FaGithub size={24} />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
