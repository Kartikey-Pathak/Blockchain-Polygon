import { useState, useEffect, useActionState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Forget() {   //The Login Page

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [msg, setmsg] = useState();
    const [redmsg, setredmsg] = useState();
    const [user, setname] = useState();
    const navigate = useNavigate();

    let name=localStorage.getItem('name');

    const handleSubmit = async (prevdata, formdata) => {
        let password1 = formdata.get('password1');
        let password2 = formdata.get('password2');

        if (!password1 || !password2) {
            return { error: "Fill Both Details" }
        }
        if(password1!=password2){
            return {error:"Fill Same Detail"}
        }
        setname(password1);

        // Fetching the Api to Login
        try {
            let resp = await fetch(`${import.meta.env.VITE_API_URL}/user/forget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password1,name }),
            })
            const result = await resp.json();

            if (resp.status === 400) {
                setmsg(result);
            }
            if (resp.status === 401) {
                setmsg(result);
            }
            if (resp.status === 200) {
                navigate('/');

            }

        } catch (error) {
            setmsg(result);

        }
    }

    

    const [data, action, pending] = useActionState(handleSubmit, null);



    return (
        <div className="">
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white h-screen w-[22rem] md:h-[36rem] md:w-[24rem] rounded-4xl lg:w-[27rem] xl:h-[38rem] xl:w-[28rem]'>        {/* h-[39rem] w-[29rem] */}
                    <div className='flex justify-center mt-5'>
                        <h1 className=' font-bold text-4xl text-black'>Change Password</h1>
                    </div>
                    <br />
                    <div className=' flex justify-center items-center mt-20'>
                        <form action={action}>
                            <div className='flex justify-center items-center gap-3 mt-1 relative'>
                                <label htmlFor="password1"><i class="fa-solid fa-lock text-xl text-black"></i></label>
                                <input type={visible1 ? "text" : "password"} defaultValue={data?.password1} id='password1' name='password1' className=' lg:text-2xl text-xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-red-700 placeholder-black' placeholder='New Password' />
                                <i onClick={() => setVisible1(!visible1)} className={`fa-solid ${visible1 ? "fa-eye-slash" : "fa-eye"}  absolute right-1 text-xl text-gray-600 cursor-pointer hover:text-gray-900 transition`}></i>
                            </div>
                            <div className='flex justify-center items-center gap-3 mt-30 relative'>
                                <label htmlFor="password2"><i class="fa-solid fa-lock text-xl text-black"></i></label>
                                <input type={visible2 ? "text" : "password"} defaultValue={data?.password2} id='password2' name='password2' className=' lg:text-2xl text-xl border-b-2 border-b-black h-9 w-70 text-black focus:outline-none focus:border-red-700 placeholder-black' placeholder='Confirm Password' />
                                <i onClick={() => setVisible2(!visible2)} className={`fa-solid ${visible2 ? "fa-eye-slash" : "fa-eye"}  absolute right-1 text-xl text-gray-600 cursor-pointer hover:text-gray-900 transition`}></i>
                            </div>

                            

                            {/* Submission button */}
                            <div className='flex justify-center items-center mt-25'>

                                <button disabled={pending} className='h-20 w-64 bg-black rounded-4xl font-medium text-xl cursor-pointer hover:bg-gray-900 transiton'>{pending ? 'Saving...' : 'Save'}</button>
                            </div>
                        </form>
                    </div>

                    

                    <div className='flex justify-center items-center'>
                        {
                            msg ? <span className=' absolute z-[100]'><h1 className='text-red-500  '>{msg.error}</h1></span> : null
                        }
                        {
                            data?.error && <span className=' bottom-12 absolute z-[100]'><h1 className='text-red-500  '>{data.error}</h1></span>
                        }
                        {
                            redmsg && <span className=' absolute z-[100]'><h1 className='text-red-500  '>{redmsg}</h1></span>
                        }
                    </div>

                    <div className=' flex justify-center items-center gap-3 mt-5'>
                        <h1 className=' text-gray-500 font-medium'>~ Developer Kartikey</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Forget;