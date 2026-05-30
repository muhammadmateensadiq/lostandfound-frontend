// "use client";

// import { useEffect, useState } from "react";
// import { Bell, X } from "lucide-react";
// import api from "@/lib/api";

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch notifications from backend
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await api.get("/notifications/");
//         setNotifications(res.data);
//       } catch (err) {
//         console.error("Failed to load notifications", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // ✅ Delete (local only for now)
//   const deleteNotification = async (id: number) => {
//     try {
//       await api.delete(`/notifications/${id}/`);

//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const markAllRead = async () => {
//       try {
//         await api.post("/notifications/read-all/");
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     markAllRead();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 text-gray-500">
//         Loading notifications...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">

//         {/* Header */}
//         <h1 className="text-3xl font-bold flex items-center gap-3 mb-6 text-gray-800">
//           <Bell className="w-7 h-7 text-blue-600" />
//           Notifications
//         </h1>

//         {/* Empty state */}
//         {notifications.length === 0 ? (
//           <p className="text-gray-500 text-center text-lg mt-10">
//             No new notifications
//           </p>
//         ) : (
//           <ul className="space-y-4">
//             {notifications.map((note) => (
//               <li
//                 key={note.id}
//                 className={`bg-white rounded-xl shadow-md p-4 flex justify-between items-center transition-shadow ${note.is_read ? "opacity-60" : "hover:shadow-lg"
//                   }`}
//               >
//                 <div>
//                   <p className="text-gray-900 font-medium">
//                     {note.title}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {note.message}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => deleteNotification(note.id)}
//                   className="text-gray-400 hover:text-red-600 transition-colors"
//                   aria-label="Delete notification"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Bell, X, Check } from "lucide-react";
import api from "@/lib/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications/");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/notifications/${id}/read/`);
      setNotifications(prev => prev.map(n =>
        n.id === id ? { ...n, is_read: true } : n
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await api.delete(`/notifications/${id}/`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-6 text-gray-800">
          <Bell className="w-7 h-7 text-blue-600" />
          Notifications ({notifications.filter(n => !n.is_read).length})
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            No notifications yet
          </p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
              <li
                key={note.id}
                className={`bg-white rounded-xl shadow p-5 flex justify-between items-start transition-all ${note.is_read ? "opacity-70" : "border-l-4 border-blue-500"
                  }`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{note.title}</p>
                  <p className="text-gray-600 mt-1">{note.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  {!note.is_read && (
                    <button
                      onClick={() => markAsRead(note.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(note.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}