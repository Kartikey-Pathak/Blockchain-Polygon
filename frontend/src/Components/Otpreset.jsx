import { div, span } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Otpreset() {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState();
    const [txt, settxt] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('signupEmail');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const verify = async () => {
        setLoading(true); // disable button & show text
        let name = localStorage.getItem('name');
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/otp/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, name }),
            })
            const result = await resp.json();
            if (resp.status === 200) {
                navigate('/user/forget');  //replaces history instead of adding   //,{ replace: true }
            }
            if (resp.status === 400) {
                settxt("Invalid OTP !");

            }
            console.log(result);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false); // enable button back
        }

    }


    const inputRef = useRef(null);
    const [click, setclick] = useState(false);



    const handleClick = () => {
        setclick(!click); // toggle the state first

        gsap.to(inputRef.current, {
            scale: click ? 1 : 1.1, // toggle scale based on click state
            borderColor: !click ? "#8b5cf6" : "rgba(255, 255, 255, 0.2)",
            duration: 0.1,
            ease: "power2.out",
            transformOrigin: "center center",
        });
    };
    return (
        <div className=" bg-black max-w-screen w-full flex justify-center items-center h-screen">

            <div className=" flex items-center flex-col h-[120vw] max-h-[35rem] md:max-h-[36rem] md:h-[70vw] w-[90%] md:w-[40%] bg-gray-800 rounded-4xl gap-20">
                <h1 className=" text-4xl font-semibold text-white mt-5">Verify Email</h1>

                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    verify();
                }} className=" flex items-center justify-center flex-col w-full mt-10">
                    <input ref={inputRef} onChange={(e) => setOtp(e.target.value)} type="number" id="txt" onClick={() => { handleClick(); setclick(!click); }} className=" cursor-pointer hover:border-white/20 transition-all outline-none w-[60%] text-2xl text-center border-4 border-white rounded-2xl p-2" placeholder="Enter OTP" />

                    <button disabled={loading} className=" p-6 bg-black rounded-2xl px-20 font-semibold text-xl mt-20 hover:bg-black/60 cursor-pointer transition-all"> {loading ? 'Verifying...' : 'Verify'}</button>
                </form>
                {
                    <span className=" mt-10 text-sm font-semibold text-red-500">{txt}</span>
                }

            </div>

        </div>
    )
}
export default Otpreset;