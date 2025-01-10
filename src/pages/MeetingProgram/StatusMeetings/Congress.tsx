interface CongressProps {
  currentProgram: {
    special_program?: string | undefined
    address?: {
      address?: string | undefined
      addressUrl?: string | undefined
    } | undefined | null
    status?: {
      title?: string | undefined
      id?: number | undefined
    } | undefined
  }
}

export function Congress({ currentProgram }: CongressProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold">КОНГРЕСС</p>
        <p className="text-3xl font-extrabold">
          {currentProgram.status?.title}
        </p>
      </div>
      <div>
        <p>
          Адресс:
          {' '}
          {currentProgram.address?.address}
        </p>
        <a target="_blank" className="underline" href={currentProgram.address?.addressUrl}>
          {currentProgram.address?.address}
        </a>
        {' '}

      </div>
    </>
  )
};
