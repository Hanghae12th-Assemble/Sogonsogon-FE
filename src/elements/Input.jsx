import React from "react";

const Input = ({ register, type, name, placeholdeer, validation, errors }) => {
  return (
    <div>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholdeer}
      />
      <span>{errors?.[name]?.message}</span>
    </div>
  );
};
