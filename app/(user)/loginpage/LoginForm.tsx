"use client";

import { toast } from 'react-toastify';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/componant/Spinner/Spinner';
import Link from 'next/link';

function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return toast.error("Email is required");
        if (!password) return toast.error("Password is required");

        try {
            setLoading(true);
            await axios.post(`/api/user/login`, { email, password });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message || "Login failed");
            setLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center gap-6 loginform'>
            <div className="text-center mb-4">
                <label className='text-4xl md:text-6xl font-extrabold block mb-2'>Hello customer</label>
                <p className='text-neutral-400 text-xl'>Welcome to N-NegmCartilla</p>
            </div>

            {/* تم تكبير الـ padding والـ font والـ rounded */}
            <input 
                className="w-full max-w-md border-2 border-gray-200 rounded-2xl p-5 text-2xl outline-none focus:border-[#771011] transition-all shadow-sm" 
                type="email" 
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <input 
                className="w-full max-w-md border-2 border-gray-200 rounded-2xl p-5 text-2xl outline-none focus:border-[#771011] transition-all shadow-sm" 
                type="password" 
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
                disabled={loading} 
                type="submit" 
                className='w-full max-w-md flex items-center justify-center gap-2 cursor-pointer text-white p-6 rounded-2xl bg-[#771011] hover:bg-[#5a0c0d] transition-colors text-2xl font-bold shadow-lg disabled:bg-gray-400 mt-4'
            >
                {loading ? <Spinner /> : "Login"}
            </button>

            <Link href={"/registerpage"} className='font-bold flex gap-2 text-lg mt-4'>
                <span className='text-gray-600'>Don't have an account?</span>
                <span className='text-[#771011] hover:underline'>Sign in</span>
            </Link>
        </form>
    )
}

export default LoginForm;