"use client"
import React, {useState} from 'react';

import {redirect} from "next/navigation";
import Modal from "./Modal";

type User = {
    id: number;
    username: string;
    password: string;
    email: string;
}

export default function LoginMenu() {
    const [open, setOpen] = useState(false);
    const [users, setUser] = useState<string[]>([])


    const toProfile = () => {
        redirect ("/profile/")
    }

    console.log(users);
    return (
        <div className="flex">

            <section
                className="absolute top-5 right-5 bg-black h-7 w-40 text-center rounded-lg active:bg-gray-700 active:scale-105">
                <button onClick={()=> setOpen(true)}>Логин/Регистрация</button>
            </section>
            <Modal
            open={open}
            onClose={()=>setOpen(false)}
            login={toProfile}
            />


        </div>

    )
}