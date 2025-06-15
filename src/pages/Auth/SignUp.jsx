import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //handle sign up form
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImegeUrl="";
    if(!fullName){
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    // If profilePicture is selected, upload it and get the URL
    //signUp api call
    
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>


<ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture}/>

          <div className="grid grid-coles-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johndoe@gmail.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="*********"
                type="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>
          )}
          <button type="submit" className="btn-primary">
           SIGN UP
          </button>
          <p className="text-[13px] text-slate-700 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Log in 
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
