"use client"
import Modal from "@/app/kanban/componenst/Modal";
import {useState} from "react";

export default function Test(){
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button onClick={()=> setOpen(true)}>
                click me
            </button>
            <Modal open={open} onClose={()=>setOpen(false)}/>
        </div>
    )
}