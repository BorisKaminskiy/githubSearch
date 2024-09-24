import { useAppSelector } from '~/store/store'
import { selectors } from '~/store/selectors'
import { useGetCardsQuery } from '~/store/api/cardsApi'


export const useCardsApi = () => {
	const searchParams = useAppSelector(selectors.getSearchParams) 
  
	const { data, isFetching } = useGetCardsQuery({
    language: searchParams.language,
    page: searchParams.page,
	})
	
	return {data, isFetching}
}