import React from 'react';
// import mock from './detailRouteMockData.json';
// import styled from 'styled-components';

const DetailRoute = () => {
  // const subPath: any = mock.result.path[index].subPath;

  return (
    <div>
      {/* <StartPoint>출발</StartPoint>
      {subPath.map((step: any, index: any) => {
        console.log(step);
        switch (step.trafficType) {
          case 1: // Subway
            return (
              <SubwayStep key={index}>
                <p>{step?.lane[0]?.subwayCode}</p>
                <p>{step.startName} 승차</p>
                <p>{step.endName}</p>
              </SubwayStep>
            );
          case 2: // Bus
            return (
              <BusStep key={index}>
                <p>{step?.lane[0]?.busNo}</p>
                <p>{step.startName}</p>
                <p>{step.endName}</p>
              </BusStep>
            );
          case 3: // Walk
            return (
              <WalkStep key={index}>
                <p>{step.distance}</p>
                <p>{step.sectionTime}</p>
              </WalkStep>
            );
          default:
            return null;
        }
      })} */}
    </div>
  );
};

export default DetailRoute;

// const StartPoint = styled.p`
//   background: url('@/public/Location_on.png');
//   width: 42px;
//   height: 42px;
// `;
// const SubwayStep = styled.div``;
// const BusStep = styled.div``;
// const WalkStep = styled.div``;
