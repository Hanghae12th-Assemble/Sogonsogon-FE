import React from "react";

const Input = ({ register, type, name, placeholder, validation, errors }) => {
  return (
    <div>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
      />
      <span>{errors?.[name]?.message}</span>
    </div>
  );
};

export default Input;
