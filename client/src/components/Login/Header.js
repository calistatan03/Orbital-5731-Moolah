import {Link} from 'react-router-dom';
import moolahlogo from '../../images/moolahlogo.png';

export default function Header(){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14 moolahlogo"
                    src={moolahlogo}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            Don't have an account? {' '}
            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                Sign up here
            </Link>
            </p>
        </div>
    )
}