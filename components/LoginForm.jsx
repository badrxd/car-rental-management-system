import React, { useState } from "react";
import { z } from "zod";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-white dark:!border-white/10 dark:text-white"
        }`}
      />
    </div>
  );
}

export default InputField;

// import React, { useState } from 'react';
// import { z } from 'zod';

// export default function LoginForm() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState([]);

//     const loginSchema = z.object({
//         username: z.string().min(3,{message: 'The Email should be more then 3 letters'}).email().max(50),
//         password: z.string().min(6,{message: 'The Password should be more then 3 letters'}).max(20)
//     });

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         try {
//             loginSchema.parse({ username, password });
//             // If validation succeeds, you can proceed with form submission
//             console.log('Form submitted:', { username, password });
//         } catch (error) {
//             console.error(error.errors);
//             console.log(error.errors);
//             // Handle validation errors here, e.g., update state to display error messages to the user
//             setErrors(error.errors);
//         }
//     };

//     return (
//         <div className="">
//             <form className='flex flex-col px-5 ps-2 gap-2' onSubmit={handleSubmit}>
//                 <input
//                     className='p-2 rounded-md'
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 {errors.length > 0 && (
//                 <div className="error-messages">
//                     {errors.map((error, index) => (
//                         error.path[0] === 'username' ? <p key={index}>{error.message}</p>:null
//                     ))}
//                 </div>
//             )}

//                 <input
//                     className='p-2 rounded-md'
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <input
//                 className="bg-[#000000] text-[#ffffff] rounded-md p-2 cursor-pointer"
//                 type="submit" value="Login" />
//             </form>
//             {errors.length > 0 && (
//                 <div className="error-messages">
//                     {errors.map((error, index) => (
//                          error.path[0] === 'password' ? <p key={index}>{error.message}</p>:null
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
