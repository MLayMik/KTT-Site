interface SpecialProgramProps {
  currentProgram: {
    leading: string
    speaker?: string | undefined | null
    specialProgram?: string | null
    leadWt?: string | undefined | null
    closingPrayer?: string | undefined | null
  }
}

export function SpecialProgram({ currentProgram }: SpecialProgramProps) {
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
          flex justify-between rounded-xl bg-white px-4 py-3 text-center
          drop-shadow-mainshadow

          dark:bg-gray-800
        `}
      >
        <p>Краткое обсуждение Сторожевой Башни</p>
        <p className="font-semibold">{currentProgram.leadWt}</p>
      </div>

      <div className={`
        flex flex-col items-center justify-between rounded-xl bg-white px-4 py-3
        text-center drop-shadow-mainshadow

        dark:bg-gray-800
      `}
      >
        <p>Специальная программа</p>
        <p className="text-xl">{currentProgram.specialProgram}</p>
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
