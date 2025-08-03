import { createUser, deleteUser, updateUser } from '@/lib/db/services/users'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    switch (evt.type) {
      case "user.created": {
        const { id, email_addresses } = evt.data;
        const email = email_addresses[0].email_address;
        try {
          const user = await createUser(id, email);
          return NextResponse.json({ user }, { status: 201 });
        } catch (error) {
          return NextResponse.json({ error }, { status: 500 });
        }
      }
      case "user.updated": {
        const { id, email_addresses } = evt.data;
        const email = email_addresses[0].email_address;
        try {
          const user = await updateUser(id, email);
          return NextResponse.json({ user }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ error }, { status: 500 });
        }
      }
      case "user.deleted": {
        const { id } = evt.data;
        if (!id) {
          throw new Error("Failed to Delete User Table");
        }
        try {
          const user = await deleteUser(id);
          return NextResponse.json({ user }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ error }, { status: 500 });
        }
      }
      default:
        return new Response('Webhook received', { status: 200 });
    }
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}