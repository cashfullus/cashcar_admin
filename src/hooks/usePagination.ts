/* eslint-disable react-hooks/exhaustive-deps */
import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import qs from 'querystring';
import { useCallback, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

interface PageSizeChangeCallbackParams {
  page: number;
  count: number;
  [key: string]: any;
}
interface UsePaginationParams {
  itemCount: number;
  route: string;
  pageSizeChangeCallback: (params: PageSizeChangeCallbackParams) => unknown;
}

const filterParsedQs = (qs: number, totalPage: number) => {
  if (!qs || qs <= 0) {
    return 1;
  }
  if (qs > totalPage) {
    return 1;
  }
  return qs;
};

const usePagination = ({ itemCount, route, pageSizeChangeCallback }: UsePaginationParams) => {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_10);
  const totalPage = useMemo(() => Math.ceil(itemCount / pageSize), [itemCount, pageSize]);
  const location = useLocation();
  const history = useHistory();
  const querystring = location.search.slice(1);
  const parsedQs = +qs.parse(querystring).page;
  const defaultPage = useMemo(() => filterParsedQs(parsedQs, totalPage), []);
  const onPageChange = useCallback(
    (_: any, page: number) => {
      history.push({ pathname: route, search: `?page=${page}` });
      return pageSizeChangeCallback({ page, count: pageSize });
    },
    [pageSize, pageSizeChangeCallback],
  );
  const onPageSizeChange = useCallback(
    (option: string | number) => {
      setPageSize(+option);
      history.push({ pathname: route, search: `?page=1` });
      pageSizeChangeCallback({ page: 1, count: +option });
    },
    [pageSizeChangeCallback],
  );
  return { defaultPage, onPageChange, onPageSizeChange, pageSize, totalPage };
};

export default usePagination;
