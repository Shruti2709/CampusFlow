import { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../services/authService";


export default function Register() {

  const navigate = useNavigate();

  const [showPassword,setShowPassword] = useState(false);

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:"student"
  });


  const roleOptions = [
    { value:"student", label:"Student" },
    { value:"recruiter", label:"Recruiter" },
    { value:"admin", label:"Campus Admin" },
  ];


  const [loading,setLoading] = useState(false);



  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);


      await register(formData);


      toast.success(
        "Registration successful"
      );


      navigate("/login");


    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }finally{

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl max-w-6xl w-full">


        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 to-blue-600 text-white p-14">

          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={42}/>
            <h1 className="text-4xl font-bold">
              CampusFlow
            </h1>
          </div>


          <h2 className="text-5xl font-bold leading-tight">
            Join CampusFlow
          </h2>


          <p className="mt-6 text-lg text-blue-100">
            Create your account and manage placements efficiently.
          </p>

        </div>




        <div className="p-10 lg:p-14">


          <h2 className="text-3xl font-bold">
            Create Account
          </h2>


          <p className="text-gray-500 mt-2 mb-8">
            Register to continue.
          </p>



          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            <div>

              <label className="font-medium">
                Full Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter full name"
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>



            <div>

              <label className="font-medium">
                Email
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>




            <div>

              <label className="font-medium">
                Password
              </label>


              <div className="relative mt-2">

                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  placeholder="Enter password"
                  className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-600"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3"
                >

                  {
                    showPassword
                    ?
                    <EyeOff size={20}/>
                    :
                    <Eye size={20}/>
                  }

                </button>

              </div>

            </div>


            <div>

              <label className="font-medium">
                I am registering as
              </label>

              <div className="mt-2 grid grid-cols-3 gap-3">

                {
                  roleOptions.map((option)=>(

                    <button
                      key={option.value}
                      type="button"
                      onClick={()=>setFormData({
                        ...formData,
                        role:option.value
                      })}
                      className={
                        `border rounded-xl px-3 py-3 font-medium transition ${
                          formData.role === option.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-600 hover:border-blue-400"
                        }`
                      }
                    >
                      {option.label}
                    </button>

                  ))
                }

              </div>

            </div>





            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >

              {
                loading
                ?
                "Creating..."
                :
                "Register"
              }

            </button>


          </form>





          <p className="text-center mt-8 text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>



        </div>

      </div>

    </div>

  );

}