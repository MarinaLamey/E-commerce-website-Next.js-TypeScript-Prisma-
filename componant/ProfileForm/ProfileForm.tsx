"use client"
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // 1. Import motion

interface ProfileFormProps {
  userId: number
}

export const ProfileForm = ({ userId }: ProfileFormProps) => {

  const updateProfile = useAuthStore((state) => state.updateProfile);
  const deleteProfile = useAuthStore((state) => state.deleteProfile)
  const logOut = useAuthStore((state) => state.Logout)
  const profileInfo = useAuthStore((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const formupdaiteHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email === "") return toast.error("Email is required");
    if (formData.password === "") return toast.error("Password is required");
    if (formData.firstName === "") return toast.error("First Name is required");
    if (formData.lastName === "") return toast.error("Last Name is required");
    try {
      const updatedData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };
      updateProfile(userId, updatedData)
      toast.success(`Updated`)
    } catch (error: any) {
      toast.error(`Error`)
    }
  }

  const DeleteHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      deleteProfile(userId);
      logOut()
    } catch (error: any) {
      toast.error(`Not Deleted`)
    }
  }

  return (
    // 2. Wrap the entire return in a motion.div
    <motion.div
      initial={{ rotateX: 180, opacity: 0, scale: 0.8 }} // Starts flipped/invisible
      animate={{ rotateX : 360, opacity: 1, scale: 1 }}   // Rotates to 360 (full circle)
      transition={{ 
        duration: 1, 
        ease: "easeOut" 
      }}
      className="w-full"
    >
      {/* Profile Form Container */}
      <div className="max-w-3xl bg-red-900/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={formupdaiteHandler}>

          <div className="flex flex-col gap-2">
            <label className="font-['Oswald'] text-sm uppercase tracking-widest text-gray-400">First Name</label>
            <input
              className="mb-4 border rounded p-2 text-xl text-black focus:border-[#771011] outline-none transition-all "
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Oswald'] text-sm uppercase tracking-widest text-gray-400">Last Name</label>
            <input
              className="mb-4 border rounded p-2 text-xl text-black focus:border-[#771011] outline-none transition-all"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-['Oswald'] text-sm uppercase tracking-widest text-gray-400">Email Address</label>
            <input
              className="mb-4 border rounded p-2 text-xl text-black focus:border-[#771011] outline-none transition-all"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-['Oswald'] text-sm uppercase tracking-widest text-gray-400">New Password</label>
            <input
              className="mb-4 border rounded p-2 text-xl text-black focus:border-[#771011] outline-none transition-all"
              type="password" // Fixed: changed from "******" to "password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <p className="text-[10px] text-gray-500 italic">Leave blank to keep current password.</p>
          </div>

          <div className="md:col-span-2 mt-4 flex items-center gap-4">
            <button type="submit" className="bg-[#771011] hover:bg-white hover:text-black text-white font-['Oswald'] px-8 py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-lg active:scale-95">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="mt-12 p-8 border border-red-900/20 rounded-[2rem] bg-red-900/5">
        <h3 className="font-['Oswald'] text-red-500 uppercase tracking-widest">Danger Zone</h3>
        <p className="text-gray-500 text-sm mt-1 mb-4 font-['Roboto']">Once you delete your account, there is no going back.</p>
        <button onClick={DeleteHandler} className="border border-red-900/50 text-red-900 hover:bg-red-900 hover:text-white px-6 py-2 rounded-lg text-xs uppercase font-bold transition-all">
          Delete Account
        </button>
      </div>
    </motion.div>
  )
}