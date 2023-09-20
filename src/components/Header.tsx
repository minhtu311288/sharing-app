import { Disclosure } from '@headlessui/react'
import { useNavigate, Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { CallAPIPOST } from '../shared/APIs'
import { useState } from 'react'

export default function Header() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [passWord, setPassWord] = useState("")
    const [requireEmail, setRequireEmail] = useState(false)
    const [requirePassWord, setRequirePassWord] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [isLogined, setIsLogined] = useState(localStorage.getItem("email") ? true : false);
    const handleLogin = async () => {
        if (!email)
            setRequireEmail(true)
        else
            setRequireEmail(false)
        if (!passWord)
            setRequirePassWord(true)
        else
            setRequirePassWord(false)

        const data = await CallAPIPOST('/login', { email: email, password: passWord })
        if (data.success) {
            setIsLogined(true);
            localStorage.setItem("email", email)
        } else {
            setServerError(true)
        }
    }

    const gotoShareVideo = () => {
        navigate("/share-video");
    }

    const goToRegister = () => {
        navigate("/register");
    }

    const handleLogOut = () => {
        setIsLogined(false);
        localStorage.removeItem("email");
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link to="/">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex-initial w-64 text-white pl-2 text-xl">
                                        <Link to="/">
                                            <h1>Funny movies</h1>
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {!isLogined &&
                                            <><input onChange={(e) => setEmail(e.target.value)} className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-44 rounded-md" placeholder='email' />
                                                <input type='password' onChange={(e) => setPassWord(e.target.value)} className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 ml-4 w-44 rounded-md" placeholder='password' />
                                                <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700" onClick={handleLogin}>Login</button>
                                                <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700" onClick={goToRegister}>Register</button>
                                                {serverError && !requireEmail && !requirePassWord && <a className="text-red-400 text-center my-2">Authentication failed</a>}</>
                                        }
                                        {isLogined &&
                                            <>
                                                <div className="text-base font-medium leading-none text-white">Wellcome {localStorage.getItem("email")}</div>
                                                <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700" onClick={gotoShareVideo}>Share video</button>
                                                <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700" onClick={handleLogOut}>Logout</button>
                                            </>

                                        }
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-24" placeholder='email' />
                                    <input className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 ml-4 w-24" placeholder='password' />
                                    <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3">Login</button>
                                </div>
                                <div className="flex items-center px-5">
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white"><span>Wellcome </span> {localStorage.getItem("email")}</div>
                                    </div>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}