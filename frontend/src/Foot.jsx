function Foot(){
    return(
        <div className=" w-full max-w-screen h-[32rem] bg-[#0a090d] flex justify-center items-center relative">
            {/* Text part */}
            <div className="border-b-2 border-white/5 w-full max-w-screen absolute top-1 items-center justify-evenly h-20 flex flex-row">
            <h1 className="font-bold text-2xl ml-3">PolyDash</h1>
            {/* Logos */}
            <div className=" flex flex-row items-center gap-10 w-[80%] justify-end">
                <a href="https://github.com/Kartikey-Pathak"><i className="fa-brands fa-github text-white/40 text-2xl hover:text-white/80 cursor-pointer mr-3"></i></a>
                <a href="https://www.linkedin.com/in/kartikey-pathakb580297/"><i className="fa-brands fa-linkedin text-white/40 text-2xl hover:text-white/80 cursor-pointer mr-3"></i></a>
                <a href="https://x.com/Kartikey7070"><i className="fa-brands fa-x-twitter text-white/40 text-2xl hover:text-white/80 cursor-pointer mr-3"></i></a>
            </div>
            </div>
           
           {/* info part */}
            <div className=" flex justify-start absolute left-10 top-30 gap-y-3 flex-col">
                <br />
                <h1 className=" font-bold text-white">Developer</h1>
                <a href="https://github.com/Kartikey-Pathak/Blockchain-Polygon/blob/main/README.md"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">Tech Docs</h2></a>
                <a href="https://github.com/Kartikey-Pathak"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">GitHub</h2></a>
                <a href="https://polygon.technology/"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">Official Polygon</h2></a>
            </div>

             <div className=" flex justify-start absolute left-60 top-30 gap-y-3 flex-col">
                <br />
                <h1 className=" font-bold text-white">Developer</h1>
                <a href="https://github.com/Kartikey-Pathak/Blockchain-Polygon/blob/main/README.md"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">Tech Docs</h2></a>
                <a href="https://github.com/Kartikey-Pathak"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">GitHub</h2></a>
                <a href="https://polygon.technology/"><h2 className=" hover:text-white/70 transition duration-150 cursor-pointer text-white/20">Official Polygon</h2></a>
            </div>


            <div className="absolute bottom-5 flex justify-center items-center">
                <h3 className="text-sm text-white/20">© 2025 CryptoDash UI-A Polygon Inspired Project.</h3>
            </div>
                        <h1 className=' absolute left-5 bottom-10 font-semibold text-[1rem] text-white/20'>Developer ~ Kartikey Pathak.</h1>
        </div>
    )
}
export default Foot;