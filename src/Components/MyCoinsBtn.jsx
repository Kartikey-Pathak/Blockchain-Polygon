import { Link } from 'react-router-dom';
function MyCoinsBtn(){
    return(
        <div className=" flex items-center justify-center w-full mt-20">
                <Link to="/user/list">
                    <button className=" h-13 w-48 cursor-pointer hover:bg-purple-900 transition-all bg-purple-600 text-white font-semibold rounded-4xl">My Coins</button>
                </Link>
            </div>
    )
}
export default MyCoinsBtn;