from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI(title="Mohini Asthana Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/contact")
async def contact(payload: ContactMessage):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    to_email = os.getenv("CONTACT_TO_EMAIL", smtp_user)

    if not all([smtp_host, smtp_user, smtp_pass]):
        # Dev mode — just print
        print(f"[Contact] From: {payload.name} <{payload.email}>")
        print(f"[Contact] Message: {payload.message}")
        return {"success": True, "dev": True}

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio contact from {payload.name}"
        msg["From"] = smtp_user
        msg["To"] = to_email
        msg["Reply-To"] = payload.email

        body = f"""
New message from your portfolio contact form:

Name:    {payload.name}
Email:   {payload.email}

Message:
{payload.message}
        """
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())

        return {"success": True}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
