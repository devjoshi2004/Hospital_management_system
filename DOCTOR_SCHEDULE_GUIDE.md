# Doctor Schedule Management System

This guide explains the new doctor schedule management features implemented in the Hospital Management System.

## Features Implemented

### 1. Doctor Redux Slice (`src/redux/slices/doctorSlice.js`)
- Complete Redux slice for managing doctor data, schedules, and holidays
- Async thunks for all CRUD operations
- State management for loading, error, and success states

### 2. Doctor Schedule Management (`src/components/doctor/doctor-schedule/index.js`)
- **Weekly Schedule Management**: Doctors can set working days and time slots
- **Time Slot Management**: Add, edit, and delete time slots for each day
- **Holiday Management**: Add and remove holidays/leave dates
- **Real-time Updates**: Immediate UI updates with API synchronization
- **Validation**: Prevents overlapping time slots and duplicate holidays

### 3. Patient Doctor Booking (`src/components/patient/patient-book-doctor/index.js`)
- **Doctor Search**: Search doctors by name and specialty
- **Schedule Viewing**: Patients can view doctor's weekly schedule
- **Available Slots**: Shows available time slots for selected dates
- **Appointment Booking**: Book appointments with selected doctors and time slots

### 4. API Endpoints (JSON Server)
- **Doctors**: `/doctor` - CRUD operations for doctor data
- **Doctor Schedules**: `/doctorSchedule` - Manage doctor weekly schedules
- **Doctor Holidays**: `/doctorHolidays` - Manage doctor holidays and leave

## How to Use

### For Doctors:

1. **Access Schedule Management**:
   - Login as a doctor
   - Navigate to the Schedule Management page
   - View your current weekly schedule

2. **Edit Time Slots**:
   - Click "Edit Slots" for any day
   - Add new time slots by entering start and end times
   - Remove existing slots using the trash icon
   - Save changes to update your schedule

3. **Manage Holidays**:
   - Click "Add Holiday" to schedule time off
   - Enter the date and reason for the holiday
   - Remove holidays by clicking the X button

### For Patients:

1. **Book an Appointment**:
   - Login as a patient
   - Navigate to "Book Doctor" page
   - Search for doctors by name or specialty
   - Select a date for your appointment
   - Click "View Schedule" to see doctor's availability
   - Select an available time slot
   - Click "Book Appointment" to confirm

2. **View Doctor Schedules**:
   - Expand any doctor card to see their weekly schedule
   - Green dots indicate working days with available slots
   - Red dots indicate non-working days
   - Available slots are shown when you select a date

## API Endpoints

### Doctor Schedule Endpoints:
```
GET /doctorSchedule?doctorId={id}     - Get doctor's schedule
POST /doctorSchedule                  - Create new schedule
PUT /doctorSchedule/{id}              - Update existing schedule
DELETE /doctorSchedule/{id}           - Delete schedule
```

### Doctor Holiday Endpoints:
```
GET /doctorHolidays?doctorId={id}     - Get doctor's holidays
POST /doctorHolidays                  - Add new holiday
DELETE /doctorHolidays/{id}           - Remove holiday
```

### Doctor Endpoints:
```
GET /doctor                          - Get all doctors
GET /doctor/{id}                     - Get specific doctor
POST /doctor                         - Add new doctor
PUT /doctor/{id}                     - Update doctor
DELETE /doctor/{id}                  - Delete doctor
```

## Data Structure

### Doctor Schedule:
```json
{
  "id": "1",
  "doctorId": "doctor-uuid",
  "schedule": {
    "monday": {
      "isWorking": true,
      "slots": ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"]
    },
    "tuesday": {
      "isWorking": true,
      "slots": ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"]
    },
    // ... other days
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

### Doctor Holiday:
```json
{
  "id": "1",
  "doctorId": "doctor-uuid",
  "date": "2024-02-25",
  "reason": "Personal Leave",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

## Running the System

1. **Start JSON Server** (Backend):
   ```bash
   npx json-server --watch src/data/db.json --port 3001
   ```

2. **Start Next.js Development Server** (Frontend):
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## Features Highlights

- ✅ **Real-time Schedule Updates**: Changes are immediately reflected in the UI
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Dark Mode Support**: Full dark/light theme support
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Loading States**: Loading indicators for better user experience
- ✅ **Data Validation**: Prevents invalid data entry and conflicts
- ✅ **Toast Notifications**: Success and error messages for user feedback
- ✅ **Redux Integration**: Centralized state management for all doctor-related data

## Future Enhancements

- Appointment conflict detection
- Recurring schedule templates
- Doctor availability calendar view
- Email notifications for appointments
- Integration with external calendar systems
- Advanced scheduling rules and constraints
