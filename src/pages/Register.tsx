import { useState } from 'react'
import Header from '../components/Header'
import Notification from '../components/Notification'
import { CallAPIPOST } from '../shared/APIs';

type Props = {}

const Register = (props: Props) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const [failureRegister, setFailureRegister] = useState<boolean>(false);

  const handleInputEmail = (e: any) => {
    if (e.target.value === '') return;
    setEmail(e.target.value);
  }

  const handleInputPassword = (e: any) => {
    if (e.target.value === '') return;
    setPassword(e.target.value);
  }

  const handleInputConfirmPassword = (e: any) => {
    if (e.target.value === '') return;
    setConfirmPassword(e.target.value);
  }

  const onSubmit = async () => {
    if (!email) {
      setErrorEmail(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorConfirmPassword(true);
      return;
    }
    const data = await CallAPIPOST('/register', {email, password})

    if (data.success) {
      setSuccessRegister(true);
      setTimeout(() => {
        setSuccessRegister(false);
      }, 5000);
    } else {
      setFailureRegister(true);
      setTimeout(() => {
        setFailureRegister(false);
      }, 5000);
    }
  }

  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
            {successRegister && <Notification des={'You have successfully registed!'} title={'Notification'} type={1} />}
            {failureRegister && <Notification des={'Something when wrong.'} title={'Register failured!'} type={0} />}
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">User registration</h1>

                <input
                  onChange={handleInputEmail}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email" />

                <input
                  onChange={handleInputPassword}
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password" />
                <input
                  onChange={handleInputConfirmPassword}
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  placeholder="Confirm Password" />
                {errorConfirmPassword && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">Password is not mapping with confirm password</div>}
                {errorEmail && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">Email must is required</div>}
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="rounded-full text-white ml-4 bg-indigo-500 py-3 px-4 hover:bg-violet-600 active:bg-violet-700 w-full"
                >Create Account</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Register