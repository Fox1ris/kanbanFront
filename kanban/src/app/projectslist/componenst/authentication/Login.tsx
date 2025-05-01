import {useEffect, useState} from "react";
import Axios from "@/app/projectslist/componenst/api/Axios";


export default function Login({open, login}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submission = (data) => {
        Axios.post("login/", {
            username: username,
            password: password,
        })
            .then(response => {
                console.log("Авторизация успешна!", response)
                localStorage.setItem("Token", response.data.token)

            })
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));
    }
    const token = localStorage.getItem("Token");
    console.log(token);

   const user = fetch("http://127.0.0.1:8000/kanbandata/users/", {
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({
                contact: json,
                isLoaded: true,
            })
        })
        .catch(err => console.log(err));


    console.log(user);


    return (
        <div className={`flex flex-col  ${open ? "scale-100 opacity-100" : "scale-125 opacity-0 fixed"}`}>
            <header className="flex justify-center text-2xl mb-10 ">Логин</header>

            <input
                type="text"
                placeholder="Введите логин"
                value={username}
                className="border-2 rounded-full border-black my-5 h-10 indent-3 text-xl"
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                className="border-2 rounded-full border-black my-5 h-10 indent-3 text-xl"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center left mb-10 ">
                <input
                    type="checkbox"
                    name="savePassword"
                    id="savePassword"
                />
                <label htmlFor="savePassword" className="ml-2">Запомнить пароль</label>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={submission}
                    className="border-black rounded-lg bg-black w-40 text-white"
                >
                    Логин
                </button>


            </div>

        </div>
    )
}