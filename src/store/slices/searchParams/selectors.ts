import { RootState } from '~/store/store';

export const getSearchParams = (state: RootState) => {
	return state.searchParams;
};


