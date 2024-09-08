import { type ReactNode } from 'react'

export const CardTemplate = ({ children, title }: { children: ReactNode, title: string }) => {
  return (
    <div className="w-full h-full p-6 shadow-md rounded-lg bg-slate-100 dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      {children}
    </div>
  )
}

export const SectionTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <section className='grid grid-cols-3 justify-center items-center mx-36 mt-10 gap-5'>
      {children}
    </section>
  )
}