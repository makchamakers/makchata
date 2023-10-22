import { NextResponse } from 'next/server';

export async function GET() {
  let data;
  let latitude = '';
  let longitude = '';
  if ('geolocation' in navigator) {
    console.log('?');
    const { geolocation } = navigator;
    geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude.toString();
      longitude = position.coords.longitude.toString();
    });

    const res = fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${latitude},${longitude}&output=json`,
      {
        headers: new Headers({
          'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_CLIENT_ID as string,
          'X-NCP-APIGW-API-KEY': process.env
            .NEXT_PUBLIC_CLIENT_SECRET as string,
        }),
      }
    );
    data = (await res).json();
  }

  console.log(data);
  return NextResponse.json({ data });
}
