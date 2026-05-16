# BioShield Frontier - Bug Fix Implementation Guide

## Overview
This guide provides detailed instructions for implementing fixes for all 3 issues:
1. **Calendar booking system** - Restrict to weekdays, Baku business hours (09:00-13:00 & 15:00-18:00), block public holidays
2. **Multi-language translation** - Complete coverage for all 3 languages (English, Azerbaijani, Russian)
3. **Form validation messages** - Language-aware error messages in user's preferred language

---

## Issue #1: Calendar & Appointment Booking System

### Problem
The appointment calendar currently accepts any dates/times without restrictions.

### Solution
The updated `AppointmentModal-updated.jsx` includes:

- **Weekday-only selection**: Saturdays (6) and Sundays (0) are blocked visually
- **Public holiday blocking**: 14 Azerbaijani national holidays are pre-configured
- **Baku business hours enforcement**: 
  - Morning: 09:00-13:00
  - Afternoon: 15:00-18:00
  - UTC+4 timezone (Baku Time)
- **Real-time validation**: Shows business hour availability info to users

### Key Features Added:
```javascript
// Public holidays (month-day format)
const AZERBAIJAN_PUBLIC_HOLIDAYS = [
  '01-01', // New Year
  '03-08', // International Women's Day
  '03-20' to '03-24', // Novruz (5 days)
  '05-09', // Victory Day
  '05-28', // Republic Day
  '06-15', // National Salvation Day
  '06-26', // Armed Forces Day
  '10-18', // Independence Day
  '11-17', // National Flag Day
  '12-31', // World Azerbaijanis Solidarity Day
];

// Business hours (24-hour format)
const BAKU_BUSINESS_HOURS = [
  { start: 9, end: 13 },   // Morning: 09:00-13:00
  { start: 15, end: 18 }   // Afternoon: 15:00-18:00
];
```

### Implementation Steps:
1. Replace `src/components/landing/AppointmentModal.jsx` with `AppointmentModal-updated.jsx`
2. Ensure the `AlertCircle` icon is imported from `lucide-react` (already in your project)
3. The component now validates dates and times automatically

### Testing Checklist:
- [ ] Cannot select Saturdays/Sundays
- [ ] Cannot select past dates
- [ ] Cannot select public holidays (visual disabled state + tooltip)
- [ ] Only shows time slots within 09:00-13:00 and 15:00-18:00
- [ ] Prevents booking outside business hours
- [ ] Info box explains restrictions

---

## Issue #2: Multi-Language Translation Coverage

### Problem
Not all documents/form labels are translated into all 3 languages (EN, AZ, RU).

### Solution
The updated `i18n-updated.jsx` includes:

- **Complete English (EN) translations**: All existing content
- **Complete Azerbaijani (AZ) translations**: Matched parity with English
- **Complete Russian (RU) translations**: Fully translated from scratch
- **Form validation error messages**: In all 3 languages
- **Appointment-specific labels**: 
  - `yourName`, `email`, `duration` in all languages
  - Timezone info: "Baku Time (AZT, UTC+4)"
  - Business hours explanation

### Languages Supported:
```javascript
const translations = {
  EN: { ... },  // English (default)
  AZ: { ... },  // Azerbaijani
  RU: { ... },  // Russian
};
```

### Implementation Steps:
1. Replace `src/lib/i18n.jsx` with `i18n-updated.jsx`
2. No other changes needed - the context/provider remains the same
3. All existing language switching logic continues to work

### Translation Coverage:
The following sections are fully translated in all 3 languages:
- Navigation (portfolio, efficacy, technology, additives, contact)
- Hero section
- Catalog
- Tech features
- Additives/Feed/Farm sections
- Efficacy section
- Dosing terminal
- Footer
- **Contact form** (including error messages)
- **Appointment booking** (including business hours info)
- Product catalog and comparison pages
- All modal content

---

## Issue #3: Form Validation Error Messages

### Problem
Form validation errors only display in English, regardless of user's language selection.

### Solution
Two updated components with language-aware validation:

#### A. ContactFormModal Updates (`ContactFormModal-updated.jsx`)
**New Features:**
- Language-aware error messages for all fields
- Clear visual error indicators (red borders, alert icons)
- Field-level validation with inline error display
- Errors clear when user starts typing
- Support for all 3 languages

**Error Messages Provided (in all 3 languages):**
- Name required
- Email required
- Invalid email format
- Subject required
- Message required
- Message too long (5000 character limit)

**Implementation:**
1. Replace `src/components/landing/ContactFormModal.jsx` with `ContactFormModal-updated.jsx`
2. Ensure `AlertCircle` icon is imported from `lucide-react`

#### B. AppointmentModal Updates (included in AppointmentModal-updated.jsx)
**New Features:**
- Multi-language form validation on Step 3
- Email validation with language-specific error messages
- Name validation
- Real-time error clearing
- Alert icons for error messages

**Error Messages (in all 3 languages):**
- Name required
- Email required
- Invalid email format
- Date required
- Time required
- Weekend not available
- Outside business hours
- Public holiday

**Implementation:**
Same file as Issue #1 - already includes validation

### Field Validation Rules:
```javascript
// Name: Cannot be empty
if (!clientName.trim()) {
  errors.name = ap.errors.nameRequired;
}

// Email: Must be valid format
if (!clientEmail.trim()) {
  errors.email = ap.errors.emailRequired;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
  errors.email = ap.errors.emailInvalid;
}

// Message (Contact form): Max 5000 chars
if (formData.message.length > 5000) {
  errors.message = c.errors.messageTooLong;
}
```

