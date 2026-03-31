import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const method = req.method; // Получаем метод запроса
	const url = req.nextUrl.pathname; // Получаем путь запроса
	console.log(`🚀 [Middleware Log]: ${method} ${url}`);
	return NextResponse.next(); // Позволяем запросу пройти дальше
}

export const config = {
	matcher: '/api/:path*',
};