import Image from 'next/image';
import imgPathDetail from 'public/assets/images/img_pathDetail.svg';

export default function PathDetail() {
  return <Image src={imgPathDetail} alt="경로상세" />;
}
