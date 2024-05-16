'use client'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signIn} from 'next-auth/react'


export default function GithubLogin(){
    return(
        <button onClick={()=>signIn('github')} className="shadow rounded-lg flex justify-center items-center p-12">
            <FontAwesomeIcon icon={faGithub} className='w-[40px]'/>   
        </button>
    )
}