import { useState, useEffect, useActionState } from 'react';
import { Link} from 'react-router-dom';
function User() {

    const [visible, setVisible] = useState(false);

    const handleSubmit = async (prevdata, formdata) => {
        let name = formdata.get('name');
        let pass = formdata.get('password');

        await new Promise(res => setTimeout(res, 2000));

        if (name && pass) {
            return { msg: "Data Submiited", name, pass };
        } else {
            return { error: "Fill Both The Details..", name, pass };
        }
    }

    const [data, action, pending] = useActionState(handleSubmit, null);

    const [msg, Setmsg] = useState(false);


    return (
        <div className="">
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white h-[35rem] w-[22rem] md:h-[36rem] md:w-[24rem] rounded-4xl lg:w-[27rem] xl:h-[38rem] xl:w-[28rem]'>        {/* h-[39rem] w-[29rem] */}
                    <div className='flex justify-center mt-5'>
                        <h1 className=' font-bold text-4xl text-black'>Log-in</h1>
                    </div>
                    <br />
                    <div className=' flex justify-center items-center mt-20'>
                        <form action={action}>
                            <div className='flex justify-center items-center gap-3'>
                                <label htmlFor="user"><i class="fa-solid fa-user text-xl text-black"></i></label>
                                <input type="text" defaultValue={data?.name} id='user' name='name' className=' text-xl lg:text-2xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-blue-700 placeholder-black' placeholder='Enter Name' />
                            </div>
                            <div className='flex justify-center items-center gap-3 mt-30 relative'>
                                <label htmlFor="user"><i class="fa-solid fa-lock text-xl text-black"></i></label>
                                <input type={visible ? "text" : "password"} defaultValue={data?.pass} id='pass' name='password' className=' lg:text-2xl text-xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-red-700 placeholder-black' placeholder='Password' />
                                <i onClick={() => setVisible(!visible)} className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"}  absolute right-1 text-xl text-gray-600 cursor-pointer hover:text-gray-900 transition`}></i>
                            </div>

                            {/* Submission button */}
                            <div className='flex justify-center items-center mt-25'>

                                <button disabled={pending} className='h-20 w-64 bg-black rounded-4xl font-medium text-xl cursor-pointer hover:bg-gray-900 transiton'>{pending ? 'Logging-In...' : 'Log-In'}</button>
                            </div>
                        </form>
                    </div>

                    <div className=' flex justify-center items-center lg:mt-18 mt-15 md:mt-20 xl:mt-10 '>
                        <div role="alert" className={`alert alert-error fixed z-30 ${data?.msg ? "" : "hidden"} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-7 lg:w-16 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Log-in Functionality Will Be Added Soon !</span>
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        {
                            data?.msg ? <span ><h1 className='text-blue-400 '>{data?.msg}</h1></span> : null
                        }
                        {
                            data?.error ? <span><h1 className='text-red-500  '>{data?.error}</h1></span> : null
                        }
                    </div>

                    <div className=' flex justify-center items-center gap-3'>
                        <h1 className=' text-gray-500 font-medium'>Don't have an account?</h1>
                        <Link to="/user/create">
                        <a className=' text-blue-600 hover:text-blue-800 transition font-medium underline'>Sign up</a>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default User;