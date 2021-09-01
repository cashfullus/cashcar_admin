import { useCallback } from 'react';
import { postPointAsync, postPointListAsync } from 'lib/modules/point-overview';
import { PostPointListPayload, PostPointPayload } from 'lib/modules/shared';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'lib/modules';

const usePostPoint = () => {
  const dispatch = useDispatch();
  const postLoading = useSelector((state: RootState) => state.loading.postPoint);
  const postAllLoading = useSelector((state: RootState) => state.loading.postPointList);
  const addPoint = useCallback(
    ({ point, ...payload }: PostPointPayload) => {
      const newPoint = point < 0 ? point * -1 : point;
      dispatch(postPointAsync.request({ point: newPoint, ...payload }));
    },
    [dispatch],
  );
  const subtractPoint = useCallback(
    ({ point, ...payload }: PostPointPayload) => {
      const newPoint = point < 0 ? point : point * -1;
      dispatch(postPointAsync.request({ point: newPoint, ...payload }));
    },
    [dispatch],
  );
  const addAllPoint = useCallback(
    ({ point, ...payload }: PostPointListPayload) => {
      const newPoint = point < 0 ? point * -1 : point;
      dispatch(postPointListAsync.request({ point: newPoint, ...payload }));
    },
    [dispatch],
  );
  const subtractAllPoint = useCallback(
    ({ point, ...payload }: PostPointListPayload) => {
      const newPoint = point < 0 ? point : point * -1;
      dispatch(postPointListAsync.request({ point: newPoint, ...payload }));
    },
    [dispatch],
  );
  return { addPoint, subtractPoint, postLoading, addAllPoint, subtractAllPoint, postAllLoading };
};

export default usePostPoint;
