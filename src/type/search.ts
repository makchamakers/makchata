export interface IAddressProps {
  address_name: string;
  phone: string;
  place_name: string;
  x: string;
  y: string;
}

export interface IResultProps {
  index: number;
  type: string;
  totalTime: number;
  totalDistance: number;
  subPath: ISubPath[];
}

export interface ISubPath {
  trafficType: string;
  distance: number;
  sectionTime: number;
  startName?: string;
  endName?: string;
  stationCount?: number;
  lastTime?: string;
}

export interface IQueryProps {
  firstStartStation: string;
  lastEndStation: string;
  payment: number;
  subPath: ISubPath[];
  totalDistance: number;
  totalTime: number;
  type: string;
}
