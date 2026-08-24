"""Staff notifications for inbound submissions.

Sent best-effort: a mail server that is down must never turn a captured lead
into a 500 for the visitor, so failures are logged and swallowed. The record is
already in PostgreSQL by the time this runs.

``From:`` stays on the site's own domain — most MTAs reject mail that claims to
come from a sender they do not host — and the visitor's address goes in
``Reply-To`` so hitting reply in the inbox reaches them directly.
"""
import logging

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)


def _send(subject: str, body: str, reply_to: str | None = None) -> bool:
    recipients = settings.LEAD_NOTIFICATION_RECIPIENTS
    if not recipients:
        logger.warning(
            "LEAD_NOTIFICATION_RECIPIENTS is empty — nobody will be told about: %s",
            subject,
        )
        return False
    try:
        message = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=list(recipients),
            reply_to=[reply_to] if reply_to else None,
        )
        message.send(fail_silently=False)
        logger.info("Notification sent to %s: %s", ", ".join(recipients), subject)
        return True
    except Exception:
        logger.exception("Failed to send notification: %s", subject)
        return False


def notify_quote_request(quote) -> bool:
    body = "\n".join(
        [
            "A new quote request was submitted on the website.",
            "",
            f"Reference:    {quote.reference}",
            f"Name:         {quote.full_name}",
            f"Company:      {quote.company}",
            f"Email:        {quote.email}",
            f"Phone:        {quote.phone or '-'}",
            f"Project type: {quote.project_type_display}",
            f"Language:     {quote.locale}",
            f"Received:     {quote.created_at:%Y-%m-%d %H:%M %Z}",
            "",
            "Message:",
            quote.message,
            "",
            "---",
            f"IP: {quote.ip_address or 'unknown'}",
            "Reply to this email to answer the sender directly.",
        ]
    )
    return _send(
        f"[SACC] Quote request - {quote.company}", body, reply_to=quote.email
    )


def notify_job_application(application) -> bool:
    body = "\n".join(
        [
            "A new job application was submitted on the website.",
            "",
            f"Reference:  {application.reference}",
            f"Name:       {application.full_name}",
            f"Role:       {application.role_display}",
            f"Email:      {application.email}",
            f"Phone:      {application.phone}",
            f"Experience: {application.years_experience} year(s)",
            f"CV link:    {application.cv_link or '-'}",
            f"CV file:    {'attached in admin' if application.cv_file else '-'}",
            f"Language:   {application.locale}",
            f"Received:   {application.created_at:%Y-%m-%d %H:%M %Z}",
            "",
            "Note:",
            application.note or "-",
            "",
            "---",
            "Reply to this email to answer the candidate directly.",
        ]
    )
    return _send(
        f"[SACC] Application - {application.role_display}",
        body,
        reply_to=application.email,
    )
