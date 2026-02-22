"use client";

import { useId } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phone.css"

interface PhoneInputFieldProps {
  value: string | undefined;     
  onChange: (value: string | undefined) => void;
  error?: string | undefined;

}

 function PhoneInputF({
  value,
  onChange,
  error,
  
}: PhoneInputFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 phone">
      <PhoneInput
       
        international
        defaultCountry={"EG"}
        value={value}
        onChange={onChange}
        
        className="w-full container rounded-md focus:ring-2 focus:ring-blue-500 "
      />

      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  );
}

export default PhoneInputF