import { div } from "framer-motion/client";
import { motion, AnimatePresence } from "framer-motion";

function Show({ menu }) {
    let arr = ["Documentation", "GitHub", "API", "Hostings"];
    let mp={
        "Documentation":"https://github.com/Kartikey-Pathak",
        "GitHub":"https://github.com/Kartikey-Pathak",
        "API":"https://www.coinapi.io/",
        "Hostings":"https://vercel.com/kartikey-pathaks-projects"
    };
    return (
        <div className="">
            <AnimatePresence>
                {menu ?
                    <motion.div
                        className="h-full w-full bg-black grid grid-cols-1 absolute"
                        initial={{ opacity: 0, y: -20 }}   // when entering
                        animate={{ opacity: 1, y: 0 }}      // while visible
                        exit={{ opacity: 0, y: -20 }}       // when exiting
                        transition={{ duration: 0.1 }}      // animation speed
                    >
                        <div className=" mt-20">
                            {

                                arr.map((item, index) => (
                                    <div key={index} className="h-20 w-full flex justify-between items-center border-b-2 border-gray-900 mt-7 relative z-30">

                                        <a href={mp[item]} className="flex justify-center items-center"> <h1 className=" text-white text-4xl font-medium m-3">{item}</h1>


                                       <i className="fa-solid fa-arrow-right text-2xl text-white absolute right-10"></i></a>
                                    </div>
                                ))
                            }
                        </div>
                     </motion.div> :
                    null
                }
            </AnimatePresence>
        </div>
    )
}
export default Show;