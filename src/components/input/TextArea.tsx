import React from "react";
import {
   UseFormRegister,
   useController,
   UseControllerProps,
} from "react-hook-form";

interface TextAreaProps {
   name: string;
   label?: string;
   id?: string;
   placeholder?: string;
   control: any;
}

const TextArea = ({ label, name, placeholder, id, control }: TextAreaProps) => {
   const {
      field,
      fieldState: { error },
   } = useController({
      name,
      control,
   });
   return (
      <div className="field field-group">
         {label && <label htmlFor={id || name}>{label}</label>}
         <div className={`control`}>
            <textarea
               className="textarea is-fade"
               rows={3}
               id={id || name}
               {...field}
               placeholder={placeholder}
            ></textarea>
         </div>
      </div>
   );
};

export default TextArea;
