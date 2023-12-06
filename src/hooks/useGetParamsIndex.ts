import { usePathname } from 'next/navigation';

export default function useGetParamsIndex() {
  const pathname = usePathname();
  const [, , index] = pathname.split('/');

  return Number(index);
}
