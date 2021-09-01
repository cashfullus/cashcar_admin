import { AD_USER_DISCRIMINATOR } from 'lib/modules/ad';
import { APP_PUSH_USER_DISCRIMINATOR, MARKETING_USER_DISCRIMINATOR } from 'lib/modules/push';
import { useCallback, useEffect, useState } from 'react';
import { RootData } from 'types/common';

interface APIResponse {
  data: any[];
  item_count: number;
}

type ExtendAPIParams = Partial<Record<'ad_id' | 'id', number>>;

type UseModalItemsParams = {
  extendAPIParams?: ExtendAPIParams;
  callPreventer?: number | null;
  discriminator: typeof MARKETING_USER_DISCRIMINATOR | typeof APP_PUSH_USER_DISCRIMINATOR | typeof AD_USER_DISCRIMINATOR;
  api: (params: any) => Promise<APIResponse>;
};

const ITEM_COUNT = 10;
const useModalItems = <Data extends RootData>({
  extendAPIParams = {},
  api,
  callPreventer,
  discriminator,
}: UseModalItemsParams) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Data[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const loadItems = useCallback(async (page: number = 1) => {
    if (callPreventer === undefined) {
      return;
    }
    setLoading(true);
    try {
      const response: APIResponse = await api({ page, count: ITEM_COUNT, ...extendAPIParams });
      setTotalPage(Math.ceil(response.item_count / ITEM_COUNT));
      setItems(response.data.map(({ user_id, ...user }) => ({ ...user, discriminator, id: user_id })));
    } catch (error) {
      setItems([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPageChange = useCallback(
    async (_: any, page: number) => {
      loadItems(page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { items, loading, totalPage, onPageChange };
};

export default useModalItems;
