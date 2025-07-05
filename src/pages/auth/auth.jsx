import Navbar from "../../component/home/navBar"
import SignUpForm from "../Home/signUpForm"
const Auth = () => {
  return (
    <>
    <Navbar/>
    <div className='h-[100vh] flex justify-between items-center'>
        <SignUpForm/>
    </div>
    </>
  )
}

export default Auth