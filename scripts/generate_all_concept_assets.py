import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def get_font(size, bold=False):
    font_paths = [
        "C:\\Windows\\Fonts\\segoeui.ttf" if not bold else "C:\\Windows\\Fonts\\segoeuib.ttf",
        "C:\\Windows\\Fonts\\arial.ttf" if not bold else "C:\\Windows\\Fonts\\arialbd.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def create_base(w, h, top_color, bot_color):
    img = Image.new('RGBA', (w, h))
    draw = ImageDraw.Draw(img)
    for y in range(h):
        r = y / h
        c = (
            int(top_color[0] * (1 - r) + bot_color[0] * r),
            int(top_color[1] * (1 - r) + bot_color[1] * r),
            int(top_color[2] * (1 - r) + bot_color[2] * r),
            255
        )
        draw.line([(0, y), (w, y)], fill=c)
    return img

def add_glow(img, cx, cy, rad, color, alpha=70):
    orb = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(orb)
    d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(*color, alpha))
    orb = orb.filter(ImageFilter.GaussianBlur(rad // 2))
    return Image.alpha_composite(img, orb)

def draw_grid(draw, w, h, step=80, col=(255, 255, 255, 12)):
    for x in range(0, w, step):
        draw.line([(x, 0), (x, h)], fill=col, width=1)
    for y in range(0, h, step):
        draw.line([(0, y), (w, y)], fill=col, width=1)

def draw_card(draw, x, y, w, h, r=16, bg=(10, 25, 50, 210), border=(56, 189, 248, 80)):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=r, fill=bg, outline=border, width=1)

def draw_badge(draw, x, y, txt, bg=(16, 185, 129, 35), border=(16, 185, 129, 130), fg=(52, 211, 153), sz=13):
    f = get_font(sz, bold=True)
    bb = f.getbbox(txt)
    w = (bb[2] - bb[0]) + 18
    h = (bb[3] - bb[1]) + 10
    draw.rounded_rectangle([x, y, x + w, y + h], radius=h//2, fill=bg, outline=border, width=1)
    draw.text((x + 9, y + 4), txt, font=f, fill=fg)
    return w, h

# -------------------------------------------------------------
# 1. CASE STUDY BANNER GENERATORS (1600x900)
# -------------------------------------------------------------
def make_cs_banner(title, subtitle, category, metrics, accent_color, file_slug, scenario_text):
    w, h = 1600, 900
    base = create_base(w, h, (5, 15, 30), (10, 28, 55))
    base = add_glow(base, 300, 250, 350, accent_color, 45)
    base = add_glow(base, 1300, 600, 400, (44, 156, 250), 35)

    draw = ImageDraw.Draw(base)
    draw_grid(draw, w, h, step=70, col=(255, 255, 255, 8))

    # Decorative mountain/wave contours
    points = []
    for x in range(0, w + 50, 40):
        y = int(380 + math.sin(x * 0.005) * 80 + math.cos(x * 0.012) * 45)
        points.append((x, y))
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=(*accent_color, 40), width=2)

    # Top Status Bar
    draw_card(draw, 100, 60, 1400, 52, r=10, bg=(7, 20, 38, 220), border=(*accent_color, 80))
    draw.ellipse([124, 80, 136, 92], fill=accent_color)
    f_mono = get_font(13, bold=True)
    draw.text((148, 77), f"STEPS AI // {title.upper()} · {category.upper()}", font=f_mono, fill=(226, 232, 240))
    draw.text((1250, 77), "AUTONOMOUS SYSTEM: LIVE", font=f_mono, fill=accent_color)

    # Central Node Flow Architecture
    node_y = 280
    nodes = [
        (260, node_y, "INPUT STREAM", "Real-Time Customer Intent"),
        (620, node_y - 40, "AI AGENT ENGINE", "Knowledge Base & Catalog Sync"),
        (980, node_y + 30, "VERIFIED ROUTING", "Autonomous API Actions"),
        (1340, node_y, "OUTCOME CONFIRMED", "100% Zero-Lag Resolution")
    ]
    # Connector lines
    for i in range(len(nodes) - 1):
        draw.line([(nodes[i][0], nodes[i][1]), (nodes[i+1][0], nodes[i+1][1])], fill=accent_color, width=3)

    for nx, ny, ntitle, nsub in nodes:
        draw.ellipse([nx - 28, ny - 28, nx + 28, ny + 28], fill=(10, 28, 55, 240), outline=accent_color, width=2)
        draw.ellipse([nx - 12, ny - 12, nx + 12, ny + 12], fill=accent_color)
        f_lbl = get_font(13, bold=True)
        draw.text((nx - 60, ny + 38), ntitle, font=f_lbl, fill=(241, 245, 249))
        f_sub = get_font(11)
        draw.text((nx - 75, ny + 56), nsub, font=f_sub, fill=(148, 163, 184))

    # Bottom 3 Telemetry Widgets
    # Widget 1: Real-Time Scenario Console
    draw_card(draw, 100, 520, 440, 280, r=14, bg=(8, 22, 42, 230), border=(*accent_color, 90))
    draw_badge(draw, 120, 540, "AUTOMATION CONSOLE", bg=(*accent_color, 30), border=(*accent_color, 120), fg=accent_color, sz=11)
    f_code = get_font(12, bold=False)
    for idx, line in enumerate(scenario_text):
        draw.text((124, 580 + idx * 24), line, font=f_code, fill=(203, 213, 225) if "✓" in line else (148, 163, 184))

    # Widget 2: Metric Radar
    draw_card(draw, 580, 520, 440, 280, r=14, bg=(8, 22, 42, 230), border=(44, 156, 250, 90))
    draw_badge(draw, 600, 540, "PROVEN BUSINESS IMPACT", bg=(44, 156, 250, 30), border=(44, 156, 250, 120), fg=(56, 189, 248), sz=11)
    f_big = get_font(46, bold=True)
    draw.text((605, 590), metrics[0][0], font=f_big, fill=(255, 255, 255))
    f_blbl = get_font(13, bold=True)
    draw.text((610, 650), metrics[0][1], font=f_blbl, fill=accent_color)

    # Progress bars
    for i, (mval, mlbl) in enumerate(metrics[1:]):
        by = 685 + i * 46
        draw.text((605, by), mlbl, font=get_font(12), fill=(148, 163, 184))
        draw.text((950, by), mval, font=get_font(12, bold=True), fill=(255, 255, 255))
        draw.rounded_rectangle([605, by + 18, 1000, by + 24], radius=3, fill=(30, 41, 59))
        draw.rounded_rectangle([605, by + 18, 605 + 320, by + 24], radius=3, fill=accent_color)

    # Widget 3: Active Architecture Channels
    draw_card(draw, 1060, 520, 440, 280, r=14, bg=(8, 22, 42, 230), border=(*accent_color, 90))
    draw_badge(draw, 1080, 540, "DEPLOYED CHANNELS", bg=(*accent_color, 30), border=(*accent_color, 120), fg=accent_color, sz=11)
    
    channels = [
        ("Web Experience & Chat", "< 10s Latency", accent_color),
        ("Messaging & WhatsApp API", "100% Automated", (56, 189, 248)),
        ("CRM & Workflow Integrations", "Bidirectional Sync", (168, 85, 247))
    ]
    for i, (cname, cdetail, ccol) in enumerate(channels):
        cy = 585 + i * 58
        draw_card(draw, 1080, cy, 400, 48, r=8, bg=(15, 28, 50, 220), border=(*ccol, 70))
        draw.ellipse([1100, cy + 18, 1112, cy + 30], fill=ccol)
        draw.text((1122, cy + 15), cname, font=get_font(13, bold=True), fill=(241, 245, 249))
        draw.text((1465 - len(cdetail)*6, cy + 16), cdetail, font=get_font(11, bold=True), fill=ccol)

    # Save as both JPG and WebP
    dest_jpg = f"public/images/case-studies/{file_slug}.jpg"
    dest_webp = f"public/images/case-studies/{file_slug}.webp"
    base.convert('RGB').save(dest_jpg, quality=92)
    base.convert('RGB').save(dest_webp, quality=90)
    print(f"Generated case study visual: {dest_jpg}")

# -------------------------------------------------------------
# 2. USE CASE HERO VISUAL GENERATORS (1122x1402 & 1200x800)
# -------------------------------------------------------------
def make_usecase_visual(w, h, title, agent_type, accent_color, filename, metrics, badges, code_preview):
    base = create_base(w, h, (4, 12, 26), (8, 24, 48))
    base = add_glow(base, w // 2, h // 3, w // 2, accent_color, 50)
    base = add_glow(base, w // 4, int(h * 0.75), w // 3, (56, 189, 248), 35)

    draw = ImageDraw.Draw(base)
    draw_grid(draw, w, h, step=60, col=(255, 255, 255, 9))

    # Top Pill Header
    draw_badge(draw, 50, 40, f"STEPS AI // {agent_type.upper()}", bg=(*accent_color, 35), border=(*accent_color, 140), fg=accent_color, sz=12)

    # Large Hero Headline
    f_hero = get_font(32 if w > 1000 else 26, bold=True)
    draw.text((50, 80), title, font=f_hero, fill=(255, 255, 255))

    # Main Center Console Visual
    card_w = w - 100
    card_h = int(h * 0.44)
    cy = 140
    draw_card(draw, 50, cy, card_w, card_h, r=18, bg=(10, 26, 52, 230), border=(*accent_color, 110))

    # Sub-header inside card
    draw_badge(draw, 75, cy + 20, "NEURAL PROCESSING PIPELINE", bg=(*accent_color, 30), border=(*accent_color, 100), fg=accent_color, sz=11)
    
    # Waveform or graph
    gw = card_w - 50
    points = []
    for x in range(gw):
        wy = int((cy + 130) + math.sin(x * 0.04) * 28 + math.sin(x * 0.08) * 14)
        points.append((75 + x, wy))
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=accent_color, width=2)

    # Code / Event Stream
    f_c = get_font(12)
    for idx, line in enumerate(code_preview):
        draw.text((75, cy + 180 + idx * 24), line, font=f_c, fill=(241, 245, 249) if "✓" in line else (148, 163, 184))

    # Bottom Metric Cards Grid
    grid_y = cy + card_h + 30
    gw_half = (card_w - 20) // 2
    for i, (mval, mlbl) in enumerate(metrics[:4]):
        row = i // 2
        col = i % 2
        bx = 50 + col * (gw_half + 20)
        by = grid_y + row * 130
        draw_card(draw, bx, by, gw_half, 115, r=12, bg=(12, 30, 58, 220), border=(*accent_color, 75))
        draw.text((bx + 20, by + 18), mval, font=get_font(28, bold=True), fill=(255, 255, 255))
        draw.text((bx + 20, by + 65), mlbl, font=get_font(12, bold=True), fill=(148, 163, 184))

    # Save as both WebP and PNG
    dest_webp = f"public/photos/use-cases/{filename}.webp"
    dest_png = f"public/photos/use-cases/{filename}.png"
    base.convert('RGB').save(dest_webp, quality=90)
    base.convert('RGB').save(dest_png)
    print(f"Generated use-case asset: {dest_webp}")

def run():
    print("Generating 10 Customer Case Study Concepts...")
    cs_data = [
        ("Mysa Living", "Scandinavian Furniture Advisory", "Ecommerce · Decor",
         [("+70%", "Conversion Lift"), ("< 10s", "Advisory Speed"), ("4.8/5", "Shopper CSAT")],
         (44, 156, 250), "mysa-living",
         ["→ Incoming Visitor: Dimensions inquiry for Oak Dining Table",
          "✓ Matched Catalogue: Hardwood Craft Collection [Shopify]",
          "✓ Sizing Verified: 240cm fits 8-person room clearance",
          "✓ Instant One-Click Checkout Link Dispatched to WhatsApp",
          "→ Cart Restored: $1,840 Order Finished Autonomously"]),

        ("North & Pine", "Autonomous Logistics Tracking", "Outdoor & Gear",
         [("80%", "Ticket Deflection"), ("< 15s", "Webhook Latency"), ("88%", "First Contact")],
         (16, 185, 129), "north-and-pine",
         ["→ Carrier Tracking API: Inbound Delivery Query Detected",
          "✓ Order #NP-4819 Authenticated with Courier Telemetry",
          "✓ Proactive Status: Out for Delivery by 3:45 PM",
          "✓ Automated SMS Sent with Live Tracking Route",
          "→ Support Specialist Queue: 0 Tickets Created"]),

        ("Aster & Row", "Luxury Garment Fit Concierge", "Luxury Apparel",
         [("65%", "Query Deflection"), ("3.2x", "Checkout Speed"), ("24/7", "Concierge")],
         (245, 158, 11), "aster-and-row",
         ["→ Shopper Inquires: Cashmere Overcoat Size Recommendation",
          "✓ Customer Profile: Height 5'9\", Tailored Suit fit",
          "✓ Agent Advises: Italian Size 40 for optimal layering",
          "✓ VIP Styling Context Cached for Human Stylist",
          "→ Checkout Link Completed in 3.2x Faster Flow"]),

        ("Nivara", "Sustainable Returns & Care", "Sustainable Lifestyle",
         [("75%", "Fewer Repeat Tickets"), ("4.9/5", "CSAT Rating"), ("100%", "Return Coverage")],
         (244, 63, 94), "nivara",
         ["→ Customer Asks: Organic Linen Care & Restock Schedule",
          "✓ Natural Dye Washing Guide Provided Instantly",
          "✓ Restock Waitlist Automated for Indigo Throw",
          "✓ Automated Pre-Paid Return Label Generated in 12s",
          "→ CSAT Survey Received: 5/5 Stars"]),

        ("Casa Noma", "Weekend WhatsApp Concierge", "Home & Ceramics",
         [("85%", "Weekend Auto-Resolved"), ("0 hrs", "Monday Backlog"), ("< 30s", "Response Time")],
         (249, 115, 22), "casa-noma",
         ["→ Saturday 11:20 PM: Terracotta Planter Delivery Window",
          "✓ Steps AI WhatsApp Agent Answers in 18 seconds",
          "✓ Safe Fragile Packaging Verified with Courier",
          "✓ Saturday Direct Checkout Order Confirmed",
          "→ Monday Morning Queue: Zero Unanswered Tickets"]),

        ("Stacklane", "Developer Documentation Engine", "SaaS Infrastructure",
         [("89%", "Docs Deflection"), ("52%", "Fewer Tier-1 Tickets"), ("2.1m", "Resolution")],
         (139, 92, 246), "stacklane",
         ["→ Developer Query: Microservice Webhook HMAC Signature",
          "✓ Ingested 420+ Technical API Documentation Pages",
          "✓ Verified Python & TypeScript Snippet Formatted",
          "✓ In-App Portal Response Verified without Ticket",
          "→ Core Engineering Team Focus Stays on Roadmap"]),

        ("Sunday Form", "Conversational Marketing Funnel", "Fitness & Wellness",
         [("400+", "Monthly Qualified Leads"), ("38%", "Re-engagement"), ("4.6x", "Ad ROAS Lift")],
         (16, 185, 129), "sunday-form",
         ["→ Meta Click-to-WhatsApp Campaign Inbound Triggered",
          "✓ Dynamic Fitness Goal Assessment: Hypertrophy & Recovery",
          "✓ Modular Dumbbell System Curated with Video Demo",
          "✓ Segmented Re-engagement Broadcast Sent to Past Buyers",
          "→ 4.6x Return on Ad Spend Verified on Dashboard"]),

        ("Northstar SaaS", "Enterprise Inbound Lead Scoring", "Enterprise SaaS",
         [("83%", "Demo Booking Lift"), ("0 min", "Qualification Lag"), ("100%", "CRM Sync")],
         (44, 156, 250), "northstar-saas",
         ["→ Enterprise Prospect: Pricing & SSO Security Specs",
          "✓ Decision Timeline: 30 Days · Headcount: 250 Employees",
          "✓ Qualified Lead Auto-Enriched to HubSpot & Salesforce",
          "✓ Calendar Demo Coordinated with Senior Account Exec",
          "→ Sales Rep Joins Call with Complete Pain-Point Brief"]),

        ("LatticeFlow Labs", "Global Pipeline Velocity", "AI Infrastructure",
         [("62%", "Faster Response"), ("3.4x", "Pipeline Speed"), ("94%", "CRM Data Fill")],
         (6, 182, 212), "latticeflow-labs",
         ["→ 2:00 AM Inbound: European Technical Lead Evaluates Model Drift",
          "✓ Instant Autonomous Qualification & Domain Validation",
          "✓ Calendar Demo Coordinated across Zurich & NYC Timezones",
          "✓ 14-Hour SDR Waiting Period Completely Eliminated",
          "→ Deal Progression Speed: 3.4x Faster"]),

        ("RelayDesk", "Autonomous Calendar Coordination", "IT Service Desk",
         [("91%", "Booking Completion"), ("0", "Email Ping-Pong"), ("18 hrs", "Saved Weekly")],
         (59, 130, 246), "relaydesk",
         ["→ New Employee Onboarding Hardware Session Booking",
          "✓ Direct Google Workspace & Microsoft 365 Calendar Scan",
          "✓ 3 Mutually Compatible 30-Minute Slots Proposed",
          "✓ Confirmed Slot Synced & Video Link Auto-Created",
          "→ 18 Hours Saved Weekly per Coordinator"])
    ]

    for title, sub, cat, metrics, col, slug, scen in cs_data:
        make_cs_banner(title, sub, cat, metrics, col, slug, scen)

    print("\nGenerating 14 Use Case & Industry Assets (Zero Humans)...")
    # 6 Core Use Cases
    make_usecase_visual(1200, 800, "Autonomous Catalogue Sales Engine", "AI Sales Agent", (44, 156, 250), "sales",
                        [("+70%", "Checkout Conversion"), ("< 10s", "Advisory Speed"), ("24/7", "Autonomous Selling"), ("100%", "Catalogue Sync")],
                        ["Shopify", "WhatsApp", "Live Chat"],
                        ["→ User Intent: Looking for modern Scandinavian dining table",
                         "✓ Searched Store: 12 in-stock match your budget",
                         "✓ Dimensions & Wood Finish Verified with Customer",
                         "→ One-Click Checkout Link Sent to Chat [Paid]"])

    make_usecase_visual(1122, 1402, "Multi-Channel Support Hub", "AI Support Agent", (16, 185, 129), "support",
                        [("80%", "Tier-1 Auto-Resolved"), ("< 15s", "Median Response"), ("4.9/5", "CSAT Rating"), ("60h+", "Saved Weekly")],
                        ["Zendesk", "Shopify", "WhatsApp"],
                        ["→ Inbound Delivery Status Query: Order #2087",
                         "✓ Courier Webhook Authenticated: Package Out for Delivery",
                         "✓ Proactive Status & Live ETA Dispatched",
                         "→ Zero Support Specialist Escalation Required"])

    make_usecase_visual(1122, 1402, "Enterprise Inbound Lead Engine", "AI Lead Capture Agent", (139, 92, 246), "lead-capture",
                        [("83%", "Qualified Demo Lift"), ("0 min", "Qualification Lag"), ("100%", "CRM Sync"), ("94%", "Data Enrichment")],
                        ["HubSpot", "Salesforce", "Web Widget"],
                        ["→ High-Intent Website Visitor Inquires on Pricing",
                         "✓ Budget Tier, Seat Count, and Decision Timeline Vetted",
                         "✓ Enterprise Lead Enriched to HubSpot CRM",
                         "→ Demo Booked Automatically with Senior Account Exec"])

    make_usecase_visual(1122, 1402, "Autonomous Calendar Coordinator", "AI Booking Agent", (59, 130, 246), "booking",
                        [("91%", "Booking Completion"), ("0", "Email Ping-Pong"), ("18 hrs", "Saved Weekly"), ("100%", "Calendar Sync")],
                        ["Google Calendar", "Outlook 365", "SMS"],
                        ["→ Client Requests 45-Minute Product Walkthrough",
                         "✓ Scanned Team Availability across Google & Outlook",
                         "✓ Proposed 3 Optimal Time Slots Conversationally",
                         "→ Meeting Confirmed with Video Conference Link"])

    make_usecase_visual(1122, 1402, "Neural Voice & Phone Receptionist", "AI Receptionist", (245, 158, 11), "receptionist",
                        [("< 150ms", "Audio Latency"), ("99.2%", "Transcription Acc"), ("24/7", "Front Desk Coverage"), ("85%", "Call Resolution")],
                        ["Twilio", "SIP Trunking", "Live Transcription"],
                        ["→ Inbound Voice Call Received: Patient Appointment Inquiry",
                         "✓ Neural Acoustic Waveform Transcribed in Real Time",
                         "✓ Medical Practice Management Calendar Synced",
                         "→ Appointment Confirmed & Confirmation SMS Sent"])

    make_usecase_visual(1122, 1402, "Conversational Campaign Engine", "AI Marketing Agent", (244, 63, 94), "marketing",
                        [("400+", "Monthly Buyer Leads"), ("4.6x", "Ad ROAS Lift"), ("38%", "Broadcast Open"), ("< 30s", "Lead Response")],
                        ["Meta Ads", "Click-to-WhatsApp", "Instagram DMs"],
                        ["→ Meta Click-to-WhatsApp Ad Click Received",
                         "✓ Personalized Goal Quiz Run Conversationally",
                         "✓ Segmented Campaign Broadcast Sent to Past Shoppers",
                         "→ 4.6x Return on Ad Spend Verified"])

    # 8 Industry Visuals (Zero Humans)
    ind_specs = [
        ("industry-ecommerce", "E-Commerce Catalogue & Cart Engine", "Ecommerce", (44, 156, 250)),
        ("industry-healthcare", "Clinic Triage & Appointment Matrix", "Healthcare", (16, 185, 129)),
        ("industry-education", "Campus Admissions & Course Directory", "Education", (139, 92, 246)),
        ("industry-realestate", "Architectural Property & Viewing Hub", "Real Estate", (245, 158, 11)),
        ("call-ecommerce", "Retail Dispatch & Voice Fulfillment", "Ecommerce Phone", (44, 156, 250)),
        ("call-healthcare", "Clinic Reception & Voice Triage", "Healthcare Voice", (16, 185, 129)),
        ("call-education", "University Admissions Voice Desk", "Education Voice", (139, 92, 246)),
        ("call-realestate", "Property Agency Telephony Dispatch", "Real Estate Voice", (245, 158, 11))
    ]
    for fn, t, cat, c in ind_specs:
        make_usecase_visual(1122, 1402, t, cat, c, fn,
                            [("100%", "Autonomous Sync"), ("< 10s", "Response Speed"), ("24/7", "Available"), ("0", "Human Queue Lag")],
                            [cat, "Steps AI", "Active"],
                            [f"→ Autonomous {cat} Workflow Stream Active",
                             "✓ Industry Knowledge Base Verified",
                             "✓ Data Synchronization Completed",
                             "→ Zero Human Overhead Required"])

    print("\nAll 24 concept visuals generated successfully with ZERO humans!")

if __name__ == '__main__':
    run()
