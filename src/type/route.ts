
export interface Station {
  index: number;
  stationID: number;
  stationName: string;
  x: string;
  y: string;
}

export interface PassStopList {
  stations: Station[];
}

export interface Lane {
  name: string;
  subwayCode: number;
  subwayCityCode: number;
}

export interface BusLane {
  busNo: string;
  type: number;
  busID: number;
  busLocalBlID: string;
  busCityCode: number;
  busProviderCode: number;
}

export interface SubPath {
  trafficType: number;
  distance: number;
  sectionTime: number;
  stationCount?: number;
  busNo?: string;
  lane?: Lane[];
  startName?: string;
  startX?: number;
  startY?: number;
  endName?: string;
  endX?: number;
  endY?: number;
  way?: string;
  wayCode?: number;
  door?: string;
  startID?: number;
  endID?: number;
  startExitNo?: string;
  startExitX?: number;
  startExitY?: number;
  endExitNo?: string;
  endExitX?: number;
  endExitY?: number;
  passStopList?: PassStopList;

export interface ParamsProps {
  params: {
    index: number;
  };

}
