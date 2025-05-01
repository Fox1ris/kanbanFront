import {useState} from "react";
import Login from "@/app/projectslist/componenst/authentication/Login";


export default function TasksCount(status, count, title) {
    const [open, setOpen] = useState(false);

    //console.log("count", status.title.map((id) => id));

    return (
        <div className="flex">
            <div onClick={() => {
                setOpen(true)
            }}
                 className="flex flex-wrap bg-white ml-10 indent-4 italic rounded-full">
                <div>{status.status}</div>
                <div>{status.count}&emsp;</div>
            </div>
            <div className="fixed mt-9">
                <div
                    onClick={() => setOpen(false)}
                    className={`w-90 bg-white rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100 right-12 fixed" : "scale-125 opacity-0 fixed invisible"}`}>
                    {status.title.map((title) => (
                        <div className="flex flex-col mt-4 text-black border-black border-2 p-2 rounded-lg">
                            {title}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}