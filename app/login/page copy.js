'use client'
import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import LoginForm from "@/components/LoginForm"
export default function Login() {
    const { data: session } = useSession()

    if (session) {
        return <>
            <div className='max-w-6xl mx-auto'>
                Signed in as {session?.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        </>
    }
    return (
    <div className='max-w-6xl mx-auto flex flex-col justify-center h-[700px]'>
        <div className='  flex max-w-3xl mx-auto justify-center items-center p-8'>
            <div className='h-full'>
                <Image className='rounded-s-full' src={"/hero-image.jpeg"} width={1000} height={600} alt='hero-image'/>
            </div>
            <div className=' w-[400px] flex justify-center'>
                <div className='flex flex-col justify-center items-center'>
                <button className='bg-[#000000] text-white rounded-full w-40 hover:bg-[#454545] p-2' onClick={() => signIn()}>Google</button>
                <br />
                    <h1 className=''>__________ or __________</h1>
                <br />
                <div>
                    <LoginForm />
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}