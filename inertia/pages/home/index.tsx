export default function Home() {
  return (
    <>
      <div className="bg-blue-100 p-4">
        <h2 className="text-blue-500">Monochromatic Example</h2>
        <button className="bg-blue-300 text-white p-2 rounded">Button</button>
      </div>


      <div className="bg-blue-500 p-4 text-white">
        <h2>Complementary Example</h2>
        <button className="bg-orange-500 text-white p-2 rounded">Button</button>
      </div>


      <div className="bg-green-400 p-4">
        <h2 className="text-green-600">Analogous Example</h2>
        <button className="bg-green-500 text-white p-2 rounded">Button</button>
      </div>


      <div className="bg-blue-500 p-4 text-white">
        <h2>Triadic Example</h2>
        <button className="bg-red-500 text-white p-2 rounded">Red Button</button>
        <button className="bg-yellow-500 text-black p-2 rounded">Yellow Button</button>
      </div>


      <div className="bg-gray-100 p-4">
        <h2 className="text-gray-700">Neutral Example</h2>
        <button className="bg-blue-500 text-white p-2 rounded">Button</button>
      </div>

      <hr />

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-blue-500">Study Hub</h1>
        <p className="text-gray-700">Your one-stop solution for learning resources.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Explore Courses
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-green-500">Study Corner</h1>
        <p className="text-gray-800">Find the best resources to enhance your learning experience.</p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Start Learning
        </button>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-purple-500">Learning Portal</h1>
        <p className="text-gray-900">Unlock your potential with our diverse courses.</p>
        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          View Courses
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-teal-500">Knowledge Base</h1>
        <p className="text-gray-800">Dive into a wealth of knowledge at your fingertips.</p>
        <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Start Exploring
        </button>
      </div>

      <div style={{ backgroundColor: '#005B5C' }} className="p-6 rounded-lg shadow-lg">
        <h1 style={{ color: '#007BFF' }} className="text-3xl">Discover Nepal</h1>
        <p style={{ color: '#7C4D3A' }}>
          Experience the majestic landscapes and vibrant culture of Nepal.
        </p>
        <button
          style={{ backgroundColor: '#FF7043', color: '#FFFFFF' }}
          className="mt-4 px-4 py-2 rounded hover:bg-[#D32F2F]"
        >
          Explore More
        </button>
        <p style={{ color: '#FFD600' }} className="mt-2">
          Join us in celebrating our rich heritage!
        </p>
      </div>

      <div className="bg-softGray p-6 rounded-lg shadow-lg">
        <h1 style={{ color: '#007BFF' }} className="text-3xl">30 Days of React Challenge</h1>
        <p style={{ color: '#343A40' }}>
          Join us in this exciting journey to master React!
        </p>
        <button
          style={{ backgroundColor: '#28A745', color: '#FFFFFF' }}
          className="mt-4 px-4 py-2 rounded hover:bg-green-700"
        >
          Join the Challenge
        </button>
        <div className="mt-6">
          <h2 className="text-2xl" style={{ color: '#FFC107' }}>Q&A Forum</h2>
          <p style={{ color: '#343A40' }}>
            Have questions? Ask the community and get answers!
          </p>
          <button
            style={{ backgroundColor: '#DC3545', color: '#FFFFFF' }}
            className="mt-2 px-4 py-2 rounded hover:bg-red-700"
          >
            Ask a Question
          </button>
        </div>
      </div>
    </>
  )
}
