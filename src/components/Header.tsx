import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { CallAPIPOST } from '../shared/APIs'
import { useState } from 'react'

const user = {
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
export default function Header() {
    const [email, setEmail] = useState("")
    const [passWord, setPassWord] = useState("")
    const [requireEmail, setRequireEmail] = useState(false)
    const [requirePassWord, setRequirePassWord] = useState(false)
    const [serverError, setServerError] = useState(false)
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
            console.log('login thanh cong');
        } else {
            setServerError(true)
        }
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
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />

                                    </div>
                                    <div className="flex-initial w-64 text-white pl-2 text-xl">
                                        <h1>Funny movies</h1>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <input onChange={(e) => setEmail(e.target.value)} className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 w-24 rounded-md" placeholder='email' />
                                        <input onChange={(e) => setPassWord(e.target.value)} className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 ml-4 w-24 rounded-md" placeholder='password' />
                                        <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700" onClick={handleLogin}>Login</button> <button className="rounded-full text-white ml-4 bg-indigo-500 py-1 px-3 hover:bg-violet-600 active:bg-violet-700">Register</button>
                                        {serverError && !requireEmail && !requirePassWord &&  <a className="text-red-400 text-center my-2">Authentication failed</a>}
                                        {/* Profile dropdown */}
                                        <div className="text-base font-medium leading-none text-white"><span>Wellcome </span> {user.email}</div>
                                        
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
                                        <div className="text-base font-medium leading-none text-white"><span>Wellcome </span> {user.email}</div>
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