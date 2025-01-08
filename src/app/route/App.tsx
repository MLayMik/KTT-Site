import { AdminMeeting, AdminMinistryMeetings, AdminPanel } from '@/pages/Admin'
import { RequireAuth } from '@/shared/lib/utils/RequireAuth'
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
        <Route
          path="admin"
          element={(
            <RequireAuth>
              <AdminPanel />
            </RequireAuth>
          )}
        />
        <Route
          path="admin/*"
          element={(
            <RequireAuth>
              <Routes>
                <Route path="meeting" element={<AdminMeeting />} />
                <Route path="meeting/:id" element={<AdminMeeting edit />} />
                <Route path="ministry-meeting" element={<AdminMinistryMeetings />} />
                <Route path="ministry-meeting/:id" element={<AdminMinistryMeetings edit />} />
              </Routes>
            </RequireAuth>
          )}
        />
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
