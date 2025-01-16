interface CongressProps {
  currentProgram: {
    date?: Date | undefined
    leading?: string | undefined
    specialProgram?: string | null
    address?: {
      address?: string | undefined
      addressUrl?: string | undefined
    } | undefined | null
  }
}

export function Congress({ currentProgram }: CongressProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className={`
          font-bold

          sm:text-2xl
        `}
        >
          КОНГРЕСС
        </p>
        <p className={`
          text-center text-xl font-extrabold

          sm:text-3xl
        `}
        >
          {currentProgram
            .specialProgram}
        </p>
        <p className="text-lg">
          {currentProgram.leading}
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <p>
            Адресс:
            {' '}
            {currentProgram.address?.address}
          </p>
          <a target="_blank" className="underline" href={currentProgram.address?.addressUrl}>
            Ссылка
          </a>
        </div>
        <div>
          <p>
            Начало:
            {' '}
            {currentProgram.date
              ? `${new Date(currentProgram.date).getHours()}:${new Date(currentProgram.date)
                .getMinutes()
                .toString()
                .padStart(2, '0')}`
              : 'N/A'}
          </p>
        </div>
      </div>
    </>
  )
};
