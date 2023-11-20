export interface PathAllRequestProps {
  sx: string;
  sy: string;
  ex: string;
  ey: string;
}

// 경로 상세
export interface PathDetailRequestProps extends PathAllRequestProps {
  index: number;
}

export type PathDetailResponseProps = Response[];

interface Response {
  trafficType: string;
  distance: number;
  startName?: string;
  endName?: string;
  sectionTime?: number;
  stationCount?: number;
  lane?: Lane[];
  coords?: Coord[];
}
interface Lane {
  busNo: string;
  type: number;
  busID: number;
  busLocalBlID: string;
  busCityCode: number;
  busProviderCode: number;
}
interface Coord {
  x: string;
  y: string;
}
