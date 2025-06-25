import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const photoReference = searchParams.get('photo_reference');

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 400 });
  }

  if (!photoReference) {
    return new Response(JSON.stringify({ error: 'Missing photo reference' }), { status: 400 });
  }

  try {
    const maxWidthPx = '400';
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidthPx}&photo_reference=${photoReference}&key=${key}`;

    const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });

    return new Response(response.data, {
      status: 200,
      headers: {
        'Content-Type': response.headers['content-type'] || 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching photo:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch photo' }), { status: 500 });
  }
}