### Testing Checklist:
- [ ] Errors display in English when language is English
- [ ] Errors display in Azerbaijani when language is Azerbaijani
- [ ] Errors display in Russian when language is Russian
- [ ] Errors clear when user starts typing in field
- [ ] Invalid email shows error
- [ ] Empty required fields show errors
- [ ] Form won't submit with validation errors
- [ ] Error icons (AlertCircle) display correctly
- [ ] Red border styling on invalid fields

---

## File Mapping

| Issue | File | Location | New File |
|-------|------|----------|----------|
| #2 (Translations) | `src/lib/i18n.jsx` | Main translation config | `i18n-updated.jsx` |
| #1 + #3 (Calendar + Validation) | `src/components/landing/AppointmentModal.jsx` | Appointment booking | `AppointmentModal-updated.jsx` |
| #3 (Form Messages) | `src/components/landing/ContactFormModal.jsx` | Contact form | `ContactFormModal-updated.jsx` |

---

## Implementation Order

### Step 1: Update i18n Translations
1. Backup: `src/lib/i18n.jsx` → `i18n.jsx.backup`
2. Copy: `i18n-updated.jsx` → `src/lib/i18n.jsx`
3. Test: Switch between languages in UI

### Step 2: Update Contact Form
1. Backup: `src/components/landing/ContactFormModal.jsx` → `ContactFormModal.jsx.backup`
2. Copy: `ContactFormModal-updated.jsx` → `src/components/landing/ContactFormModal.jsx`
3. Test: Try submitting without filling fields
4. Test: Submit valid form

### Step 3: Update Appointment Modal
1. Backup: `src/components/landing/AppointmentModal.jsx` → `AppointmentModal.jsx.backup`
2. Copy: `AppointmentModal-updated.jsx` → `src/components/landing/AppointmentModal.jsx`
3. Test: Click on weekend dates (should be disabled)
4. Test: Try selecting past dates
5. Test: Try selecting public holidays
6. Test: Select time outside 09:00-13:00 or 15:00-18:00
7. Test: Fill form without name/email

### Step 4: Full Integration Testing
1. Test language switching with forms
2. Test all error messages in each language
3. Test calendar in each language
4. Verify business hours message displays correctly
5. Test form submissions end-to-end

---

## Public Holidays Included

The system includes these Azerbaijani public holidays:

| Date | Holiday |
|------|---------|
| Jan 1 | New Year |
| Mar 8 | International Women's Day |
| Mar 20-24 | Novruz (5-day celebration) |
| May 9 | Victory Day (Commemorates 1945) |
| May 28 | Republic Day |
| Jun 15 | National Salvation Day |
| Jun 26 | Armed Forces Day |
| Oct 18 | Independence Day |
| Nov 17 | National Flag Day |
| Dec 31 | World Azerbaijanis Solidarity Day |

**To modify:** Edit the `AZERBAIJAN_PUBLIC_HOLIDAYS` array in `AppointmentModal.jsx` (format: `'MM-DD'`)

---

## Business Hours Configuration

Current settings:
- **Morning**: 09:00-13:00 (4 hours)
- **Afternoon**: 15:00-18:00 (3 hours)
- **Timezone**: Baku Time (UTC+4)
- **Days**: Monday-Friday (weekends excluded)

**To modify:** Edit the `BAKU_BUSINESS_HOURS` array in `AppointmentModal.jsx`:
```javascript
const BAKU_BUSINESS_HOURS = [
  { start: 9, end: 13 },   // Change hours here
  { start: 15, end: 18 }   // Add more periods if needed
];
```

---

## Troubleshooting

### Issue: Errors still show in English
**Solution**: Ensure `i18n-updated.jsx` is properly replaced. Check that `useLang()` is being called in forms.

### Issue: Calendar shows all dates as available
**Solution**: Verify `isDateAvailable()` function includes all three checks:
1. `date < today` ✓
2. `dayOfWeek === 0 || dayOfWeek === 6` ✓
3. `isPublicHoliday(date)` ✓

### Issue: Business hours not enforcing
**Solution**: Check `isTimeWithinBusinessHours()` and `isTimeSlotAvailable()` functions are properly comparing hour values.

### Issue: Validation errors not clearing
**Solution**: Ensure `validationErrors` state is cleared when user starts typing in each field with `handleInputChange()` or equivalent.

---

## Deployment Notes

1. **No breaking changes**: All updates are backward compatible
2. **No new dependencies**: Uses existing libraries (lucide-react, framer-motion)
3. **No database changes**: All changes are frontend only
4. **Language persistence**: Language preference is stored in LangContext (update user profile if needed)
5. **Testing**: Recommend testing in all 3 languages before production

---

## Support Languages

| Code | Language | Status |
|------|----------|--------|
| EN | English | ✓ Complete |
| AZ | Azerbaijani | ✓ Complete |
| RU | Russian | ✓ Complete |

---

## Version Information

- **Updated**: May 2026
- **Compatibility**: React + Vite
- **Browser Support**: Modern browsers (ES6+)
- **Mobile**: Fully responsive

---

## Additional Notes

### About Baku Time (AZT)
- Standard timezone: UTC+4
- No daylight saving time
- Format: `HH:00` (24-hour format for business logic, 12-hour for display)

### About Business Hours
- No lunch break (continuous 09:00-13:00)
- 2-hour break (13:00-15:00)
- Afternoon sessions (15:00-18:00)
- Fully customizable if needed

### Character Limits
- Message field: 5000 characters
- Display: Real-time counter (e.g., "2450/5000")
- Validation: Prevents submission if exceeded

---

## Next Steps

1. ✅ Replace the 3 files
2. ✅ Test in all 3 languages
3. ✅ Test calendar restrictions
4. ✅ Test form validation
5. ✅ Verify mobile responsiveness
6. ✅ Push to GitHub
7. ✅ Deploy to production

Good luck! 🚀
