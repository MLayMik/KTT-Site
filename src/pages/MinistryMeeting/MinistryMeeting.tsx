export function MinistryMeeting() {
  return (
    <>
      <div className={`
        mx-3 mt-1 pb-8 text-sm font-medium

        sm:mx-8 sm:my-5 sm:text-base
      `}
      >

        <div>
          {/* Заголовок таблицы для больших экранов */}
          <div
            className={`
              mb-3 hidden grid-cols-7 gap-4 px-4 font-bold

              sm:grid
            `}
          >
            <p>Дата</p>
            <p>Время</p>
            <p className="col-span-3">Место</p>
            <p className="col-span-2">Ведущий</p>
          </div>

          {/* Контейнер для списка */}
          <div className="flex flex-col gap-y-3">
            {/* Карточка события */}
            <div
              className={`
                grid grid-cols-2 gap-1 rounded-lg bg-white px-2 py-1 drop-shadow-md

                sm:grid-cols-7 sm:gap-4 sm:px-4 sm:py-3
              `}
            >
              {/* Дата и время */}
              <div className="sm:col-auto">
                <p className={`
                  text-sm font-semibold text-gray-500

                  sm:hidden
                `}
                >
                  Дата
                </p>
                <p>07.12.2024</p>
              </div>
              <div className="sm:col-auto">
                <p className={`
                  text-sm font-semibold text-gray-500

                  sm:hidden
                `}
                >
                  Время
                </p>
                <p>10.00</p>
              </div>

              {/* Место */}
              <div className={`
                col-span-2

                sm:col-span-3
              `}
              >
                <p className={`
                  text-sm font-semibold text-gray-500

                  sm:hidden
                `}
                >
                  Место
                </p>
                <a href="#" className="text-blue-500 underline">
                  Ческий Тешин: За Магазином Billa парковка
                </a>
              </div>

              {/* Ведущий */}
              <div className="sm:col-span-2">
                <p className={`
                  text-sm font-semibold text-gray-500

                  sm:hidden
                `}
                >
                  Ведущий
                </p>
                <p>Любинецкий Евгений</p>
              </div>
            </div>

            {/* Карточка события */}
            <div className={`
              rounded-lg bg-white px-2 py-2 drop-shadow-md

              sm:px-4 sm:py-3
            `}
            >
              <div
                className={`
                  grid grid-cols-2 gap-1

                  sm:grid-cols-7 sm:gap-4
                `}
              >
                {/* Дата и время */}
                <div className="sm:col-auto">
                  <p className={`
                    text-sm font-semibold text-gray-500

                    sm:hidden
                  `}
                  >
                    Дата
                  </p>
                  <p>07.12.2024</p>
                </div>
                <div className="sm:col-auto">
                  <p className={`
                    text-sm font-semibold text-gray-500

                    sm:hidden
                  `}
                  >
                    Время
                  </p>
                  <p>10.00</p>
                </div>

                {/* Место */}
                <div className={`
                  col-span-2

                  sm:col-span-3
                `}
                >
                  <p className={`
                    text-sm font-semibold text-gray-500

                    sm:hidden
                  `}
                  >
                    Место
                  </p>
                  <a href="#" className="text-blue-500 underline">
                    Ческий Тешин: За Магазином Billa парковка
                  </a>
                </div>

                {/* Ведущий */}
                <div className="sm:col-span-2">
                  <p className={`
                    text-sm font-semibold text-gray-500

                    sm:hidden
                  `}
                  >
                    Ведущий
                  </p>
                  <p>Любинецкий Евгений</p>
                </div>
              </div>

              <div className={`
                mt-2 flex flex-col gap-2 rounded-xl bg-blue-200 px-3 py-2 drop-shadow-mainshadow
              `}
              >
                <p className="text-center font-bold">Дружеская встреча</p>
                <p>
                  (Текст сообщения того кто приглашает)
                </p>
                <div className={`
                  flex max-w-[500px] flex-col justify-between gap-2

                  sm:flex-row
                `}
                >
                  <div className={`
                    flex max-w-[350px] gap-4

                    sm:block
                  `}
                  >
                    <p className="font-bold">
                      Место
                    </p>
                    <a href="#" className="text-blue-600 underline">
                      Ческий Тешин: За Магазином Billa парковка
                    </a>
                  </div>
                  <div className={`
                    flex gap-4

                    sm:block
                  `}
                  >
                    <p className="font-bold">
                      Время
                    </p>
                    <p>
                      11:30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка события */}

            {/* Добавьте больше карточек, повторяя структуру выше */}
          </div>
        </div>
      </div>
    </>
  )
}
