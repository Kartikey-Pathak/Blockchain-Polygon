import { div } from "framer-motion/client";

function List() {
    return (
        <div className=" w-full max-w-screen h-full bg-black">
            <div className=" flex items-center justify-center h-full md:h-screen md:flex-row flex-col">
                
              <div className="flex w-52 flex-col gap-4 m-10">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-52 flex-col gap-4 m-10">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-52 flex-col gap-4 m-10">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>

                <div className="flex w-52 flex-col gap-4 m-10">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>

        </div>
    )
}
export default List;