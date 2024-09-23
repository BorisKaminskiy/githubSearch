import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/store'
import { useNavigate } from 'react-router-dom'

import { setLanguage, setPage } from '~/store/slices/searchParams/searchParams'
import { getSearchParams } from '~/store/slices/searchParams/selectors'
import { generateSearchParams } from '~/utils/generateSearchParams'
import { useGetCardsQuery } from '~/store/api/cardsApi'
import { Outlet } from 'react-router'
import { IDropdownItem } from '~/types/dropdown'
import { ISearchParams } from '~/types/searchParam'
import { languagesItems } from './languagesItems'
import Dropdown from '~/components/Dropdown/Dropdown'
import { ButtonIcon, Spiner, Typography } from '~/ui'
import { ArrowIcon } from '~/assets/icons'
import cn from 'classnames'
import styles from './Main.module.scss'

const Main: FC = ({ ...props }) => {
  const searchParams = useAppSelector(getSearchParams) as ISearchParams

  const { data, isFetching } = useGetCardsQuery({
    language: searchParams.language,
    page: searchParams.page,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data)
      navigate(
        {
          pathname: '/items',
          search: generateSearchParams(searchParams),
        },
        { state: data },
      )
  }, [searchParams, data])

  const onDropdownItemClick = (value: IDropdownItem) => {
    dispatch(setLanguage(value.title))
    dispatch(setPage(1))
  }

  const onIncrementButtonClick = () => {
    dispatch(setPage(searchParams.page + 1))
  }

  const onDecrementButtonClick = () => {
    dispatch(setPage(searchParams.page - 1))
  }

  return (
    <div className={cn(styles.root)} {...props}>
      <Dropdown
        activeItem={searchParams.language}
        values={languagesItems}
        onValueChange={onDropdownItemClick}
      />
      {isFetching && <Spiner />}
      {data ? (
        <div className={cn(styles.wrapper)}>
          <Outlet />

          <div className={cn(styles.page_buttons)}>
            {searchParams.page > 1 && (
              <div className={cn(styles.decrement_button)}>
                <ButtonIcon onClick={onDecrementButtonClick} variant="medium">
                  <ArrowIcon />
                </ButtonIcon>
              </div>
            )}
            <div className={cn(styles.increment_button)}>
              <ButtonIcon onClick={onIncrementButtonClick} variant="medium">
                <ArrowIcon />
              </ButtonIcon>
            </div>
          </div>
        </div>
      ) : (
        <Typography variant="t30b">Error</Typography>
      )}
    </div>
  )
}

export default Main
