import { AdminMeeting, AdminMinistryMeetings, AdminPanel } from '@/pages/Admin'
import { Route, Routes } from 'react-router-dom'
import { Announcements } from '../../pages/Announcements/Announcements'
import { Areas } from '../../pages/Areas'
import { DefaultLayout } from '../../pages/Layout/DefaultLayout'
import { MeetingProgram } from '../../pages/MeetingProgram'
import { MeetingService } from '../../pages/MeetingService'
import { MinistryMeeting } from '../../pages/MinistryMeeting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<MeetingProgram />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="admin/meeting" element={<AdminMeeting />} />
        <Route path="admin/meeting/:id" element={<AdminMeeting edit />} />
        <Route path="admin/ministry-meeting" element={<AdminMinistryMeetings />} />
        <Route path="admin/ministry-meeting/:id" element={<AdminMinistryMeetings edit />} />
        <Route path="meeting-service" element={<MeetingService />} />
        <Route path="areas" element={<Areas />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="ministry-meeting" element={<MinistryMeeting />} />

        <Route path="admin" />
      </Route>
    </Routes>
  )
}

export default App
