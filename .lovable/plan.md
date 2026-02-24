

## Mobile Home Page: Sponsored Carousel + Weekly Draw Banner — DONE

### Changes (mobile only, desktop untouched)

**Mobile layout order:**

```text
+-------------------------------+
| Weekly Draw Banner (tap=expand)|  <- full-width strip at top
+-------------------------------+
| Hero Carousel (180px, swipe)  |  <- Embla, touch-swipeable
+-------------------------------+
| Sponsored Carousel (auto-3s)  |  <- auto-cycling Embla carousel
+-------------------------------+
| Gradient Banner               |  <- unchanged
+-------------------------------+
| Regular markets...            |  <- unchanged
```

### Implemented

- **Weekly Draw Banner**: Slim single-row strip with Trophy, pot amount, countdown, entries. Tap opens Dialog with full details (distribution, how-it-works / previous-winners tabs).
- **Sponsored Carousel**: Embla auto-rotating carousel showing one CompactFeaturedCard at a time, cycling every 3 seconds with dot indicators. Swipeable manually.
- **Hero Carousel**: Already swipeable via Embla at 180px height.
