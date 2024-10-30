import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the client's IP address from the request headers
  const clientIp = request.headers.get('x-forwarded-for') || request.ip || 'Unknown IP';

  // Log the IP address
  console.log(`Client IP: ${clientIp}`);

  // Return the IP address as a JSON response
  return NextResponse.json({ ip: clientIp });
}
