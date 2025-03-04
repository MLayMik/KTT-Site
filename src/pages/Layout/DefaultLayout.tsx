import { Outlet } from 'react-router-dom'
import { KNavbar } from '../../shared/ui/KNavbar'

export function DefaultLayout() {
  return (
    <div className={`
      flex min-h-screen justify-center bg-sky-100 font-montserrat transition-all
      duration-200 ease-in-out

      dark:bg-dark-bg
    `}
    >
      <div className={`
        relative w-full max-w-[1080px] gap-y-8

        lg:mx-20

        md:mx-10

        sm:my-10
      `}
      >
        <div className={`
          flex w-full flex-col items-center justify-center gap-y-5

          md:px-0
        `}
        >
          <KNavbar />
          <div className={`
            h-full w-full max-w-[800px] overflow-hidden bg-blue-200
            drop-shadow-mainshadow transition-all duration-200 ease-in-out

            dark:bg-dark-primary

            sm:h-auto sm:min-h-full sm:rounded-2xl
          `}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
