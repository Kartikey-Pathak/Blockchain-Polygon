import { div } from "framer-motion/client";
import { set } from "mongoose";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function List() {
    const [load, setload] = useState();
    const [Allcoins, setcoins] = useState([]);
    const [msg, setmsg] = useState();
    const [small, setsmall] = useState();

    const navigate = useNavigate();

    const [empty, setempty] = useState();

    const mail = localStorage.getItem('signupEmail');

    useEffect(() => {
        const handlecoin = async () => {
            try {
                setload(true);
                let resp = await fetch("https://blockchain-polygon.onrender.com/user/coins/list", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "email": mail,
                    },
                })
                const result = await resp.json();
                console.log(result);
                if (resp.status === 200) {
                    if (result.coins.length === 0) {
                        setempty(true);
                        setcoins([]);
                        return;
                    }
                    const ids = result.coins.join(",");


                    // now fetch from coingecko
                    const options = {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
                        },
                    };

                    const api = await fetch(
                        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${ids}`,
                        options
                    );

                    const apidata = await api.json();
                    setcoins(apidata);


                }
                if (resp.status === 404) {
                    setmsg("Email Not Found");
                }


            }
            catch (err) {
                setmsg("Server Error");
            }
            finally {
                setload(false);

            }
        }
        handlecoin();
    }, [msg])

    //handling logic for small devices
    useEffect(() => {
        // function to check size
        const handleResize = () => {
            setsmall(window.innerWidth < 550);
        };

        // add listener
        window.addEventListener("resize", handleResize);

        // run once on mount as well (to set initial state properly)
        handleResize();

        // cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Remove The Coin

    const deleteCoin = async (id) => {
        try {
            let resp = await fetch("https://blockchain-polygon.onrender.com/user/coins/list/del", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "coinid": id,
                    "email": mail,
                },
            })
            let result = await resp.json();
            if (resp.status === 401) {
                setmsg("User Mail Not Found !!")
            }
            if (resp.status === 200) {
                setmsg("Removed Successfully...");
                setcoins(prevCoins => prevCoins.filter(c => c.id !== id));
            }


        } catch (error) {
            setmsg("Server Error Report To Developer");
        }
    }



    //    delete the Account
    const deleteuser = async () => {
        try {
            let resp = await fetch("https://blockchain-polygon.onrender.com/user/delete", {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "email": mail,
                },
            })
            let result = await resp.json();
            if (resp.status === 401) {
                setmsg("User Mail Not Found !!")
            }
            if (resp.status === 200) {
                setmsg("Removed Successfully...");
                localStorage.clear();
                navigate('/');
                window.location.reload();
            }

        } catch {
            setmsg("Server Error Report To Developer");
        }
    }



    return (


        <div className=" w-full max-w-screen h-full bg-black">
            <div className=" flex justify-center items-center p-5">
                <div onClick={() => { deleteuser() }} className=" flex items-center justify-center h-12 cursor-pointer hover:bg-red-500 transition-all w-36 bg-red-700 rounded-xl">
                    <h1 className=" font-semibold text-white text-sm">Delete Account</h1>
                </div>
            </div>
            {empty ?
                <div className=" h-screen w-screen bg-black flex items-center justify-center flex-col gap-10">
                    <h1 className=" text-4xl md:text-5xl text-white/50 font-semibold">No Saved Coins Yet</h1>
                    <i className="fa-solid fa-ban font-semibold text-8xl text-white/50"></i>
                </div> :

                load ?
                    <div className=" flex items-center justify-center h-full md:h-screen md:flex-row flex-col">

                        <div className="flex w-52 flex-col gap-4 m-10">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                    :
                    <div className=' bg-[#000000] min-h-screen w-full max-w-screen relative flex items-center justify-center flex-col'>

                        <h1 className=" font-semibold text-4xl m-10">Saved Coins</h1>



                        <main className=" flex justify-center">

                            <div className=" relative mt-10 md:w-[90%] w-[80%] h-screen rounded-xl overflow-y-scroll bg-[#1B1E2D]/40 flex flex-col items-center">
                                <h1 className=" md:text-2xl text-md font-bold text-white">Top Movers</h1>
                                <br />
                                <div className="flex flex-row gap-2.5 w-[90%] border-b-2 border-gray-700 h-10 items-center justify-evenly md:justify-between">
                                    <h1 className=" font-semibold text-md flex justify-center text-center md:text-xl md:ml-3 lg:mr-6">#</h1>
                                    <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">Coins</h1>

                                    <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">Price</h1>

                                    <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl">24hrs</h1>

                                    {/* {!small ? <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl md:mr-3 lg:ml-6">Market cap</h1> : null} */}

                                    <h1 className=" font-semibold flex justify-center text-center text-sm md:text-xl md:mr-3 lg:ml-6">Remove</h1>
                                </div>


                                <div className=" w-[100%] md:w-[90%] relative">
                                    {!load ?
                                        Allcoins.map((data, idx) => (
                                            <Link to="/prices/data" key={idx} state={data}><div key={idx} className={`grid ${!small ? 'grid-cols-5' : 'grid-cols-5'} mt-3 md:gap-50 gap-5  w-full border-b-2 hover:bg-gray-700 hover:rounded-2xl transition-all cursor-pointer border-gray-900 h-10 items-center justify-evenly md:justify-between`}>
                                                <div className=" flex flex-row items-center gap-2 md:gap-5 ml-1">
                                                    <img className=" object-cover md:size-7 size-5" src={data.image} alt="" />
                                                    <h1 className=" font-medium md:text-[1.2rem]">{idx + 1}</h1>
                                                </div>
                                                <h1 className=" font-semibold text-sm md:text-[1.3rem] flex justify-center text-center whitespace-nowrap">{data.name.length >= 10 ? data.name.substring(0, 10) + '...' : data.name}</h1>
                                                <h1 className=" font-bold text-sm md:text-xl flex justify-center text-center">₹{data.current_price}</h1>
                                                <h1 className="text-sm md:text-xl flex justify-center text-center">{Math.round(data.price_change_percentage_24h)}%</h1>

                                                {/* {!small ? <h1 className="text-sm md:text-xl text-center flex justify-center">{Math.round(data.market_cap_change_percentage_24h)}%</h1> : null} */}

                                                <div onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteCoin(data.id);
                                                }
                                                } className=" bg-transparent transition-all hover:bg-white/20 p-2 flex justify-center items-center rounded-4xl">
                                                    <i className=" text-red-500 text-xl font-semibold fa-solid fa-ban"></i>
                                                </div>
                                            </div></Link>
                                        ))

                                        : <div className=" flex items-center justify-center mt-20"><span className="loading loading-infinity loading-xl"></span></div>
                                    }

                                </div>
                            </div>
                        </main>
                    </div>
            }

            {msg ?
                <div className=' flex justify-center items-center relative md:bottom-60 z-[100] left-0 right-0'>
                    <div role="alert" id='mssg' className=" opacity-0 alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{msg}</span>
                    </div>
                </div> : null
            }

        </div >
    )
}
export default List;