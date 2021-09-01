import qs from 'querystring';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

function filterParsedQs(qs: number, totalPage: number) {
  if (!qs || qs <= 0) {
    return 1;
  }
  if (qs > totalPage) {
    return 1;
  }
  return qs;
}

const useModalPagination = (totalPage: number) => {
  const location = useLocation();
  const history = useHistory();
  const querystring = location.search.slice(1);
  const parsedQs = +qs.parse(querystring).page;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultPage = useMemo(() => filterParsedQs(parsedQs, totalPage), []);
  const onPageChange = (_: any, page: number, pathname: string) => {
    return history.push({ pathname, search: `?page=${page}` });
  };
  return { defaultPage, onPageChange };
};

export default useModalPagination;
