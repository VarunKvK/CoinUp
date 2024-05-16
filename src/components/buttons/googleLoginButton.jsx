'use client'

import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signIn} from 'next-auth/react'

export default function GoogleLogin(){
    return(
        <button onClick={()=>signIn('google')} className="shadow rounded-lg flex justify-center items-center p-8">
            <FontAwesomeIcon icon={faGoogle} className='w-[40px]'/>           
        </button>
    )
}