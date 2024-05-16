'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signIn} from 'next-auth/react'


export default function SignInButtons({icon,urlVariable}){
    return(
        <button onClick={()=>signIn({urlVariable})} className="shadow rounded-xl flex justify-center items-center p-12">
            <FontAwesomeIcon icon={icon} className='w-[40px]'/>   
        </button>
    )
}