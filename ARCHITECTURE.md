# Parallax Architecture - Code Organization

## 📁 File Structure

```
src/
├── app/
│   ├── layout.tsx              ✅ Lenis initialization (global)
│   └── page.tsx                ✅ Clean, uses components
├── components/
│   ├── SmoothScroll.tsx        ✅ Lenis wrapper component
│   └── ParallaxBox.tsx         ✅ Reusable parallax box
└── hooks/
    └── useParallax.ts          ✅ Parallax animation logic
```

---

## 🎯 What Each File Does

### **1. `layout.tsx` (Root Layout)**

- **Purpose**: Initialize Lenis smooth scroll globally
- **Benefit**: Works on ALL pages automatically
- **Code**: Wraps children with `<SmoothScroll>` component

### **2. `components/SmoothScroll.tsx`**

- **Purpose**: Lenis initialization and GSAP sync
- **Benefit**: Separates smooth scroll logic from layout
- **Features**:
  - Creates Lenis instance
  - RAF loop for updates
  - Syncs with ScrollTrigger
  - Cleanup on unmount

### **3. `hooks/useParallax.ts`**

- **Purpose**: Reusable parallax animation logic
- **Benefit**: Use parallax anywhere with one line
- **Usage**:
  ```tsx
  const ref = useRef(null);
  useParallax(ref, { yMovement: -200, markers: true });
  ```

### **4. `components/ParallaxBox.tsx`**

- **Purpose**: Complete parallax box with inner image effect
- **Benefit**: Drop-in component, no setup needed
- **Features**:
  - Container parallax
  - Inner image parallax
  - Customizable props
  - "Window reveal" effect

### **5. `page.tsx` (Clean!)**

- **Purpose**: Just use components
- **Benefit**: Easy to read and maintain
- **Before**: 158 lines of mixed logic
- **After**: 45 lines of clean JSX

---

## 🚀 How to Use

### **Add Parallax to Any Page**

```tsx
import ParallaxBox from "@/components/ParallaxBox";

export default function MyPage() {
  return (
    <ParallaxBox
      imageSrc="/my-image.jpg"
      imageAlt="My Image"
      width={400}
      height={500}
      boxMovement={-200}
      imageMovement={150}
    />
  );
}
```

### **Use Custom Parallax**

```tsx
"use client";
import { useRef } from "react";
import { useParallax } from "@/hooks/useParallax";

export default function CustomParallax() {
  const ref = useRef(null);
  useParallax(ref, { yMovement: -300, markers: true });

  return <div ref={ref}>Custom parallax element</div>;
}
```

---

## ✅ Benefits of This Architecture

| Before                   | After                       |
| ------------------------ | --------------------------- |
| ❌ Lenis in every page   | ✅ Lenis in layout (global) |
| ❌ Duplicate GSAP code   | ✅ Reusable hook            |
| ❌ 158 lines in page.tsx | ✅ 45 lines in page.tsx     |
| ❌ Hard to maintain      | ✅ Easy to maintain         |
| ❌ Can't reuse           | ✅ Fully reusable           |

---

## 🎓 What You Learned

1. **Separation of Concerns**: Each file has ONE clear purpose
2. **Reusability**: Components and hooks work anywhere
3. **Clean Code**: Easy to read and understand
4. **Scalability**: Easy to add more parallax sections
5. **Best Practices**: Industry-standard architecture

---

## 🔧 Customization

### **Change Lenis Settings**

Edit `components/SmoothScroll.tsx`:

```tsx
const lenis = new Lenis({
  duration: 1.5, // Slower scroll
  // ... other options
});
```

### **Add More Parallax Boxes**

Just add more `<ParallaxBox />` components in your page!

### **Create Custom Effects**

Use `useParallax` hook with custom options:

```tsx
useParallax(ref, {
  yMovement: -500,
  startY: 100,
  markers: true,
  start: "top center",
  end: "bottom center",
});
```

---

## 🎉 Result

Your code is now:

- ✅ **Professional** - Industry best practices
- ✅ **Scalable** - Easy to add features
- ✅ **Maintainable** - Each file has clear purpose
- ✅ **Reusable** - Components work everywhere
- ✅ **Clean** - Easy to read and understand
