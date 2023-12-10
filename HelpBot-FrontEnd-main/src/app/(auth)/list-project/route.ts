// import { fetchData } from '../api-request/route';

export async function GET() {
  const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  return res;
}
