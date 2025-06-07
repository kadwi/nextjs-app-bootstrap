import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const configPath = path.resolve(process.cwd(), "src/lib/adminConfig.json");

export async function GET() {
  try {
    const data = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(data);
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read config" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newConfig = await request.json();
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
    return NextResponse.json({ message: "Config saved successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }
}
