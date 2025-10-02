import { useState, useEffect, useActionState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function User() {   //The Login Page

    const [visible, setVisible] = useState(false);
    const [msg, setmsg] = useState();
    const [redmsg, setredmsg] = useState();
    const [user, setname] = useState();
    const navigate = useNavigate();

    //loader for forget btn click
    const [load,setload]=useState(false);

    const handleSubmit = async (prevdata, formdata) => {
        let name = formdata.get('name');
        let password = formdata.get('password');

        if (!name || !password) {
            return { error: "Fill Both Details" }
        }
        setname(name);

        // Fetching the Api to Login
        try {
            let resp = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            })
            const result = await resp.json();

            if (resp.status === 400 || resp.status === 401 || resp.status === 500) {
                setmsg(result.error || "An unknown error occurred.");
            }
            if (resp.status === 200) {
                localStorage.setItem('signupEmail', result.signupEmail);
                localStorage.setItem('user', result.user);

                navigate('/');

            }

        } catch (error) {
            setmsg(result);

        }
    }

    const forget = async () => {
        setload(true);
        if (!user) {
            setload(false);
            return setredmsg("First Fill User Name");
        }
        let resp = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        })
        let result = await resp.json();
        if (resp.status === 200) {
            localStorage.setItem('name', user);

            navigate('/user/otp/reset');
            setload(false);
        }

    }

    const [data, action, pending] = useActionState(handleSubmit, null);



    return (
        <div className="">
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white h-screen w-[22rem] md:h-[38rem] md:w-[24rem] rounded-4xl lg:w-[27rem] xl:h-[38rem] xl:w-[28rem]'>        {/* h-[39rem] w-[29rem] */}
                    <div className='flex justify-center mt-5'>
                        <h1 className=' font-bold text-4xl text-black'>Log-in</h1>
                    </div>
                    <br />
                    <div className=' flex justify-center items-center mt-20'>
                        <form action={action}>
                            <div className='flex justify-center items-center gap-3'>
                                <label htmlFor="user"><i class="fa-solid fa-user text-xl text-black"></i></label>
                                <input type="text" onChange={(e) => { setname(e.target.value) }} defaultValue={data?.name} id='user' name='name' className=' text-xl lg:text-2xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-blue-700 placeholder-black' placeholder='Enter Name' />
                            </div>
                            <div className='flex justify-center items-center gap-3 mt-30 relative'>
                                <label htmlFor="user"><i class="fa-solid fa-lock text-xl text-black"></i></label>
                                <input type={visible ? "text" : "password"} defaultValue={data?.pass} id='pass' name='password' className=' lg:text-2xl text-xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-red-700 placeholder-black' placeholder='Password' />
                                <i onClick={() => setVisible(!visible)} className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"}  absolute right-1 text-xl text-gray-600 cursor-pointer hover:text-gray-900 transition`}></i>
                            </div>

                            <div className=' flex items-center justify-center mt-1'>
                                <div className=' absolute z-[100] mt-10 flex justify-center items-center gap-1'>
                                    <h1 className=' text-gray-500 font-medium'>Didn't Remember Paswword?</h1>
                                    <div>
                                        <h1 onClick={() => { forget() }} className=' cursor-pointer text-blue-600 hover:text-blue-800 transition font-medium underline'>Forget?</h1>
                                    </div>
                                    
                                </div>
                                {load?
                                <span className="loading loading-ring loading-xl absolute z-100 text-blue-600 font-semibold "></span>:null
                                }
                            </div>

                            {/* Submission button */}
                            <div className='flex justify-center items-center mt-25'>

                                <button disabled={pending} className='h-20 w-64 bg-black rounded-4xl font-medium text-xl cursor-pointer hover:bg-gray-900 transiton'>{pending ? 'Logging-In...' : 'Log-In'}</button>
                            </div>
                        </form>
                    </div>

                    <div className=' flex justify-center items-center lg:mt-18 mt-8 md:mt-20 xl:mt-10 '>
                        <div role="alert" className={`alert alert-error fixed z-30 ${data?.msg ? "" : "hidden"} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-7 lg:w-16 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Log-in Functionality Will Be Added Soon !</span>
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        {
                            msg ? <span className=' absolute z-[100]'><h1 className='text-red-500  '>{msg}</h1></span> : null
                        }
                        {
                            data?.error && <span className=' absolute z-[100]'><h1 className='text-red-500  '>{data.error}</h1></span>
                        }
                        {
                            redmsg && <span className=' absolute z-[100]'><h1 className='text-red-500  '>{redmsg}</h1></span>
                        }
                      
                    </div>

                    <div className=' flex justify-center items-center gap-3'>
                        <h1 className=' text-gray-500 font-medium'>Don't have an account?</h1>
                        <Link to="/user/create">
                            <h1 className=' text-blue-600 hover:text-blue-800 transition font-medium underline'>Sign up</h1>
                        </Link>
                    </div>
                </div>
                
            </div>
            <div className=' h-10 w-full'>

                </div>

        </div>
    )
}
export default User;