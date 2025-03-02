interface MemorialProps {
  currentProgram: {
    date?: Date | undefined
    speaker?: string | null
    address?: {
      address?: string | undefined
      addressUrl?: string | undefined
    } | undefined | null
  }
}

export function Memorial({ currentProgram }: MemorialProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className={`
          font-bold

          sm:text-2xl
        `}
        >
          ВЕЧЕРЯ ВОСПОМИНАНИЯ СМЕРТИ ИИСУСА ХРИСТА
        </p>
        <p>
        </p>
        {currentProgram.speaker

        && (
          <p className="text-lg">
            Докладчик:
            {' '}
            {currentProgram.speaker}
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <p>
            Адресс:
            {' '}
            {currentProgram.address?.address}
          </p>
          <a
            target="_blank"
            className="underline"
            href={currentProgram.address?.addressUrl}
          >
            Ссылка
          </a>
        </div>
        <div>
          <p>
            Начало:
            {' '}
            {currentProgram.date
              ? `${
                new Date(currentProgram.date).getHours()
              }:${new Date(currentProgram.date)
                .getMinutes()
                .toString()
                .padStart(2, '0')}`
              : 'N/A'}
          </p>
        </div>
      </div>
    </>
  )
}
