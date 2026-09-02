---
name: YouTube extractor client
description: The yt-dlp player-client setting needed for YouTube requests from this hosted app
---

Use yt-dlp's Android player client for server-side YouTube metadata and download requests in this project when the default web client is challenged by YouTube's bot check.

**Why:** The hosted server was rejected by YouTube with a sign-in/bot verification error, while the Android client resolved the same video successfully without requiring browser cookies.

**How to apply:** Keep metadata and download commands on the same extractor-client setting, and retain `noPlaylist` when a pasted URL contains a playlist parameter but the app is downloading a single video.