import { NextResponse } from "next/server";
import { emailStorage } from "@/lib/emailStorage";
import { allowedDomains } from "@/lib/domains";

function generateRandomEmailPrefix() {
  return Math.random().toString(36).substring(2, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let domain = "supermail.my.id";

    if (body && body.domain && allowedDomains.includes(body.domain)) {
      domain = body.domain;
    }

    // Generate a new random email prefix
    const emailPrefix = generateRandomEmailPrefix();
    const newEmail = `${emailPrefix}@${domain}`;

    // Save the email with expiration time (e.g., 30 minutes)
    emailStorage.saveEmail(newEmail, 30);

    return NextResponse.json({
      email: newEmail,
      domain,
      expiresInMinutes: 30,
      message: "Temporary email created successfully"
    });
  } catch (error) {
    console.error("Error creating email:", error);
    return NextResponse.json(
      { error: "Failed to create email" },
      { status: 500 }
    );
  }
}
