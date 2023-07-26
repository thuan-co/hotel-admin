import { Alert } from "@mui/material"
import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [ emailEntered, setEmailEntered ] = useState(false)
    const nav = useNavigate()
    const [ error, setError ] = useState<string | null>(null)

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" >
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Your wellcome Admin
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Chúc bạn một ngày tốt lành
                </p>

                <div
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <p className="text-center text-lg font-medium">Sign in to your account</p>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                                ref={nameRef}
                                onChange={(e) => {
                                    setEmailEntered(true)
                                    const regexEmail = /(^[\w_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg
                                    let isEmail = Boolean(e.target.value.match(regexEmail))
                                    if ( isEmail ) setError(null)
                                }}
                                onBlur={(e) => {
                                    //Valid email
                                    const regexEmail = /(^[\w_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg
                                    let isEmail = Boolean(e.target.value.match(regexEmail))
                                    if ( !isEmail ) {
                                        setError("Email not valid!")
                                        e.target.focus()
                                    } else {
                                        setError(null)
                                    }
                                }}
                            />
                        {
                            ( error ) ? 
                                <Alert severity="error">{error}</Alert> :
                                null
                        }

                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                ref={passwordRef}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        onClick={() => {
                            if ( error || !emailEntered ) return
                            if ( nameRef.current && passwordRef.current ) {
                                const body = {
                                    email: nameRef.current.value,
                                    password: passwordRef.current.value
                                }
                                console.log("Authentication ", body)
                                ;(async () => {
                                    try {
                                        const res = await axios.post(`http://localhost:5000/api/v1/admin/login`, body)
                                        // Saving localStorage
                                        localStorage.setItem('user', JSON.stringify(res.data))
                                        nav('/')
                                    } catch(error:any) {
                                        console.log(error);
                                        setError(error.response.data)
                                    }
                                })()
                            }
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div >
    )
}
export default Login