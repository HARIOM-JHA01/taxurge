// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { User } from "@/lib/auth";
// import {
//     Users,
//     Activity,
//     FileText,
//     Settings,
//     Search,
//     Edit2,
//     Trash2,
//     AlertCircle,
//     CheckCircle,
//     XCircle,
// } from "lucide-react";

// interface DashboardStats {
//     totalUsers: number;
//     activeUsers: number;
//     pendingVerifications: number;
// }

// export default function AdminDashboard() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [stats, setStats] = useState<DashboardStats>({
//         totalUsers: 0,
//         activeUsers: 0,
//         pendingVerifications: 0,
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [editingUser, setEditingUser] = useState<User | null>(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const router = useRouter();

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch("/api/admin/users");
//             if (!response.ok) {
//                 if (response.status === 401) {
//                     router.push("/admin/login");
//                     return;
//                 }
//                 throw new Error("Failed to fetch users");
//             }
//             const data = await response.json();
//             setUsers(data.users);

//             setStats({
//                 totalUsers: data.users.length,
//                 activeUsers: data.users.length,
//                 pendingVerifications: data.users.length,
//             });
//         } catch (err) {
//             setError("Failed to load users");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (user: User) => {
//         setEditingUser({ ...user });
//     };

//     const handleUpdate = async () => {
//         if (!editingUser) return;

//         try {
//             const response = await fetch(
//                 `/api/admin/users/${editingUser._id}`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(editingUser),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to update user");
//             }

//             setUsers(
//                 users.map((user) =>
//                     user._id === editingUser._id ? editingUser : user
//                 )
//             );
//             setEditingUser(null);
//         } catch (err) {
//             setError("Failed to update user");
//         }
//     };

//     const handleDelete = async (userId: string) => {
//         if (!confirm("Are you sure you want to delete this user?")) return;

//         try {
//             const response = await fetch(`/api/admin/users/${userId}`, {
//                 method: "DELETE",
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to delete user");
//             }

//             setUsers(users.filter((user) => user._id !== userId));
//         } catch (err) {
//             setError("Failed to delete user");
//         }
//     };

//     const filteredUsers = users.filter(
//         (user) =>
//             user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (loading)
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//         );

//     return (
//         <div className="p-6 space-y-6">
//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//                 <div className="flex items-center gap-4">
//                     <Button
//                         variant="outline"
//                         onClick={() => router.push("/admin/settings")}
//                     >
//                         <Settings className="h-4 w-4 mr-2" />
//                         Settings
//                     </Button>
//                 </div>
//             </div>

//             <div className="grid gap-4 md:grid-cols-3">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">
//                             Total Users
//                         </CardTitle>
//                         <Users className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {stats.totalUsers}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">
//                             Active Users
//                         </CardTitle>
//                         <Activity className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {stats.activeUsers}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">
//                             Pending Verifications
//                         </CardTitle>
//                         <FileText className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">
//                             {stats.pendingVerifications}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             <Tabs defaultValue="users" className="space-y-4">
//                 <TabsList>
//                     <TabsTrigger value="users">Users</TabsTrigger>
//                     <TabsTrigger value="activity">Activity Log</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="users" className="space-y-4">
//                     <div className="flex justify-between items-center">
//                         <div className="relative w-64">
//                             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 placeholder="Search users..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="pl-8"
//                             />
//                         </div>
//                     </div>

//                     <div className="bg-card rounded-lg shadow overflow-hidden">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b">
//                                     <th className="text-left p-4 font-medium">
//                                         Name
//                                     </th>
//                                     <th className="text-left p-4 font-medium">
//                                         Email
//                                     </th>
//                                     <th className="text-left p-4 font-medium">
//                                         Status
//                                     </th>
//                                     <th className="text-left p-4 font-medium">
//                                         Joined
//                                     </th>
//                                     <th className="text-left p-4 font-medium">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredUsers.map((user) => (
//                                     <tr
//                                         key={user._id?.toString()}
//                                         className="border-b"
//                                     >
//                                         <td className="p-4">
//                                             {editingUser?._id === user._id ? (
//                                                 <Input
//                                                     value={editingUser.fullName}
//                                                     onChange={(e) =>
//                                                         setEditingUser({
//                                                             ...editingUser,
//                                                             fullName:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                     className="w-full"
//                                                 />
//                                             ) : (
//                                                 user.fullName
//                                             )}
//                                         </td>
//                                         <td className="p-4">
//                                             {editingUser?._id === user._id ? (
//                                                 <Input
//                                                     value={editingUser.email}
//                                                     onChange={(e) =>
//                                                         setEditingUser({
//                                                             ...editingUser,
//                                                             email: e.target
//                                                                 .value,
//                                                         })
//                                                     }
//                                                     className="w-full"
//                                                 />
//                                             ) : (
//                                                 user.email
//                                             )}
//                                         </td>
//                                         <td className="p-4">
//                                             <Badge
//                                                 variant={
//                                                     user.isVerified
//                                                         ? "success"
//                                                         : "warning"
//                                                 }
//                                                 className="flex w-fit items-center gap-1"
//                                             >
//                                                 {user.isVerified ? (
//                                                     <CheckCircle className="h-3 w-3" />
//                                                 ) : (
//                                                     <AlertCircle className="h-3 w-3" />
//                                                 )}
//                                                 {user.isVerified
//                                                     ? "Verified"
//                                                     : "Pending"}
//                                             </Badge>
//                                         </td>
//                                         <td className="p-4">
//                                             {new Date(
//                                                 user.createdAt
//                                             ).toLocaleDateString()}
//                                         </td>
//                                         <td className="p-4">
//                                             <div className="flex items-center gap-2">
//                                                 {editingUser?._id ===
//                                                 user._id ? (
//                                                     <>
//                                                         <Button
//                                                             size="sm"
//                                                             onClick={
//                                                                 handleUpdate
//                                                             }
//                                                         >
//                                                             <CheckCircle className="h-4 w-4 mr-1" />
//                                                             Save
//                                                         </Button>
//                                                         <Button
//                                                             size="sm"
//                                                             variant="outline"
//                                                             onClick={() =>
//                                                                 setEditingUser(
//                                                                     null
//                                                                 )
//                                                             }
//                                                         >
//                                                             <XCircle className="h-4 w-4 mr-1" />
//                                                             Cancel
//                                                         </Button>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <Button
//                                                             size="sm"
//                                                             variant="outline"
//                                                             onClick={() =>
//                                                                 handleEdit(user)
//                                                             }
//                                                         >
//                                                             <Edit2 className="h-4 w-4" />
//                                                         </Button>
//                                                         <Button
//                                                             size="sm"
//                                                             variant="destructive"
//                                                             onClick={() =>
//                                                                 handleDelete(
//                                                                     user._id
//                                                                 )
//                                                             }
//                                                         >
//                                                             <Trash2 className="h-4 w-4" />
//                                                         </Button>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </TabsContent>

//                 <TabsContent value="activity">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Recent Activity</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-sm text-muted-foreground">
//                                 Activity log coming soon...
//                             </p>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }
