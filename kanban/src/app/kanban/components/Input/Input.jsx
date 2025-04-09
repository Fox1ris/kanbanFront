import Rect, {useState} from "react";

export const Input = ({onSubmit}) => {
    const [input, setInput] = useState("")
    const handleSubmit = () => {
        if (!input) return
        onSubmit(input)
        setInput("")
    }

    return (
        <div className="max-w-70">
            <textarea name="text" className="h-200 w-70 border-4 text-wrap text-clip" value={input} onChange={(e) => setInput(e.target.value)}> </textarea>
            <button onClick={handleSubmit}>Добавить</button>
        </div>
    )
}