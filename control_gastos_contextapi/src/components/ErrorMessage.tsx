import React from 'react'

type ErrorMessageProps = {
  children: React.ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {   
  return (
    <p className='bg-red-600 p-2 text-sm text-white font-bold text-center'>
        {children}
    </p>        
  )
}
