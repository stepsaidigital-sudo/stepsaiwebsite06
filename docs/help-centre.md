# Help centre: how to add and edit lessons

Everything in `/help/` is built from one file: `content/help/articles.json`. No code changes are needed to add a topic, a lesson, a screenshot or a video. Save the file, rebuild, and the page updates.

## Topics

```json
{ "slug": "whatsapp", "title": "WhatsApp", "summary": "One line about the topic.", "icon": "whatsapp", "cover": "/help/whatsapp-cover.jpg" }
```

- `icon`: one of rocket, globe, whatsapp, instagram, link, plug, spark, headset, megaphone, flow, inbox, users, chart, card.
- `cover` (optional): an image shown on the topic card instead of the icon.

## Lessons

```json
{
  "slug": "connect-whatsapp",
  "topic": "whatsapp",
  "title": "Connect your WhatsApp Business number",
  "summary": "One sentence. Shown under the title and in search.",
  "level": "Beginner",
  "plans": "Starter and above",
  "video": { "type": "youtube", "src": "https://youtu.be/VIDEO_ID", "caption": "Optional caption" },
  "before": ["Things the reader needs first"],
  "steps": [
    { "title": "Open WhatsApp", "body": "What to do, in one or two sentences.", "path": "Agent › Channels › WhatsApp",
      "media": { "type": "image", "src": "/help/connect-whatsapp-1.png", "alt": "The WhatsApp channel screen" } }
  ],
  "table": { "caption": "Table title", "columns": ["Column A", "Column B"], "rows": [["Row 1 A", "Row 1 B"]] },
  "callouts": [{ "type": "tip", "text": "tip, note or warning" }],
  "faq": [{ "q": "Question", "a": "Answer" }],
  "related": ["another-lesson-slug"]
}
```

- Lessons appear in the order they are listed. Each topic card opens its first lesson. Topics are grouped on the hub by `group`: featured, beginner or advanced.
- `path` is added to the step as "Go to …". Separate levels with ` › `.
- Only `slug`, `topic`, `title`, `summary`, `level` and `steps` are required.

## Images and videos

- Put files in `public/help/` and reference them as `/help/file-name.png`.
- `media.type`: `image` (PNG, JPG, WebP or GIF), `video` (an .mp4 file) or `youtube` (any YouTube link).
- Every step and every lesson video shows an empty dashed frame until media is added. Add `media` (or `video`) and the frame is replaced. Topic cards show an empty image area until you add `cover`.
- Keep images under about 300 KB and at least 1200 px wide.

## FAQs page

`/help/faqs/` collects the FAQ sections from the homepage and every agent, feature, channel, industry and integration page automatically. Edit those pages' FAQs and this page follows.
