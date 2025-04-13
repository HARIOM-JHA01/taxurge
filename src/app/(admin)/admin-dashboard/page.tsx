"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/ui/LineChart"), {
    ssr: false,
});

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDocuments, setUserDocuments] = useState([]);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ fullName: "", email: "" });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch("/api/admin/users");
                const usersData = await usersResponse.json();
                console.log("Fetched users data:", usersData);
                if (Array.isArray(usersData.users)) {
                    setUsers(usersData.users);
                } else {
                    console.error("Unexpected users data format:", usersData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", {
                method: "POST",
            });

            router.push("/admin-login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const fetchUserDocuments = async (userId) => {
        setLoadingDocuments(true);
        try {
            const response = await fetch(
                `/api/admin/users/documents/${userId}`
            );
            const data = await response.json();
            setUserDocuments(data.documents || []);
        } catch (error) {
            console.error("Error fetching user documents:", error);
        } finally {
            setLoadingDocuments(false);
        }
    };

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        await fetchUserDocuments(user._id);
    };

    const handleEditClick = (user, e) => {
        e.stopPropagation();
        setEditingUser(user);
        setEditForm({ fullName: user.fullName, email: user.email });
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(
                `/api/admin/users/${editingUser._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editForm),
                }
            );

            if (response.ok) {
                const updatedUsers = users.map((user) =>
                    user._id === editingUser._id
                        ? { ...user, ...editForm }
                        : user
                );
                setUsers(updatedUsers);
                setEditingUser(null);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (userId, e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setUsers(users.filter((user) => user._id !== userId));
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const userGrowthData = users.reduce((acc, user) => {
        const date = new Date(user.createdAt).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(userGrowthData)
        .sort(
            ([dateA], [dateB]) =>
                new Date(dateA).getTime() - new Date(dateB).getTime()
        )
        .map(([date, count]) => ({
            date,
            count: count as number,
        }));

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4 px-6 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600"
                >
                    Logout
                </Button>
            </header>

            <main className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-6">
                    <div
                        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setShowUserList(!showUserList)}
                    >
                        <h2 className="text-lg font-semibold text-gray-800">
                            Total Users
                        </h2>
                        <p className="text-3xl font-bold text-blue-600">
                            {users.length}
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Total Services
                        </h2>
                        <p className="text-3xl font-bold text-blue-600">
                            {users.length}
                        </p>
                    </div>
                </div>

                {showUserList && (
                    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                User List
                            </h2>
                            <button
                                onClick={() => setShowUserList(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {users.map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => handleUserClick(user)}
                                    className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                >
                                    <span>{user.fullName}</span>
                                    <span className="text-sm text-gray-500">
                                        {user.email}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={(e) =>
                                                handleEditClick(user, e)
                                            }
                                            className="p-1 text-blue-500 hover:text-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                handleDeleteUser(user._id, e)
                                            }
                                            className="p-1 text-red-500 hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {selectedUser && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">
                                            Documents for{" "}
                                            {selectedUser.fullName}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                setSelectedUser(null)
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {loadingDocuments ? (
                                        <div className="text-center py-4">
                                            Loading documents...
                                        </div>
                                    ) : userDocuments.length > 0 ? (
                                        <ul className="space-y-2">
                                            {userDocuments.map((doc) => (
                                                <li
                                                    key={doc._id}
                                                    className="p-3 border rounded-lg"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">
                                                            {doc.documentType}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                doc.uploadedAt
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <a
                                                            href={doc.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-600"
                                                        >
                                                            View Document
                                                        </a>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">
                                            No documents found for this user.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-lg font-semibold mb-4">
                                Edit User
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.fullName}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                fullName: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                email: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => setEditingUser(null)}
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdateUser}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        User Growth Over Time
                    </h2>
                    <LineChart
                        data={chartData}
                        intervals={[
                            "1d",
                            "3d",
                            "7d",
                            "15d",
                            "30d",
                            "3m",
                            "6m",
                            "1y",
                            "3y",
                            "5y",
                            "all",
                        ]}
                    />
                </div>
            </main>
        </div>
    );
}
