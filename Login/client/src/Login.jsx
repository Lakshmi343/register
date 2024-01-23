import React from 'react'

const Login = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate=useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Use axios.post as a promise to handle the response
        const response = await axios.post('http://localhost:3001/login', { email, password });
        console.log('Result:', response.data);
        
        if (result.data==="success") {
            navigate("/home")
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
           
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <p>Already have an Account</p>
            <Link to="/login">
              <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
  
  )
}

export default Login