# Responsive Parallax - Mobile Optimization

## 📱 Mobile vs Desktop Behavior

### **Desktop (≥ 768px)**

```
Layout: 2 columns side-by-side
Box Parallax: ✅ Full effect (moves up/down)
Image Parallax: ✅ Full effect (opposite direction)
Result: Premium, dynamic parallax effect
```

### **Mobile (< 768px)**

```
Layout: 1 column (stacked)
Box Parallax: ❌ Disabled (boxes stay stable)
Image Parallax: ✅ Reduced to 50% (subtle effect)
Result: Smooth, stable scrolling with subtle parallax
```

---

## 🎯 Why This Approach?

### **Problem on Mobile:**

- ❌ Box parallax feels janky during scroll
- ❌ Side-by-side layout is too cramped
- ❌ Full parallax can cause performance issues

### **Solution:**

- ✅ **Disable box movement** - Boxes stay stable (better UX)
- ✅ **Reduce image parallax** - Subtle effect (still premium)
- ✅ **Single column layout** - More breathing room
- ✅ **Better performance** - Less animation calculations

---

## 🛠️ How It Works

### **1. useMediaQuery Hook**

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");
// Returns: true on mobile, false on desktop
```

### **2. Conditional Parallax**

```tsx
// Box parallax
useParallax(boxRef, {
  yMovement: isMobile ? 0 : boxMovement, // 0 on mobile = no movement
});

// Image parallax
useParallax(imageRef, {
  yMovement: isMobile ? imageMovement * 0.5 : imageMovement, // 50% on mobile
  startY: isMobile ? imageStartY * 0.5 : imageStartY,
});
```

### **3. Responsive Grid**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2">
  {/* 1 column on mobile, 2 columns on desktop */}
</div>
```

---

## 📊 Parallax Intensity Comparison

| Element            | Desktop | Mobile | Reduction       |
| ------------------ | ------- | ------ | --------------- |
| **Box Movement**   | -225px  | 0px    | 100% (disabled) |
| **Image Movement** | 200px   | 100px  | 50%             |
| **Image Start Y**  | -230px  | -115px | 50%             |

---

## 🎨 Customization

### **Change Mobile Breakpoint**

```tsx
// In ParallaxBox.tsx
const isMobile = useMediaQuery("(max-width: 1024px)"); // Tablet as mobile
```

### **Adjust Mobile Intensity**

```tsx
// More subtle (30%)
yMovement: isMobile ? imageMovement * 0.3 : imageMovement;

// More dramatic (70%)
yMovement: isMobile ? imageMovement * 0.7 : imageMovement;
```

### **Completely Disable Parallax on Mobile**

```tsx
useParallax(imageRef, {
  yMovement: isMobile ? 0 : imageMovement, // No parallax on mobile
});
```

---

## 🧪 Testing

### **Test on Different Devices:**

1. **Desktop** (> 768px)

   - Open DevTools
   - Set viewport to 1920x1080
   - Scroll and observe full parallax

2. **Tablet** (768px)

   - Set viewport to 768x1024
   - Should switch to mobile mode

3. **Mobile** (< 768px)
   - Set viewport to 375x667 (iPhone)
   - Boxes should be stable
   - Subtle image parallax only

### **Chrome DevTools:**

```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Select device or set custom dimensions
Scroll to test parallax behavior
```

---

## ✅ Benefits Summary

| Aspect            | Benefit                          |
| ----------------- | -------------------------------- |
| **Performance**   | Less calculations on mobile      |
| **UX**            | Stable boxes, no janky scroll    |
| **Visual**        | Still has subtle parallax effect |
| **Layout**        | Single column = more space       |
| **Accessibility** | Easier to read on small screens  |

---

## 🚀 Future Enhancements

Want to make it even better? Consider:

1. **Reduce motion preference**

   ```tsx
   const prefersReducedMotion = useMediaQuery(
     "(prefers-reduced-motion: reduce)"
   );
   // Disable all parallax if user prefers reduced motion
   ```

2. **Different effects per breakpoint**

   ```tsx
   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
   // Custom parallax for tablet
   ```

3. **Performance monitoring**
   ```tsx
   // Track FPS and disable parallax if performance is poor
   ```

---

## 📝 Notes

- **Breakpoint**: 768px (Tailwind's `md` breakpoint)
- **Mobile intensity**: 50% of desktop values
- **Box movement**: Completely disabled on mobile
- **Grid layout**: Automatically responsive with Tailwind classes
