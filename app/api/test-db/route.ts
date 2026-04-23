import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT 1 as test');
        return NextResponse.json({ success: true, rows });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}