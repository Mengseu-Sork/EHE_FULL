<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>

<body style="margin:0;padding:30px;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">

                <table width="650" cellpadding="0" cellspacing="0"
                    style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background:#15803d;padding:28px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:26px;">
                                Environment and Health Education (EHE)
                            </h1>

                            <p style="margin:10px 0 0;color:#d1fae5;font-size:15px;">
                                New Contact Form Submission
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:35px;">

                            <p style="font-size:16px;color:#374151;line-height:1.7;margin-top:0;">
                                You have received a new message from the EHE website contact form.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="border-collapse:collapse;margin-top:25px;">

                                <tr>
                                    <td width="170"
                                        style="padding:14px;background:#f3f4f6;border:1px solid #e5e7eb;font-weight:bold;">
                                        Full Name
                                    </td>
                                    <td style="padding:14px;border:1px solid #e5e7eb;">
                                        {{ $data['firstName'] }} {{ $data['lastName'] }}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="padding:14px;background:#f3f4f6;border:1px solid #e5e7eb;font-weight:bold;">
                                        Email
                                    </td>
                                    <td style="padding:14px;border:1px solid #e5e7eb;">
                                        <a href="mailto:{{ $data['email'] }}"
                                            style="color:#15803d;text-decoration:none;">
                                            {{ $data['email'] }}
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="padding:14px;background:#f3f4f6;border:1px solid #e5e7eb;font-weight:bold;">
                                        Phone
                                    </td>
                                    <td style="padding:14px;border:1px solid #e5e7eb;">
                                        {{ $data['phone'] ?: 'Not provided' }}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="padding:14px;background:#f3f4f6;border:1px solid #e5e7eb;font-weight:bold;vertical-align:top;">
                                        Message
                                    </td>

                                    <td
                                        style="padding:14px;border:1px solid #e5e7eb;white-space:pre-line;line-height:1.8;">
                                        {{ $data['message'] }}
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:25px;text-align:center;">

                            <p style="margin:0;font-size:13px;color:#6b7280;">
                                This email was automatically generated from the
                                <strong>EHE Website Contact Form</strong>.
                            </p>

                            <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
                                Please do not reply to this email.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
