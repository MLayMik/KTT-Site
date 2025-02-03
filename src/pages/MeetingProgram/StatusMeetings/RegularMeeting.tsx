interface RegularMeetingProps {
  currentProgram: {
    leading: string
    speaker?: string | undefined | null
    speechTitle?: string | undefined | null
    leadWt?: string | undefined | null
    reader?: string | undefined | null
    closingPrayer?: string | undefined | null
  }
}

export function RegularMeeting({ currentProgram }: RegularMeetingProps) {
  return (
    <>
      <div className={`
        flex justify-between rounded-xl bg-white px-4 py-2
        drop-shadow-mainshadow

        dark:bg-gray-800
      `}
      >
        <p>Председатель встречи</p>
        <p className="font-semibold">{currentProgram.leading}</p>
      </div>

      <div
        className={`
          flex justify-between rounded-xl bg-white py-1 text-center
          drop-shadow-mainshadow

          dark:bg-dark-bg

          md:bg-transparent
        `}
      >
        <div
          className={`
            rounded-xl px-4 py-2 drop-shadow-mainshadow

            dark:bg-dark-bg dark:drop-shadow-none dark:md:bg-dark-bg

            md:bg-white
          `}
        >
          <p>Докладчик</p>
          <p className="mt-2 font-semibold italic">{currentProgram.speaker}</p>
        </div>
        <div
          className={`
            rounded-xl px-4 py-2 drop-shadow-mainshadow

            dark:bg-gray-800 dark:drop-shadow-none dark:md:bg-dark-bg

            md:bg-white
          `}
        >
          <p>Публичная речь</p>
          <p className={`
            mt-2 font-bold text-slate-900

            dark:text-slate-200
          `}
          >
            {currentProgram.speechTitle}
          </p>
        </div>
      </div>

      <div
        className={`
          flex justify-between rounded-xl bg-white px-4 py-3 text-center
          drop-shadow-mainshadow

          dark:bg-gray-800
        `}
      >
        <div>
          <p>Ведущий С.Б.</p>
          <p className="font-semibold">{currentProgram.leadWt}</p>
        </div>
        <div>
          <p>Чтец</p>
          <p className="font-semibold">{currentProgram.reader}</p>
        </div>
      </div>

      <div className={`
        flex justify-between rounded-xl bg-white px-4 py-2
        drop-shadow-mainshadow

        dark:bg-gray-800
      `}
      >
        <p>Заключительная молитва</p>
        <p className="font-semibold">{currentProgram.closingPrayer}</p>
      </div>
    </>
  )
};
