const About = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Storyteller</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-4">
            Storyteller is a modern web application built with React, TypeScript, and Tailwind CSS.
          </p>
          
          <p className="text-gray-600 mb-4">
            This application demonstrates the integration of various modern web technologies including:
          </p>
          
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>React 19 with TypeScript</li>
            <li>Vite for fast development and building</li>
            <li>Tailwind CSS for styling</li>
            <li>React Router for navigation</li>
            <li>Auth0 for authentication</li>
            <li>Bun as the package manager</li>
          </ul>
          
          <p className="text-gray-600">
            Feel free to explore the different features and functionality!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About