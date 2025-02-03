import {connectDB} from '@/src/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET(){
    const tcon = await connectDB()
    return new NextResponse('connected');
}