import { PATH_DETAIL_KEY } from '@/constants/queryKey';
import { PathDetailRequestProps } from '@/type/path';
import { getPathDetail } from '@/utils/apis/path';
import { useQuery } from '@tanstack/react-query';

const usePathDetailQuery = ({
  // recoil pathResultState 값 사용 예정
  sx,
  sy,
  ex,
  ey,
  index,
}: PathDetailRequestProps) => {
  const { data: pathDetailLocations } = useQuery({
    queryKey: [PATH_DETAIL_KEY, sx, sy, ex, ey, index],
    queryFn: () =>
      getPathDetail({
        // recoil pathResultState 값 사용 예정
        sx,
        sy,
        ex,
        ey,
        index,
      }),
  });

  return { pathDetailLocations };
};

export default usePathDetailQuery;
