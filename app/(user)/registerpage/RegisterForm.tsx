"use client";

import { toast } from 'react-toastify';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/componant/Spinner/Spinner';
import PhoneInputF from '@/componant/PhoneInputF/PhoneInputF';

export const RegisterForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [confirmPassword, setconfirmpassword] = useState("");
    const [phone, setPhone] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // التحقق من البيانات (Validation)
        if (!firstName) return toast.error("First Name is required");
        if (!lastName) return toast.error("Last Name is required");
        if (!email) return toast.error("Email is required");
        if (!password) return toast.error("Password is required");
        if (password !== confirmPassword) return toast.error("Passwords do not match");
        if (!phone) return toast.error("Phone Number is required");

        try {
            setLoading(true);
            await axios.post(`/api/user/register`, { 
                firstName, lastName, email, password, confirmPassword, phone 
            });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message || "Something went wrong");
            setLoading(false);
        }
    }

    const inputStyle = "w-full max-w-md border-2 border-gray-200 rounded-2xl p-5 text-2xl outline-none focus:border-[#771011] transition-all shadow-sm";

    return (
        <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center gap-5 loginform'>
            <div className="text-center mb-4">
                <label className='text-4xl md:text-5xl font-extrabold block mb-2'>Hello customer</label>
                <p className='text-neutral-400 text-xl'>Welcome to N-NegmCartilla</p>
            </div>

            <input 
                className={inputStyle}
                type="text" 
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
            />

            <input 
                className={inputStyle}
                type="text" 
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
            />

            <input 
                className={inputStyle}
                type="email" 
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                className={inputStyle}
                type="password" 
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input 
                className={inputStyle}
                type="password" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
            />

            {/* Phone Input Container */}
            <div className="w-full max-w-md">
                <PhoneInputF value={phone} onChange={setPhone} />
            </div>

            <button 
                disabled={loading} 
                type="submit" 
                className='w-full max-w-md flex items-center justify-center gap-2 cursor-pointer text-white p-6 rounded-2xl bg-[#771011] hover:bg-[#5a0c0d] transition-colors text-2xl font-bold shadow-lg mt-4 disabled:bg-gray-400'
            >
                {loading ? <Spinner /> : "Register"}
            </button>
        </form>
    )
}