import { div } from "framer-motion/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);


function End() {
    const vidref = useRef(null);
    const inputref = useRef(null);
    const [input, setinput] = useState();
    const [click, setclick] = useState(false);

    const [msg,setmsg]=useState();

    useGSAP(() => {
        gsap.from(vidref.current, {
            opacity: 0,
            duration: 1,
            scale: 0.8,
            scrollTrigger: {
                trigger: vidref.current,
                scroller: "body",
                scrub: 2,
                start: "top 50%",
                end: "top 40%"
            }
        })
    }, []);

    const handleClick = () => {
        setclick(!click); // toggle the state first

        gsap.to(inputref.current, {
            scale: click ? 1 : 1.1, // toggle scale based on click state
            borderColor: !click ? "#8b5cf6" : "rgba(255, 255, 255, 0.2)",
            duration: 0.1,
            ease: "power2.out",
            transformOrigin: "center center",
        });
    };

    const feedback = async () => {
        if (!input) {
            setmsg("Fill The FeedBack");
            return;
        }
        let email = localStorage.getItem('signupEmail');
        let feedback = input;
        if (!email) {
              setmsg("Login First..");
            return;
        }

        try{
        let resp = await fetch("https://blockchain-polygon.onrender.com/feedback", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, feedback }),
        })
        const result = await resp.json();
        console.log(result);
        
           if (resp.status === 200){
                setmsg("FeedBack Sent !");
           }else if(resp.status===500){
            alert("Some Thing Went Wrong Report Developer");
            setmsg("Some Thing Went Wrong Report Developer");
            
           }
        }catch(error){
            alert("Server Error");
            setmsg("Server Error");
        }


    }

    //Play Animation for the message
    useEffect(() => {
        if (msg) {
            gsap.to("#mssg", {
                opacity: 1,
                duration: 0.8,
                delay: 0.1,
            });
        }

        setTimeout(() => {
            setmsg();
        }, 10000);
    }, [msg]); // run animation after msg state is updated
  
    


    return (
        <div className=" w-full max-w-full h-[30rem] mt-10 flex justify-center items-center relative">
            <div className=" w-[95%] h-[90%] rounded-4xl" onClick={() => { handleClick() }}>
                <video ref={vidref} className="h-full w-full rounded-2xl border-2 border-white/10 object-cover" src="https://polytech-assets.polygon.technology/videos/homepage/newsletter.mp4" autoPlay loop playsInline muted></video>
            </div>
            <div className="absolute z-30 left-5 md:left-20 flex items-center justify-center w-[90%] md:w-[40vw]">
                <input ref={inputref} onChange={(e) => { setinput(e.target.value) }} type="text" id="txt" onClick={() => { handleClick(); setclick(!click); }} placeholder="FeedBack" className={`p-3 outline-none hover:border-white/40 text-xl font-medium transition-all cursor-pointer m-5  md:m-10 border-2 border-white/20 bg-black rounded-xl h-16 w-64 md:w-72`} />
                <div onClick={() => { feedback() }} className=" cursor-pointer hover:bg-white/70 transition-all flex items-center justify-center size-8 md:size-10 bg-white rounded-full"><i className="   fa-solid text-sm md:text-xl md:px-4 text-black fa-arrow-right"></i></div>
            </div>

             {msg ?
                <div className=' flex justify-center items-center absolute top-70 md:bottom-120 z-[100] left-0 right-0'>
                    <div role="alert" id='mssg' className=" opacity-0 alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{msg}</span>
                    </div>
                </div> : null
            }



        </div>
    )
}
export default End;