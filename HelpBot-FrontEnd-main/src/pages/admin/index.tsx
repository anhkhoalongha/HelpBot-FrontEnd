'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Admin() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/default');
  });

  return <div />;
}
