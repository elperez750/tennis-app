import { TurtleIcon as TennisBall } from "lucide-react";


const Navbar = () => {
  return (
       <header className="bg-white shadow-md">
        <div className="max-w-7xl h-28 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <TennisBall className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">TennisPredict</span>
          </div>
          

        
        </div>
      </header>
  )
}

export default Navbar
