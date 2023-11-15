import React from "react";
import { useController } from "react-hook-form";

interface RadioButtonProps {
   label: string;
   name: string;
   value?: string;
   color?:
      | "is-primary"
      | "is-accent"
      | "is-blue"
      | "is-green"
      | "is-red"
      | "is-orange";
   control: any;
}

const RadioButton = ({
   label,
   name,
   value,
   color = "is-primary",
   control,
}: RadioButtonProps) => {
   const { field } = useController({
      control,
      name: name,
   });
   return (
      <label className={`material-radio ${color}`}>
         <input
            type="radio"
            {...field}
            value={value}
            checked={field.value === value}
         />
         <span className="dot"></span>
         <span className="radio-label">{label}</span>
      </label>
   );
};

export default RadioButton;
