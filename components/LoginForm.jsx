import React, { useState } from 'react';
import { z } from 'zod';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const loginSchema = z.object({
        username: z.string().min(3,{message: 'The Email should be more then 3 letters'}).email().max(50),
        password: z.string().min(6,{message: 'The Password should be more then 3 letters'}).max(20)
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            loginSchema.parse({ username, password });
            // If validation succeeds, you can proceed with form submission
            console.log('Form submitted:', { username, password });
        } catch (error) {
            console.error(error.errors);
            console.log(error.errors);
            // Handle validation errors here, e.g., update state to display error messages to the user
            setErrors(error.errors);
        }
    };

    return (
        <div className="">
            <form className='flex flex-col px-5 ps-2 gap-2' onSubmit={handleSubmit}>
                <input
                    className='p-2 rounded-md'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    required
                />
                {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                        error.path[0] === 'username' ? <p key={index}>{error.message}</p>:null
                    ))}
                </div>
            )}

                <input
                    className='p-2 rounded-md'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input 
                className="bg-[#000000] text-[#ffffff] rounded-md p-2 cursor-pointer"
                type="submit" value="Login" />
            </form>
            {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                         error.path[0] === 'password' ? <p key={index}>{error.message}</p>:null
                    ))}
                </div>
            )}
        </div>
    );
};

