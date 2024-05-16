'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signIn} from 'next-auth/react'


export default function SignInButtons({icon,urlVariable,signinName}){
    return(
        <button onClick={()=>signIn('google')} className="shadow rounded-xl flex gap-4 justify-center items-center px-20 py-6">
            <FontAwesomeIcon icon={icon} className='text-4xl'/> 
            <span>{signinName}</span>
        </button>
    )
}