# TaskApp Frontend

אפליקציית React לניהול פתקים, משימות ויומן עם עיצוב מודרני ותמיכה במובייל.

## מבנה הפרויקט

```
src/
├── components/
│   ├── ui/                 # קומפוננטות UI בסיסיות
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Icon.tsx
│   ├── layout/             # קומפוננטות layout
│   │   └── PageHeader.tsx
│   ├── notes/              # קומפוננטות ספציפיות לפתקים
│   │   └── NoteCard.tsx
│   ├── tasks/              # קומפוננטות ספציפיות למשימות
│   │   └── TaskItem.tsx
│   ├── calendar/           # קומפוננטות ספציפיות ליומן
│   │   └── CalendarEvent.tsx
│   ├── dashboard/          # קומפוננטות ספציפיות לדשבורד
│   │   ├── RecentNotes.tsx
│   │   ├── RecentTasks.tsx
│   │   └── UpcomingEvents.tsx
│   └── Navigation.tsx
├── pages/                  # דפי האפליקציה
│   ├── Dashboard.tsx
│   ├── Notes.tsx
│   ├── Tasks.tsx
│   └── Calendar.tsx
├── hooks/                  # Custom hooks
│   └── useLocalStorage.ts
├── utils/                  # פונקציות עזר
│   └── dateUtils.ts
├── constants/              # קבועים
│   └── index.ts
├── types/                  # הגדרות טיפוסים
│   └── index.ts
└── App.tsx
```

## עקרונות תכנות

### SOLID Principles
- **Single Responsibility**: כל קומפוננטה אחראית על דבר אחד בלבד
- **Open/Closed**: קומפוננטות פתוחות להרחבה וסגורות לשינוי
- **Liskov Substitution**: קומפוננטות ניתנות להחלפה
- **Interface Segregation**: ממשקים קטנים וממוקדים
- **Dependency Inversion**: תלויות מופשטות ולא קונקרטיות

### Clean Code
- שמות משמעותיים וקריאים
- פונקציות קצרות וממוקדות
- הפרדה ברורה בין אחריות
- קוד מודולרי וניתן לבדיקה
- תיעוד ברור

## קומפוננטות UI

### Button
קומפוננטת כפתור רב-שימושית עם variants שונים:
- `primary`, `secondary`, `success`, `danger`, `warning`
- גדלים: `sm`, `md`, `lg`
- תמיכה באיקונים

### Card
קומפוננטת כרטיס עם תמיכה ב-hover effects ו-click handlers.

### Badge
קומפוננטת תג עם variants שונים וגדלים שונים.

### Icon
קומפוננטת איקון עם איקונים נפוצים מובנים.

## קומפוננטות ספציפיות

### NoteCard
מציגה פתק עם:
- כותרת ותוכן
- תאריך עדכון
- סטטוס שיתוף
- כפתורי עריכה ומחיקה

### TaskItem
מציגה משימה עם:
- checkbox להשלמה
- כותרת ותיאור
- תאריך יעד
- רמת עדיפות
- כפתורי פעולה

### CalendarEvent
מציגה אירוע יומן עם:
- כותרת ותיאור
- זמני התחלה וסיום
- מיקום (אופציונלי)
- צבע לפי סוג אירוע

## Hooks

### useLocalStorage
Hook לעבודה עם localStorage עם תמיכה ב-TypeScript.

## Utils

### dateUtils
פונקציות עזר לעבודה עם תאריכים:
- `formatDate` - עיצוב תאריך יחסי
- `formatTime` - עיצוב זמן
- `getRelativeDate` - תאריך יחסי לעתיד
- `isToday`, `isPast`, `isFuture` - בדיקות תאריך

## Constants

### API_ENDPOINTS
כל נקודות הקצה של ה-API מאורגנות לפי קטגוריות.

### VALIDATION_RULES
כללי אימות לטפסים.

### ERROR_MESSAGES & SUCCESS_MESSAGES
הודעות שגיאה והצלחה בעברית.

## Types

### User, Note, Task, CalendarEvent
טיפוסים מרכזיים לכל הנתונים באפליקציה.

### FormData Types
טיפוסים לטפסים עם אימות.

### API Response Types
טיפוסים לתגובות ה-API.

## התקנה והרצה

```bash
# התקנת תלויות
npm install

# הרצת האפליקציה בפיתוח
npm start

# בניית האפליקציה לייצור
npm run build
```

## תכונות

- ✅ עיצוב מודרני עם Tailwind CSS
- ✅ תמיכה מלאה במובייל
- ✅ קומפוננטות רב-שימושיות
- ✅ TypeScript מלא
- ✅ עקרונות SOLID ו-Clean Code
- ✅ מבנה תיקיות מסודר
- ✅ הפרדה ברורה של אחריות
- ✅ קוד נוח לתחזוקה והרחבה

## הצעדים הבאים

1. **Backend Development**: בניית ה-API עם NestJS
2. **Authentication**: אינטגרציה עם Google OAuth
3. **Real-time Updates**: WebSocket לתעדוף בזמן אמת
4. **Advanced Features**: חיפוש, סינון, מיון
5. **Testing**: Unit tests ו-Integration tests
6. **Deployment**: הגדרת CI/CD
