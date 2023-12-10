import { auth } from '@clerk/nextjs';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function handleRequestError(error: AxiosError) {
  if (error.response) {
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up the request:', error.message);
  }
}

export async function fetchData(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  params?: object,
  data?: object,
): Promise<any> {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    const config = {
      url,
      method,
      ...(method === 'GET' ? { params } : { data }),
      headers: {
        User: userId,
      },
    };
    const response = await axios(config);
    return NextResponse.json(response.data);
  } catch (error: any) {
    handleRequestError(error);
    throw error;
  }
}
