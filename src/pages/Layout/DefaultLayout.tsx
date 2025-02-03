import { Outlet } from 'react-router-dom'
import { Navbar } from '../../shared/ui/Navbar'

export function DefaultLayout() {
  return (
    <div className={`
      flex min-h-screen justify-center bg-sky-100 font-montserrat transition-all
      duration-200 ease-in-out

      dark:bg-dark-bg
    `}
    >
      <div className={`
        relative mt-4 w-full max-w-[1080px] gap-y-8

        lg:mx-20

        md:mx-10

        sm:my-10
      `}
      >
        <div className={`
          flex w-full flex-col items-center justify-center gap-y-5 px-1

          md:px-0
        `}
        >
          <Navbar />
          <div className={`
            w-full max-w-[800px] overflow-hidden rounded-2xl bg-blue-200
            drop-shadow-mainshadow transition-all duration-200 ease-in-out

            dark:bg-dark-primary

            sm:h-auto sm:min-h-full
          `}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
